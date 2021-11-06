function parseOrders(orders) {
  // TODO try to use orders schema to automatically parse orders
  return orders.map((order) => {
    return {
      id: order.id,
      date: order.date,
      customer: {
        id: order.customer.id,
        name: order.customer.name,
      },
      items: order.items.map((item) => {
        return {
          reference: item.reference,
          price: item.price,
          quantity: item.quantity,
          comment: item.comment,
          served: item.served.map((itemServed) => {
            return {
              quantity: itemServed.quantity,
              data: itemServed.date,
            };
          }),
        };
      }),
      amount: order.amount,
      status: order.status,
    };
  });
}

module.exports = parseOrders;
