import { selector } from 'recoil';
import { db } from '../../db';
import selectedOrdersState from './selectedOrdersState';

const itemsState = selector({
  key: 'itemsState',
  get: async ({ get }) => {
    const selectedOrders = get(selectedOrdersState);

    //if (selectedOrders.length === 0) return [];

    const totalItems = [];
    await db.items
      .where('orderId')
      .anyOf(selectedOrders)
      .each((item) => {
        const itemExists = totalItems.find(
          (totalItem) => totalItem.reference === item.reference
        );
        if (itemExists) {
          itemExists.quantity += item.quantity;
        } else totalItems.push({ ...item });
      });

    return totalItems;
  },
});

export default itemsState;
