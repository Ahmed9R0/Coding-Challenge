import React, { useReducer, useEffect } from 'react';
import { CalendarIcon, RocketIcon, BuildingIcon, CreditCardIcon, InfoIcon, AlertCircleIcon } from 'lucide-react';

// Smaller, focused components
const Header = () => (
  <header className="p-4 border-b border-cyan-500">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold text-cyan-400">STELLAR VOYAGES</h1>
      <nav className="flex space-x-6">
        <a href="#" className="hover:text-cyan-400 transition-colors">Home</a>
        <a href="#" className="hover:text-cyan-400 transition-colors">Destinations</a>
        <a href="#" className="hover:text-cyan-400 transition-colors">Packages</a>
        <a href="#" className="hover:text-cyan-400 transition-colors">Dashboard</a>
      </nav>
    </div>
  </header>
);

const HeroSection = () => (
  <section className="relative h-96 flex items-center justify-center bg-cover bg-center overflow-hidden">
    <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
    <div className="stars absolute inset-0"></div>
    <div className="container mx-auto z-20 text-center px-4">
      <h2 className="text-5xl font-bold mb-4 text-white">Begin Your Cosmic Journey</h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto">Book your next adventure beyond Earth and experience the wonders of space travel.</p>
      <button 
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-colors animate-pulse"
        onClick={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })}
      >
        Explore Voyages
      </button>
    </div>
  </section>
);

