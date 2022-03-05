import { Address } from "common/models";

export const executeGeocoding = (value: string): Address => {
  return {
    name: value,
    geo: {
      // Moscow default coordinates
      latitude: "55.753220",
      longitude: "37.622513",
    },
  };
};
