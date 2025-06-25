import express from 'express';
import {
  getAllHotels,
  getHotelsByLocation,
  getHotelsByName,
  getHotelsByPrice
} from '../controllers/hotel.search.js';

const router = express.Router();

router.get('/hotels', getAllHotels);
router.get('/hotels/location/:location', getHotelsByLocation);
router.get('/hotels/name/:name', getHotelsByName);
router.get('/hotels/price', getHotelsByPrice);
export default router;