export default function parseImportedData(data) {
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
    items: [],
    status: "Liste d'attente",
  };

  if (FIRST_ITEM_INDEX !== -1) {
    let item = null;
    const typeMap = {
      ref: 'reference',
      qty: 'quantity',
      com: 'comment',
      prc: 'price',
    };
    const convertTo = {
      prc: function (value) {
        return value.replace(' ', '').replace(',', '.');
      },
    };

    for (let i = FIRST_ITEM_INDEX; i < data.length; i++) {
      const [type, value] = data[i].str.split('::');
      if (type === 'ref') {
        if (item !== null) order.items.push(item);
        item = {};
      }

      if (typeMap.hasOwnProperty(type)) {
        item[typeMap[type]] = convertTo.hasOwnProperty(type)
          ? convertTo[type](value)
          : value;
      }
    }

    // push the last item into items
    order.items.push(item);
  }

  return order;
}
