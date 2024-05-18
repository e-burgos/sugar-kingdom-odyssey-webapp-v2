export type Deferrable<T> = {
  [K in keyof T]: T[K] | Promise<T[K]>;
};

export interface Wallet {
  address: string;
  smartAccount?: string;
  custodial: boolean;
}
export interface User {
  identifier: string;
  name?: string;
  wallets: Wallet[];
}
export interface IXerialToken {
  access: {
    token: string;
    expires: string;
  };
  refresh: {
    token: string;
    expires: string;
  };
}
