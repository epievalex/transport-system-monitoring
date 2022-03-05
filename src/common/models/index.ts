export interface Order {
  id: number;
  statusCode: string;
  date: string;
  courier: Courier | null;
  sender: TransactionParticipant;
  recipient: TransactionParticipant;
  cargo: string;
}

export interface OrderForm {
  date: string;
  courier: Courier | null;
  sender: TransactionParticipant;
  recipient: TransactionParticipant;
  cargo: string;
}

export interface Car {
  courierId: string;
  statusCode: string;
  brand: string;
  stateNumber: string;
  location: Address;
  fuel: Fuel;
}

export interface Fuel {
  value: string;
  unit: string;
}

export interface Address {
  name: string;
  geo: {
    latitude: string;
    longitude: string;
  };
}

export interface TransactionParticipant {
  contact: string;
  address: Address;
}

export interface Courier {
  fullName: string;
  id: string;
}
