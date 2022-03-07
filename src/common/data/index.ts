import { Courier, Order } from "common/models";

export const orders: Order[] = [
  {
    id: "1904040",
    statusCode: "1",
    date: "02-01-2022",
    courier: { id: "1", fullName: "Петров Андрей" },
    sender: {
      address: {
        name: "ул. Профсоюзная 15, кв. 4",
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
      contact: "+79137653546",
    },
    cargo: "Видеокарта",
  },
];

export const couriers: Courier[] = [
  { id: "-1", fullName: "Не назначен" },
  { id: "1", fullName: "Петров Андрей" },
  { id: "2", fullName: "Степанов Григорий" },
  { id: "3", fullName: "Смирнов Анатолий" },
];
