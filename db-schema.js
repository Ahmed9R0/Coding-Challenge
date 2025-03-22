// models/Trip.js
const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
    enum: ['Lunar Hotel', 'Orbital Station', 'Mars Colony', 'Venus Observatory']
  },
  departureDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date,
    required: true
  },
  availableSeats: {
    economy: { type: Number, default: 50 },
    luxury: { type: Number, default: 20 },
    vip: { type: Number, default: 5 }
  },
  pricing: {
    economy: { type: Number, required: true },
    luxury: { type: Number, required: true },
    vip: { type: Number, required: true }
  },
  duration: { type: Number, required: true }, // in hours
  description: { type: String, required: true },
  imageUrl: { type: String, required: true }
}, { timestamps: true });

// models/Booking.js
const BookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  seatClass: {
    type: String,
    required: true,
    enum: ['economy', 'luxury', 'vip']
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  },
  totalPrice: {
    type: Number,
    required: true
  },
  passengers: [{
    name: { type: String, required: true },
    email: { type: String, required: true },
    specialRequirements: { type: String }
  }]
}, { timestamps: true });

// models/Accommodation.js
const AccommodationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  amenities: [{ type: String }],
  pricePerNight: { type: Number, required: true },
  rating: { type: Number, min: 0, max: 5 },
  imageUrl: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['hotel', 'station', 'habitat'], 
    required: true 
  },
  availabilityDates: [{
    date: { type: Date },
    available: { type: Boolean, default: true }
  }],
  tags: [{ type: String }] // for filtering (luxury, budget, family-friendly, etc.)
}, { timestamps: true });

// models/TravelTip.js
const TravelTipSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true
  },
  tip: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['safety', 'packing', 'experience', 'health', 'general'],
    required: true
  }
}, { timestamps: true });

// models/User.js
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: {
    budget: { type: String, enum: ['budget', 'moderate', 'luxury'] },
    amenities: [{ type: String }],
    travelHistory: [{
      destination: { type: String },
      date: { type: Date }
    }]
  },
  bookingHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }]
}, { timestamps: true });

module.exports = {
  Trip: mongoose.model('Trip', TripSchema),
  Booking: mongoose.model('Booking', BookingSchema),
  Accommodation: mongoose.model('Accommodation', AccommodationSchema),
  TravelTip: mongoose.model('TravelTip', TravelTipSchema),
  User: mongoose.model('User', UserSchema)
};
