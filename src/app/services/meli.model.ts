export enum CurrencyTypes {
  ARS = 'ARS',
  USD = 'USD'
}
export const CurrencySigns = {
  [CurrencyTypes.ARS]: '$',
  [CurrencyTypes.USD]: 'U$S'
};

export interface IItem {
  id: string;
  title: string;
  price: IPrice;
  picture: string;
  condition: string;
  free_shipping: boolean;
  sold_quantity: number;
  description?: string;
}

export interface IItemInformation {
  author: {
    name: string;
    lastname: string;
  };
  item: IItem[];
}

export interface ISearch {
  author: {
    name: string;
    lastname: string;
  };
  categories: string[];
  items: IItem[];
}

export interface IItems {
  author: {
    name: string;
    lastname: string;
  };
  items: IItem[];
}

export interface IPrice {
  currency: string;
  amount: number;
  decimals: number;
}
