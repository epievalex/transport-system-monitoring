import { Car } from "common/models";

export const columns = ["Курьер", "Статус", "Автомобиль", "Номерной знак", "Местонахождение", "Уровень топлива"];

export const carPark: Car[] = [
  {
    id: "1232133",
    courier: { id: "1", fullName: "Диана Арсеньева" },
    statusCode: "1",
    brand: "Skoda Octavia",
    fuel: { value: "150", unit: "ltr" },
    stateNumber: "A256KC",
    location: {
      name: "ул. Цюрупы д.13",
      geo: {
        latitude: "55.666228",
        longitude: " 37.570734",
      },
    },
  },
  {
    id: "123213",
    courier: { id: "2", fullName: "Александр Эпиев" },
    statusCode: "3",
    brand: "Lada Vesta",
    fuel: { value: "100", unit: "ltr" },
    stateNumber: "O311HF",
    location: {
      name: "ул. Вавиловых 10к1",
      geo: {
        latitude: "55.666224",
        longitude: " 37.570731",
      },
    },
  },
  {
    id: "123215",
    courier: { id: "3", fullName: "Рыженко Джесс" },
    statusCode: "3",
    brand: "Lada 2104",
    fuel: { value: "77", unit: "ltr" },
    stateNumber: "A456OF",
    location: {
      name: "ул. Молодежная 35",
      geo: {
        latitude: "55.666227",
        longitude: " 37.570738",
      },
    },
  },
];
