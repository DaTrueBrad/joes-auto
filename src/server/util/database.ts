interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  price: number;
}

let db: Vehicle[] = [
  {
    id: 1,
    make: "Ford",
    model: "Mustang",
    year: 2014,
    color: "blue",
    price: 10000,
  },
  {
    id: 2,
    make: "Chevrolet",
    model: "Malibu",
    year: 2018,
    color: "silver",
    price: 12000,
  },
  {
    id: 3,
    make: "Audi",
    model: "Q5",
    year: 2022,
    color: "blue",
    price: 32000,
  }
]

export default db