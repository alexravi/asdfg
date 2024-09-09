/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input"; // Import the Shadcn Input
import { AiTripModel, TripDay } from "@/actions/ai-trip-model/ai-trip-model";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Script from "next/script";

interface destinationProps {
  label: string;
  value: {
    description: string;
  };
}

export const CreateTripComponent = () => {
  const [destination, setDestination] = useState<destinationProps>();
  console.log("🚀 ~ CreateTripComponent ~ destination:", destination);
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [travelStyle, setTravelStyle] = useState(""); // Travel Style (Luxury, Adventure, etc.)
  const [activityType, setActivityType] = useState(""); // Activity Types (Beach, Historical sites, etc.)
  const [isPending, startTransaction] = useTransition();
  const [trip, setTrip] = useState<TripDay[]>();
  console.log("🚀 ~ CreateTripComponent ~ trip:", trip);

  const handleSubmitFunction = () => {
    startTransaction(() => {
      if (!destination) {
        toast.error("Please select a destination");
        return;
      }

      AiTripModel({
        destination: destination.label, // Getting the selected place's label
        days: parseInt(days, 10),
        budget,
        travelStyle,
        activityType,
      }).then((data: any) => {
        if (data.success) {
          const {
            destinationName,
            destinationPhoto,
            tripDays,
            hotelRecommendations,
          } = data.data;

          // Prepare the data to be stored in localStorage
          const tripData = {
            destinationName,
            destinationPhoto,
            tripDays,
            hotelRecommendations, // Include home recommendations in the stored data
          };

          // Set the trip days and home recommendations in state for further usage
          setTrip(tripDays);
          // setHomeRecommendations(homeRecommendations);

          // Remove existing trip data from localStorage
          localStorage.removeItem("generatedTrip");

          // Save the new trip data to localStorage
          localStorage.setItem("generatedTrip", JSON.stringify(tripData));

          // Notify the user of successful generation
          toast.success("Trip generated successfully!");

          // Redirect to the view trip page
          window.location.href = `/view-trip`;
        } else if (data.error) {
          toast.error(data.error);
        }
      });
    });
  };

  return (
    <>
      {/* Add Google Places API Script */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="beforeInteractive"
        onLoad={() => console.log("Google Maps Script Loaded")}
        onError={() => console.log("Google Maps Script Failed to Load")}
      />

      <div className="min-h-screen bg-white flex flex-col items-center py-10">
        <div className="bg-white p-8 rounded-lg w-full max-w-7xl">
          {/* Header */}
          <h1 className="text-4xl font-bold text-black text-center mb-2">
            Tell us your travel preferences 🌄 🌴
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Just provide some basic information, and our trip planner will
            generate a customized itinerary based on your preferences.
          </p>

          {/* Form Section */}
          <div className="space-y-6">
            {/* Destination */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                What is your destination of choice?
              </label>
              <GooglePlacesAutocomplete
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                selectProps={{
                  value: destination,
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-errors
                  onChange: (value) => setDestination(value),
                  placeholder: "Select a destination...",
                  className: "w-full text-black",
                }}
              />
            </div>

            {/* Trip Duration - Shadcn Input */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                How many days are you planning your trip?
              </label>
              <Input
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder="Ex. 3"
                className="w-full text-black"
              />
            </div>

            {/* Budget Section */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-4">
                What is Your Budget?
              </label>
              <div className="grid grid-cols-3 gap-4">
                {/* Cheap Budget */}
                <button
                  className={`flex flex-col items-center justify-center p-6 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                    budget === "Cheap"
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setBudget("Cheap")}
                >
                  <span className="text-4xl mb-4">💵</span>
                  <span className="font-bold text-lg">Cheap</span>
                  <span className="text-sm">Stay conscious of costs</span>
                </button>

                {/* Moderate Budget */}
                <button
                  className={`flex flex-col items-center justify-center p-6 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                    budget === "Moderate"
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setBudget("Moderate")}
                >
                  <span className="text-4xl mb-4">💰</span>
                  <span className="font-bold text-lg">Moderate</span>
                  <span className="text-sm">
                    Keep costs on the average side
                  </span>
                </button>

                {/* Luxury Budget */}
                <button
                  className={`flex flex-col items-center justify-center p-6 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                    budget === "Luxury"
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setBudget("Luxury")}
                >
                  <span className="text-4xl mb-4">💸</span>
                  <span className="font-bold text-lg">Luxury</span>
                  <span className="text-sm">Don&apos;t worry about cost</span>
                </button>
              </div>
            </div>

            {/* Travel Style Section */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-4">
                What is Your Travel Style?
              </label>
              <div className="grid grid-cols-3 gap-4">
                {/* Luxury Travel Style */}
                <button
                  className={`flex flex-col items-center justify-center p-6 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                    travelStyle === "Luxury"
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setTravelStyle("Luxury")}
                >
                  <span className="text-4xl mb-4">🌟</span>
                  <span className="font-bold text-lg">Luxury</span>
                  <span className="text-sm">Comfort and leisure</span>
                </button>

                {/* Adventure Travel Style */}
                <button
                  className={`flex flex-col items-center justify-center p-6 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                    travelStyle === "Adventure"
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setTravelStyle("Adventure")}
                >
                  <span className="text-4xl mb-4">🏞️</span>
                  <span className="font-bold text-lg">Adventure</span>
                  <span className="text-sm">Exploration and thrill</span>
                </button>

                {/* Backpacking Travel Style */}
                <button
                  className={`flex flex-col items-center justify-center p-6 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                    travelStyle === "Backpacking"
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setTravelStyle("Backpacking")}
                >
                  <span className="text-4xl mb-4">🎒</span>
                  <span className="font-bold text-lg">Backpacking</span>
                  <span className="text-sm">On a budget adventure</span>
                </button>
              </div>
            </div>

            {/* Activity Types Section */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-4">
                What Activities Interest You?
              </label>
              <div className="grid grid-cols-3 gap-4">
                {/* Beach Activity */}
                <button
                  className={`flex flex-col items-center justify-center p-6 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                    activityType === "Beach"
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setActivityType("Beach")}
                >
                  <span className="text-4xl mb-4">🏖️</span>
                  <span className="font-bold text-lg">Beach</span>
                  <span className="text-sm">Relax by the sea</span>
                </button>

                {/* Historical Sites Activity */}
                <button
                  className={`flex flex-col items-center justify-center p-6 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                    activityType === "Historical"
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setActivityType("Historical")}
                >
                  <span className="text-4xl mb-4">🏛️</span>
                  <span className="font-bold text-lg">Historical Sites</span>
                  <span className="text-sm">Explore ancient history</span>
                </button>

                {/* Mountains Activity */}
                <button
                  className={`flex flex-col items-center justify-center p-6 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                    activityType === "Mountains"
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setActivityType("Mountains")}
                >
                  <span className="text-4xl mb-4">🏔️</span>
                  <span className="font-bold text-lg">Mountains</span>
                  <span className="text-sm">Explore the peaks</span>
                </button>

                {/* Wildlife Activity */}
                <button
                  className={`flex flex-col items-center justify-center p-6 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                    activityType === "Wildlife"
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setActivityType("Wildlife")}
                >
                  <span className="text-4xl mb-4">🐘</span>
                  <span className="font-bold text-lg">Wildlife</span>
                  <span className="text-sm">Safaris and nature</span>
                </button>

                {/* City Tours Activity */}
                <button
                  className={`flex flex-col items-center justify-center p-6 border rounded-lg text-center transition-all duration-300 transform hover:scale-105 ${
                    activityType === "City Tours"
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setActivityType("City Tours")}
                >
                  <span className="text-4xl mb-4">🏙️</span>
                  <span className="font-bold text-lg">City Tours</span>
                  <span className="text-sm">Explore the city life</span>
                </button>
              </div>
            </div>

            {/* Generate Button */}
            <div className="text-center mt-14 flex flex-row items-center justify-end">
              <button
                onClick={handleSubmitFunction}
                disabled={isPending}
                className="bg-[#f56551] hover:bg-indigo-600 text-white py-3 px-4 rounded-lg shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105"
              >
                {isPending ? <ClipLoader /> : "Generate Your Trip"}
              </button>
            </div>

            {/* Display the Generated Trip */}
          </div>
        </div>
      </div>
    </>
  );
};
