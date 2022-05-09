import { AxiosResponse } from "axios";

export type ThenArgs<T> = T extends Promise<infer U> ? U : T;

export type AxiosArgs<T> = T extends AxiosResponse<infer U> ? U : undefined;

export type GeoType = { longitude: number; latitude: number };

export enum AddressStatus {
  VALID,
  INVALID,
  NOT_VALIDATED,
}

export type AddressItem = {
  id: string;
  name: string;
  email: string;
  city: string;
  street: string;
  houseNumber: string;
  zip: string;
  geo: GeoType | null;
  status: AddressStatus;
};
