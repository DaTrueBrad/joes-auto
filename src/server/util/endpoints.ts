import { handleDelete, handleGet, handlePost, handlePut } from "../controller";

let endpoints = [
  {
    method: "GET",
    handler: handleGet,
    url: "/vehicles",
    description: "Get all vehicles",
    response: [
      {
          "id": 1,
          "make": "Ford",
          "model": "Mustang",
          "year": 2014,
          "color": "blue",
          "price": 10000
      },
      {
          "id": 2,
          "make": "Chevrolet",
          "model": "Malibu",
          "year": 2018,
          "color": "silver",
          "price": 12000
      },
      {
          "id": 3,
          "make": "Audi",
          "model": "Q5",
          "year": 2022,
          "color": "blue",
          "price": 32000
      }
  ],
    queries: [
      {
        name: "Color",
        type: "query",
        dataType: "string",
        description: "Filter all vehicles by color",
        required: false,
        default: "",
        example: "/vehicles?color=blue",
      },
      {
        name: "Year",
        type: "query",
        dataType: "integer",
        description: "Filter all vehicles new than a given year",
        required: false,
        default: "",
        example: "/vehicles?year=2014",
      },
      {
        name: "Make",
        type: "query",
        dataType: "string",
        description: "All vechiles for a given manufacturer",
        required: false,
        default: "",
        example: "/vehicles?make=ford",
      },
    ],
  },
  {
    method: "POST",
    handler: handlePost,
    url: "/vehicles",
    description: "Add new vehicle",
    response: {
      "id": 4,
      "make": "Honda",
      "model": "Civic",
      "year": 2020,
      "color": "silver",
      "price": "12000"
  },
    queries: [
      {
        name: "Request Body",
        type: "body",
        dataType: "object",
        description: "The vehicles make, model, year, color, and price. ID will be auto generated in the server.",
        required: true,
        default: "",
        example: "",
        bodyExample: {
          make: "Ford",
          model: "Mustang",
          year: 2014,
          color: "blue",
          price: 10000,
        }
      },
    ],
  },
  {
    method: "PUT",
    handler: handlePut,
    url: "/vehicles/:id/:change",
    description: "Increase or decrease the price of a car by $1,000 using vehicle ID.",
    response: {
      "id": 1,
      "make": "Ford",
      "model": "Mustang",
      "year": 2014,
      "color": "blue",
      "price": 11000
  },
    queries: [
      {
        name: "id",
        type: "param",
        dataType: "integer",
        description: "The ID of the vehicle to modify",
        required: true,
        default: "",
        example: "/vehicle/17/:change",
        bodyExample: {}
      },
      {
        name: "change",
        type: "param",
        dataType: "string",
        description: 'Either "up" or "down"',
        required: true,
        default: "",
        example: "/vehicle/:id/down",
        bodyExample: {}
      },
    ],
  },
  {
    method: "DELETE",
    handler: handleDelete,
    url: "/vehicles/:id",
    description: "Deletes a vehicle by ID",
    response: {
      "message": "Vehicle deleted successfully."
  },
    queries: [
      {
        name: "id",
        type: "param",
        dataType: "integer",
        description: "The ID of the vehicle to delete.",
        required: true,
        default: "",
        example: "/vehicles/17",
        bodyExample: {}
      },
    ],
  }
];

export default endpoints

