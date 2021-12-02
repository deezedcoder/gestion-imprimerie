import ORDER_STATUS from '../constants/orderStatus';

export default function parseImportedData(dataPages) {
  const items = [];

  const orders = dataPages.map((data) => {
    const DATE = 0;
    const ID = 2;
    const CUSTOMER_ID = 3;
    const AMOUNT = 4;
    const CUSTOMER_NAME = 5;
    const FIRST_ITEM_INDEX = data.findIndex((element) =>
      element.str.startsWith('ref::')
    );

    const order = {
      id: data[ID].str,
      date: data[DATE].str,
      customer: {
        id: data[CUSTOMER_ID].str,
        name: data[CUSTOMER_NAME].str,
      },
      amount: data[AMOUNT].str.replace(' ', '').replace(',', '.'),
      status: ORDER_STATUS.PENDING,
    };

    if (FIRST_ITEM_INDEX === -1) order.status = ORDER_STATUS.NULL;
    else {
      const itemsSet = [];
      const typeMap = {
        ref: 'reference',
        qty: 'quantity',
        com: 'comment',
        prc: 'price',
      };
      const convertTo = {
        qty: (value) => parseInt(value),
        prc: (value) => parseFloat(value.replace(' ', '').replace(',', '.')),
      };

      const validate = {
        ref: {
          fn: (value) => itemsSet.includes((item) => item.reference === value),
          warning: 'Article en double',
        },
        qty: {
          fn: (value) => value > 0,
          warning: 'Quantité nulle',
        },
        prc: {
          fn: (value) => value > 0,
          warning: 'Prix unitaire nulle',
        },
      };

      let item = null;
      for (let i = FIRST_ITEM_INDEX; i < data.length; i++) {
        const [type, value] = data[i].str.split('::');
        if (type === 'ref') {
          if (item !== null) itemsSet.push({ ...item, orderId: order.id });
          item = { warnings: [] };
        }

        if (typeMap.hasOwnProperty(type)) {
          item[typeMap[type]] = convertTo.hasOwnProperty(type)
            ? convertTo[type](value)
            : value;
          //* Validate item
          if (validate.hasOwnProperty(type)) {
            if (!validate[type].fn(item[typeMap[type]]))
              item.warnings.push(validate[type].warning);
          }
        }
      }
      //push the last item
      itemsSet.push({ ...item, orderId: order.id });

      // push the set into items
      items.push(...itemsSet);
    }

    return order;
  });

  return { orders, items };
}