const DestinationSelection = ({ destinations, selectedDestination, dispatch, selectedDate, dateError }) => (
  <div>
    <h4 className="text-xl mb-4 flex items-center"><RocketIcon className="mr-2" size={20} /> Select Your Destination</h4>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {destinations.map(destination => (
        <div 
          key={destination.id}
          className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-cyan-400 transform hover:scale-105 duration-200
            ${selectedDestination === destination.id ? 'border-cyan-400 bg-gray-700' : 'border-gray-700'}`}
          onClick={() => dispatch({ type: 'SET_DESTINATION', payload: destination.id })}
        >
          <h5 className="font-bold text-lg mb-2">{destination.name}</h5>
          <p className="text-gray-400 text-sm mb-1">Distance: {destination.distance}</p>
          <p className="text-gray-400 text-sm">Travel Time: {destination.travelTime}</p>
        </div>
      ))}
    </div>
    
    <div className="mb-6">
      <h4 className="text-xl mb-4 flex items-center"><CalendarIcon className="mr-2" size={20} /> Select Departure Date</h4>
      <div>
        <input 
          type="date" 
          className={`bg-gray-700 border ${dateError ? 'border-red-500' : 'border-gray-600'} rounded-lg p-3 w-full text-white`}
          onChange={e => dispatch({ type: 'SET_DATE', payload: e.target.value })}
          min={new Date().toISOString().split('T')[0]}
          value={selectedDate}
        />
        {dateError && (
          <p className="text-red-500 text-sm mt-1 flex items-center">
            <AlertCircleIcon size={14} className="mr-1" /> {dateError}
          </p>
        )}
      </div>
    </div>
  </div>
);

const TravelClassSelection = ({ travelClasses, selectedClass, dispatch }) => (
  <div>
    <h4 className="text-xl mb-4 flex items-center"><CreditCardIcon className="mr-2" size={20} /> Select Travel Class</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {travelClasses.map(travelClass => (
        <div 
          key={travelClass.id}
          className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-cyan-400 transform hover:scale-105 duration-200
            ${selectedClass === travelClass.id ? 'border-cyan-400 bg-gray-700' : 'border-gray-700'}`}
          onClick={() => dispatch({ type: 'SET_CLASS', payload: travelClass.id })}
        >
          <div className="flex justify-between items-start mb-3">
            <h5 className="font-bold text-lg">{travelClass.name}</h5>
            <span className="text-cyan-400 font-bold">${travelClass.price.toLocaleString()}</span>
          </div>
          <ul className="text-sm text-gray-300">
            {travelClass.amenities.map((amenity, index) => (
              <li key={index} className="mb-1 flex items-center">
                <span className="text-cyan-400 mr-2">•</span> {amenity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

const TravelTip = ({ tip }) => (
  <div className="bg-gray-900 p-4 rounded-lg border border-cyan-800 mb-4">
    <h6 className="font-bold text-cyan-400 mb-2 flex items-center">
      <InfoIcon size={16} className="mr-2" /> Travel Tip
    </h6>
    <p className="text-gray-300 text-sm">{tip}</p>
  </div>
);

const BookingSummary = ({ state, destinations, travelClasses, dispatch }) => {
  const selectedDestObj = destinations.find(d => d.id === state.selectedDestination);
  const selectedClassObj = travelClasses.find(c => c.id === state.selectedClass);
  
  // Generate tips based on destination
  const getTipForDestination = (destId) => {
    const tips = {
      'lunar-hotel': "Pack light clothes for indoor activities as the Lunar Hotel maintains Earth-like gravity in common areas.",
      'orbital-station': "The Orbital Station has excellent viewing decks - bring a camera with a wide-angle lens for the best Earth photos.",
      'mars-base': "Mars dust can damage electronics - bring protective cases for all your devices."
    };
    
    return tips[destId] || "Remember to complete all pre-flight medical checks at least two weeks before departure.";
  };
  
  return (
    <div>
      <h4 className="text-xl mb-4 flex items-center"><InfoIcon className="mr-2" size={20} /> Review Your Booking</h4>
      
      <div className="bg-gray-700 rounded-lg p-6 mb-6">
        <h5 className="font-bold text-lg mb-4 pb-2 border-b border-gray-600">Trip Summary</h5>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 mb-1">Destination:</p>
            <p className="font-bold mb-3">{selectedDestObj?.name}</p>
            
            <p className="text-gray-400 mb-1">Departure Date:</p>
            <p className="font-bold mb-3">{state.selectedDate ? new Date(state.selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }) : ''}</p>
          </div>
          
          <div>
            <p className="text-gray-400 mb-1">Travel Class:</p>
            <p className="font-bold mb-3">{selectedClassObj?.name}</p>
            
            <p className="text-gray-400 mb-1">Price:</p>
            <p className="font-bold text-xl text-cyan-400">
              ${selectedClassObj?.price.toLocaleString()}
            </p>
          </div>
        </div>
        
        {state.recommendations?.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-600">
            <h6 className="font-bold mb-3">Recommended Accommodations:</h6>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {state.recommendations.map((rec, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                  <h6 className="font-bold text-cyan-400">{rec.name}</h6>
                  <p className="text-sm text-gray-300 mb-1">{rec.description}</p>
                  <div className="flex justify-between text-xs">
                    <span>${rec.price.toLocaleString()}/night</span>
                    <span>{rec.rating}/5 ★</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <TravelTip tip={getTipForDestination(state.selectedDestination)} />
        
        <div className="mt-6 pt-4 border-t border-gray-600">
          <h6 className="font-bold mb-2">Important Information:</h6>
          <ul className="text-sm text-gray-300">
            <li className="mb-1 flex items-start">
              <span className="text-cyan-400 mr-2 mt-1">•</span> 
              All passengers must complete medical clearance 30 days before departure.
            </li>
            <li className="mb-1 flex items-start">
              <span className="text-cyan-400 mr-2 mt-1">•</span> 
              Luggage is strictly limited to 15kg per passenger.
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2 mt-1">•</span> 
              Cancellation policy: Full refund available up to 90 days before departure.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Featured destinations component
const FeaturedDestinations = () => (
  <section className="py-16 bg-gray-800">
    <div className="container mx-auto px-4">
      <h3 className="text-3xl font-bold mb-12 text-center text-cyan-400">Popular Destinations</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-900 rounded-lg overflow-hidden transform transition-transform hover:scale-105 duration-300">
          <div className="h-48 bg-gray-700"></div>
          <div className="p-6">
            <h4 className="text-xl font-bold mb-2">Lunar Hotel</h4>
            <p className="text-gray-400 mb-4">Experience luxury accommodations with Earth views and low-gravity recreation areas.</p>
            <button className="text-cyan-400 hover:text-cyan-300 font-bold">Learn More →</button>
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-lg overflow-hidden transform transition-transform hover:scale-105 duration-300">
          <div className="h-48 bg-gray-700"></div>
          <div className="p-6">
            <h4 className="text-xl font-bold mb-2">Orbital Station</h4>
            <p className="text-gray-400 mb-4">Our nearest destination offers spectacular views and zero-gravity experiences.</p>
            <button className="text-cyan-400 hover:text-cyan-300 font-bold">Learn More →</button>
          </div>
        </div>
        
        <div className="bg-gray-900 rounded-lg overflow-hidden transform transition-transform hover:scale-105 duration-300">
          <div className="h-48 bg-gray-700"></div>
          <div className="p-6">
            <h4 className="text-xl font-bold mb-2">Mars Base Alpha</h4>
            <p className="text-gray-400 mb-4">For the adventurous traveler, experience the frontier of human exploration.</p>
            <button className="text-cyan-400 hover:text-cyan-300 font-bold">Learn More →</button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-900 py-8 border-t border-gray-800">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h5 className="text-lg font-bold mb-4 text-cyan-400">STELLAR VOYAGES</h5>
          <p className="text-gray-400">The premier space travel booking platform for your cosmic adventures.</p>
        </div>
        
        <div>
          <h5 className="text-lg font-bold mb-4">Quick Links</h5>
          <ul className="text-gray-400">
            <li className="mb-2"><a href="#" className="hover:text-white">About Us</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Destinations</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Packages</a></li>
            <li><a href="#" className="hover:text-white">Safety</a></li>
          </ul>
        </div>
        
        <div>
          <h5 className="text-lg font-bold mb-4">Support</h5>
          <ul className="text-gray-400">
            <li className="mb-2"><a href="#" className="hover:text-white">FAQs</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Contact Us</a></li>
            <li className="mb-2"><a href="#" className="hover:text-white">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>
        
        <div>
          <h5 className="text-lg font-bold mb-4">Connect With Us</h5>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
        © 2025 Stellar Voyages. All rights reserved.
      </div>
    </div>
  </footer>
);

// Reducer for state management
const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'SET_DESTINATION':
      return { ...state, selectedDestination: action.payload, dateError: null };
    case 'SET_DATE':
      // Input validation
      const selectedDate = new Date(action.payload);
      const today = new Date();
      const minBookingDate = new Date();
      minBookingDate.setDate(today.getDate() + 14); // Require booking at least 14 days in advance
      
      if (selectedDate < minBookingDate) {
        return { 
          ...state, 
          selectedDate: action.payload,
          dateError: "Bookings must be made at least 14 days in advance." 
        };
      }
      
      return { 
        ...state, 
        selectedDate: action.payload,
        dateError: null 
      };
    case 'SET_CLASS':
      return { ...state, selectedClass: action.payload };
    case 'SET_RECOMMENDATIONS':
      return { ...state, recommendations: action.payload };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
};

// Initial state
const initialState = {
  step: 1,
  selectedDestination: '',
  selectedDate: '',
  selectedClass: '',
  dateError: null,
  recommendations: []
};

// Main component
const SpaceTravelBooking = () => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  
  // Sample data for destinations and travel classes
  const destinations = [
    { id: 'lunar-hotel', name: 'Lunar Hotel', distance: '384,400 km', travelTime: '3 days' },
    { id: 'orbital-station', name: 'Orbital Station', distance: '400 km', travelTime: '6 hours' },
    { id: 'mars-base', name: 'Mars Base Alpha', distance: '225 million km', travelTime: '7 months' },
  ];
  
  const travelClasses = [
    { id: 'economy', name: 'Economy Shuttle', price: 50000, amenities: ['Basic Life Support', 'Shared Quarters', 'Standard Meals'] },
    { id: 'business', name: 'Business Class', price: 100000, amenities: ['Enhanced Life Support', 'Private Pod', 'Gourmet Meals', 'Entertainment System'] },
    { id: 'luxury', name: 'Luxury Cabin', price: 150000, amenities: ['Premium Life Support', 'Suite', 'Personal Chef', 'VR Entertainment', 'Space Walk'] },
    { id: 'vip', name: 'VIP Experience', price: 300000, amenities: ['Medical Bay Access', 'Private Suite', 'Personalized Service', 'Exclusive Activities', 'Priority Docking'] },
  ];
  
  // Sample accommodations data
  const accommodations = [
    { 
      destinationId: 'lunar-hotel', 
      options: [
        { name: 'Mare Tranquillitatis Suite', price: 15000, rating: 4.9, description: 'Luxury suite with Earth view' },
        { name: 'Crater View Room', price: 8000, rating: 4.5, description: 'Panoramic views of lunar landscape' },
        { name: 'Regolith Standard', price: 5000, rating: 4.2, description: 'Comfortable room with all amenities' }
      ]
    },
    { 
      destinationId: 'orbital-station', 
      options: [
        { name: 'Observation Deck Suite', price: 12000, rating: 4.8, description: '360° Earth and space views' },
        { name: 'Zero-G Cabin', price: 7500, rating: 4.6, description: 'Specialized for zero gravity comfort' },
        { name: 'Standard Module', price: 4000, rating: 4.3, description: 'Functional and comfortable' }
      ]
    },
    { 
      destinationId: 'mars-base', 
      options: [
        { name: 'Olympus Mons View', price: 25000, rating: 5.0, description: 'Premium suite with volcano views' },
        { name: 'Valles Marineris Cabin', price: 18000, rating: 4.7, description: 'Canyon views and premium amenities' },
        { name: 'Martian Habitat', price: 12000, rating: 4.4, description: 'Standard but comfortable Mars living' }
      ]
    }
  ];
  
  // Generate recommendations when destination is selected
  useEffect(() => {
    if (state.selectedDestination) {
      const destinationAccommodations = accommodations.find(a => a.destinationId === state.selectedDestination);
      if (destinationAccommodations) {
        // Show top 2 recommendations
        dispatch({ 
          type: 'SET_RECOMMENDATIONS', 
          payload: destinationAccommodations.options.slice(0, 2) 
        });
      }
    }
  }, [state.selectedDestination]);
  
  const handleNextStep = () => {
    if (state.step < 3) {
      dispatch({ type: 'SET_STEP', payload: state.step + 1 });
    }
  };
  
  const handlePreviousStep = () => {
    if (state.step > 1) {
      dispatch({ type: 'SET_STEP', payload: state.step - 1 });
    }
  };
  
  const handleBooking = () => {
    // Would connect to backend to process booking
    alert('Booking confirmed! Prepare for launch!');
    // Reset form or redirect to dashboard
    dispatch({ type: 'RESET_FORM' });
  };
  
  // Check if can proceed to next step
  const canProceed = () => {
    if (state.step === 1) {
      return state.selectedDestination && state.selectedDate && !state.dateError;
    }
    if (state.step === 2) {
      return state.selectedClass;
    }
    return true;
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      <Header />
      <HeroSection />
      
      {/* Booking Section */}
      <section id="booking" className="py-16 container mx-auto px-4">
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg border border-cyan-800">
          <h3 className="text-3xl font-bold mb-8 text-center text-cyan-400">Book Your Space Voyage</h3>
          
          <div className="mb-8 flex justify-between items-center">
            <div className="flex space-x-2">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${state.step >= 1 ? 'bg-cyan-500' : 'bg-gray-600'}`}>1</div>
              <div className={`h-1 w-16 self-center ${state.step >= 2 ? 'bg-cyan-500' : 'bg-gray-600'}`}></div>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${state.step >= 2 ? 'bg-cyan-500' : 'bg-gray-600'}`}>2</div>
              <div className={`h-1 w-16 self-center ${state.step >= 3 ? 'bg-cyan-500' : 'bg-gray-600'}`}></div>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${state.step >= 3 ? 'bg-cyan-500' : 'bg-gray-600'}`}>3</div>
            </div>
            <div className="text-sm text-gray-400">
              {state.step === 1 && 'Select Destination'}
              {state.step === 2 && 'Choose Travel Class'}
              {state.step === 3 && 'Review & Confirm'}
            </div>
          </div>
          
          {/* Step 1: Destination Selection */}
          {state.step === 1 && (
            <DestinationSelection 
              destinations={destinations} 
              selectedDestination={state.selectedDestination} 
              selectedDate={state.selectedDate}
              dateError={state.dateError}
              dispatch={dispatch} 
            />
          )}
          
          {/* Step 2: Travel Class Selection */}
          {state.step === 2 && (
            <TravelClassSelection 
              travelClasses={travelClasses} 
              selectedClass={state.selectedClass} 
              dispatch={dispatch} 
            />
          )}
          
          {/* Step 3: Booking Summary */}
          {state.step === 3 && (
            <BookingSummary 
              state={state} 
              destinations={destinations} 
              travelClasses={travelClasses} 
              dispatch={dispatch} 
            />
          )}
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-6">
            {state.step > 1 && (
              <button 
                className="border border-gray-600 hover:border-gray-500 text-white px-6 py-2 rounded-lg transform transition-transform hover:scale-105"
                onClick={handlePreviousStep}
              >
                Back
              </button>
            )}
            {state.step < 3 ? (
              <button 
                className={`ml-auto bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transform transition-transform ${canProceed() ? 'hover:scale-105' : ''}`}
                disabled={!canProceed()}
                onClick={handleNextStep}
              >
                Continue
              </button>
            ) : (
              <button 
                className="ml-auto bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-bold transform transition-transform hover:scale-105"
                onClick={handleBooking}
              >
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      </section>
      
      <FeaturedDestinations />
      <Footer />
      
      <style jsx>{`
        .stars {
          background-image: radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)), 
                            radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)), 
                            radial-gradient(1px 1px at 90px 40px, #fff, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
        }
      `}</style>
    </div>
  );
};

export default SpaceTravelBooking;
