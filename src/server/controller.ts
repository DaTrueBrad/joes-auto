import db from "./util/database";
import { Request, Response } from "express";

interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  price: number;
}

export const handleGet = (req: Request, res: Response) => {
  const { color, year, make } = req.query;

  let filteredVehicles = db;

  // Filter by color if provided
  if (color && typeof color === 'string') {
      filteredVehicles = filteredVehicles.filter(vehicle => vehicle.color.toLowerCase() === color.toLowerCase());
  }

  // Filter by year if provided
  if (year) {
      const yearInt = parseInt(year as string);
      if (isNaN(yearInt)) {
          return res.status(400).json({ error: "Invalid 'year' query parameter; expected an integer." });
      }
      filteredVehicles = filteredVehicles.filter(vehicle => vehicle.year >= yearInt);
  }

  // Filter by make if provided
  if (make && typeof make === 'string') {
      filteredVehicles = filteredVehicles.filter(vehicle => vehicle.make.toLowerCase() === make.toLowerCase());
  }

  res.json(filteredVehicles)
}

export const handlePost = (req: Request, res: Response) => {
  const { make, model, year, color, price } = req.body;

  // Basic validation - in a real-world application, you'd want more robust validation
  if (!make || !model || !year || !color || !price) {
      return res.status(400).json({ error: 'Missing required vehicle properties' });
  }

  // Generate a new ID for the vehicle - this is a simple example
  const newId = db.length > 0 ? Math.max(...db.map(v => v.id)) + 1 : 1;

  const newVehicle: Vehicle = {
      id: newId,
      make,
      model,
      year,
      color,
      price
  };

  db.push(newVehicle);

  res.status(201).json(newVehicle);
}

export const handlePut = (req: Request, res: Response) => {
  const { id, change } = req.params;

  // Convert id to a number and validate it
  const vehicleId = parseInt(id);
  if (isNaN(vehicleId)) {
      return res.status(400).json({ error: "Invalid vehicle ID. It should be a number." });
  }

  // Find the vehicle in the database
  const vehicle = db.find(v => v.id === vehicleId);
  if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found." });
  }

  // Check if change parameter is valid
  if (change !== 'up' && change !== 'down') {
      return res.status(400).json({ error: "Invalid change parameter. It should be 'up' or 'down'." });
  }

  const priceChange = change === 'up' ? 1000 : -1000;

  if (vehicle.price + priceChange < 0) {
    return res.status(400).json({ error: "Price cannot be decreased below zero." });
}
  // Update the vehicle price
  vehicle.price += (change === 'up' ? 1000 : -1000);

  res.status(200).json(vehicle);
}

export const handleDelete = (req: Request, res: Response) => {
  if(db.length <= 3) {
    return res.status(400).json({ error: "We have so few vehicles. Please add a vehicle before deleting any more." });
  }
  const { id } = req.params;

  // Convert id to a number and validate it
  const vehicleId = parseInt(id);
  if (isNaN(vehicleId)) {
      return res.status(400).json({ error: "Invalid vehicle ID. It should be a number." });
  }

  // Check if the vehicle exists in the database
  const vehicleIndex = db.findIndex(v => v.id === vehicleId);
  if (vehicleIndex === -1) {
      return res.status(404).json({ error: "Vehicle not found." });
  }

  // Remove the vehicle from the array
  db.splice(vehicleIndex, 1);

  res.status(200).json({ message: "Vehicle deleted successfully." });
}