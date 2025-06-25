
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const hotelsFilePath = path.join(__dirname, '../services/hotels.json');
const hotels = JSON.parse(fs.readFileSync(hotelsFilePath, 'utf-8'));



export const getAllHotels = (req, res) => {
  res.status(200).json(hotels);
};


export const getHotelsByLocation = (req, res) => {
  const { location } = req.params;
  const filtered = hotels.filter(h => h.location.toLowerCase() === location.toLowerCase());
  res.status(200).json(filtered);
};


export const getHotelsByName = (req, res) => {
  const { name } = req.params;
  const filtered = hotels.filter(h => h.name.toLowerCase().includes(name.toLowerCase()));
  res.status(200).json(filtered);
};


export const getHotelsByPrice = (req, res) => {
  const { min, max } = req.query;
  console.log('Received price filter:', min, max);

  const filtered = hotels.filter(h => {
    console.log(`Checking hotel: ${h.name}, Price: ${h.price}`);
    return h.price >= Number(min) && h.price <= Number(max);
  });

  console.log('Filtered Hotels:', filtered);
  res.status(200).json(filtered);
};