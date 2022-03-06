import { Courier, Order } from "common/models";

export const orders: Order[] = [
  {
    id: "1904040",
    statusCode: "1",
    date: "02-01-2022",
    courier: { id: "1", fullName: "Диана Арсеньева" },
    sender: {
      address: {
        name: "Желтоксан 15, кв. 4",
        geo: {
          latitude: "1111111",
          longitude: "1000000",
        },
      },
      contact: "+77777549539",
    },
    recipient: {
      address: {
        name: "Лермонтовский пр. 43/1",
        geo: {
          latitude: "9999999",
          longitude: "1220000",
        },
      },
      contact: "+79131197546",
    },
    cargo: "Видеокарта",
  },
];

export const statusDictionary = {
  "1": "В обработке",
  "2": "Принят",
  "3": "В процессе",
  "4": "Завершен",
};

export const couriers: Courier[] = [
  { id: "1", fullName: "Диана Арсеньева" },
  { id: "2", fullName: "Александр Эпиев" },
  { id: "3", fullName: "Рыженко Джесс" },
  { id: "4", fullName: "Василий Пупкин" },
];
