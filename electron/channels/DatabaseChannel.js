const { CHANNELS } = require('../../src/shared/constants/channels');
const { orderSchema } = require('../database/schemas');
const parseOrders = require('../helpers/parseOrders');

class DatabaseChannel {
  constructor(dbDriver) {
    this.db = dbDriver;
  }
  getName() {
    return CHANNELS.DATABASE;
  }

  handle(event, request) {
    const db = this.db;
    const Order = db.model('Commandes', orderSchema);

    switch (request.data.operation) {
      case 'save':
        const order = new Order(request.data.order);
        order
          .save()
          .then(() => {
            event.sender.send(request.responseChannel, {
              success: true,
            });
          })
          .catch((error) => {
            console.log('channel save error');
            event.sender.send(request.responseChannel, {
              error: {
                flag: true,
                title: 'Erreur lors de la sauvegarde de la commande',
                description: error.toString(),
              },
            });
          });
        break;
      case 'read':
        Order.find({}).then((orders) => {
          event.sender.send(request.responseChannel, {
            orders: parseOrders(orders),
          });
        });
        break;
      default:
    }
  }
}

module.exports = DatabaseChannel;
