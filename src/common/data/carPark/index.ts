import { Car } from "common/models";

export const columns = ["Курьер", "Статус", "Автомобиль", "Номерной знак", "Местонахождение", "Уровень топлива"];

export const carPark: Car[] = [
  {
    id: "1232133",
    courierId: "1",
    statusCode: "2",
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
];
