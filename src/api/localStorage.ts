import { AddressItem } from "api/types";

const ADDRESS_ITEMS_KEY = "address_items";

export const getLocalStorageItem = () => {
  const data = window.localStorage.getItem(ADDRESS_ITEMS_KEY);
  if (!data) {
    return false;
  }
  const parsed: AddressItem[] = JSON.parse(data);
  return parsed;
};

export const setLocalStorageItem = (data: AddressItem[]) => {
  window.localStorage.setItem(ADDRESS_ITEMS_KEY, JSON.stringify(data));
};
