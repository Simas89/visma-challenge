import axios, { AxiosResponse } from "axios";
import { AxiosArgs, GeoType, ThenArgs } from "./types";

export type GetGeoLocResponse = Promise<
  AxiosArgs<ThenArgs<AxiosResponse<GeoType[]>>>
>;

export type GetGeoLoc = (a: string) => GetGeoLocResponse;

export const getGeoLoc: GetGeoLoc = (address) => {
  const path = `/api/geoloc?address=${address}`;

  return axios({
    method: "GET",
    url: path,
  }).then((res) => res.data.data);
};
