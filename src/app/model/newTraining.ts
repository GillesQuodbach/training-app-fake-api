export class NewTraining {
  name: string;
  description: string;
  price: number;
  quantity: number;

  constructor(
    name: string,
    description: string,
    price: number,
    quantity: number
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
  }
}
