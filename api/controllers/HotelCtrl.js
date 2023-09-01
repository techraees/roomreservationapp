import Hotel from "../models/HotelModel.js";

// Create
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const saveHotel = await newHotel.save();
    res.status(200).json(saveHotel);
  } catch (error) {
    next(error);
  }
};

// Update
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (updatedHotel) {
      res.status(200).json(updatedHotel);
    } else {
      res.status(400).json("Not Found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete
export const deleteHotel = async (req, res, next) => {
  try {
    const deletedUser = await Hotel.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.status(200).json("hotel has been Deleted", deletedUser);
    } else {
      res.status(400).json("USER not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Hotel
export const getHotel = async (req, res, next) => {
  try {
    const singleUser = await Hotel.findById(req.params.id);
    if (singleUser) {
      res.status(200).json(singleUser);
    } else {
      res.status(400).json("USER not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get All Hotels
export const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const users = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max | 1000 },
    }).limit(req.query.limit || 10);
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(400).json("USER not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// CountByCity
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

// CountByType
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cubinCount = await Hotel.countDocuments({ type: "cubin" });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cubin", count: cubinCount },
    ]);
  } catch (error) {
    next(error);
  }
};
