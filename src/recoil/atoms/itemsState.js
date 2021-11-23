import { selector } from 'recoil';
import selectedOrdersState from './selectedOrdersState';

const itemsState = selector({
  key: 'itemsState',
  get: ({ get }) => {
    const orders = [];
    const selectedOrders = get(selectedOrdersState);
    const totalItems = [];

    if (selectedOrders.length > 0) {
      selectedOrders.forEach((selectedOrderId) => {
        orders
          .find((order) => order.id === selectedOrderId)
          .items.forEach((item) => {
            const itemExists = totalItems.find(
              (totalItem) => totalItem.reference === item.reference
            );
            if (itemExists) {
              itemExists.quantity += item.quantity;
            } else totalItems.push({ ...item });
          });
      });
    }

    return totalItems;
  },
});

export default itemsState;
