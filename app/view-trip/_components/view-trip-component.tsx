// "use client";
// import React, { useState } from "react";
// import { CalendarDaysIcon, UsersIcon } from "@heroicons/react/24/outline";
// import Image from "next/image";
// import DayActivities from "./day-activity";
// import HotelCard from "./hotel-card";

// interface Hotel {
//   name: string;
//   address: string;
//   price: string;
//   rating: string;
//   image: string;
// }

// interface Activity {
//   timeRange: string;
//   title: string;
//   description: string;
//   duration: string;
//   price: string;
//   image: string;
// }

// interface Trip {
//   location: string;
//   image: string;
//   duration: string;
//   budget: string;
//   travelers: string;
// }

// export const ViewTripComponent: React.FC = () => {
//   const [trip, setTrip] = useState<Trip>({
//     location: "Las Vegas, NV, USA",
//     image: "https://media.timeout.com/images/105239239/750/422/image.jpg",
//     duration: "2 Days",
//     budget: "Moderate Budget",
//     travelers: "5 to 10 People",
//   });
//   console.log("Set Trip ---- > ", setTrip);

//   const hotels: Hotel[] = [
//     {
//       name: "The Venetian Resort Las Vegas",
//       address: "3355 Las Vegas Blvd S, Las Vegas, NV 89109",
//       price: "$200-$350",
//       rating: "4.5",
//       image:
//         "https://cdn.travelandleisure.com/sites/default/files/styles/1600x1000/public/1535645762/venetian-las-vegas-exterior-VENETIANHOTEL0818.jpg",
//     },
//     {
//       name: "The Cosmopolitan of Las Vegas",
//       address: "3708 Las Vegas Blvd S, Las Vegas, NV 89109",
//       price: "$250-$450",
//       rating: "4.5",
//       image:
//         "https://cdn1.matadornetwork.com/blogs/1/2022/09/Las-Vegas-Cosmopolitan-Hotel-1200x853.jpg",
//     },
//     {
//       name: "The Wynn Las Vegas",
//       address: "3131 Las Vegas Blvd S, Las Vegas, NV 89109",
//       price: "$300-$500",
//       rating: "5",
//       image: "https://media.timeout.com/images/105239239/750/422/image.jpg",
//     },
//     {
//       name: "The Palazzo Resort Hotel Casino",
//       address: "3325 Las Vegas Blvd S, Las Vegas, NV 89109",
//       price: "$220-$380",
//       rating: "4.5",
//       image: "https://cdn.getyourguide.com/img/tour/5f19629a29a9d.jpeg/146.jpg",
//     },
//   ];

//   const days: { day: number; activities: Activity[] }[] = [
//     {
//       day: 1,
//       activities: [
//         {
//           timeRange: "10:00 AM - 12:00 PM",
//           title: "High Roller Observation Wheel",
//           description:
//             "A giant observation wheel offering 360-degree views of the city.",
//           duration: "15 minutes",
//           price: "$30-$40 per person",
//           image: "https://linktoimage.com/wheel.jpg",
//         },
//         {
//           timeRange: "12:00 PM - 2:00 PM",
//           title: "The LINQ Promenade",
//           description: "An outdoor shopping and dining promenade.",
//           duration: "10 minutes",
//           price: "Free",
//           image: "https://linktoimage.com/linq.jpg",
//         },
//         {
//           timeRange: "2:00 PM - 4:00 PM",
//           title: "Bellagio Conservatory & Botanical Garden",
//           description:
//             "A stunning botanical garden located inside the Bellagio Hotel.",
//           duration: "15 minutes",
//           price: "Free",
//           image: "https://linktoimage.com/bellagio.jpg",
//         },
//         {
//           timeRange: "4:00 PM - 6:00 PM",
//           title: "The Venetian and The Palazzo",
//           description:
//             "Explore the luxurious Venetian and Palazzo resorts. Take a gondola ride or explore boutiques.",
//           duration: "10 minutes",
//           price: "Varies depending on activities",
//           image: "https://linktoimage.com/venetian.jpg",
//         },
//       ],
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center py-10">
//       <div className="">
//         <h1>AI Trip Planner</h1>
//       </div>
//       <div className="bg-white p-8 rounded-lg w-full max-w-7xl">
//         {/* Trip Image */}
//         <div className="overflow-hidden rounded-lg">
//           <Image
//             src={trip.image}
//             alt={trip.location}
//             width={1280}
//             height={720}
//             className="w-full h-72 object-cover rounded-lg"
//           />
//         </div>

//         {/* Trip Info */}
//         <div className="mt-6">
//           <h2 className="text-3xl font-bold text-gray-800">{trip.location}</h2>

//           {/* Trip Details */}
//           <div className="mt-4 flex items-center space-x-4 text-gray-500">
//             <div className="flex items-center space-x-1">
//               <CalendarDaysIcon className="h-5 w-5 text-gray-500" />
//               <span>{trip.duration}</span>
//             </div>

//             <div className="flex items-center space-x-1">
//               <span>💰</span>
//               <span>{trip.budget}</span>
//             </div>

//             <div className="flex items-center space-x-1">
//               <UsersIcon className="h-5 w-5 text-gray-500" />
//               <span>No. of Travelers: {trip.travelers}</span>
//             </div>
//           </div>

//           {/* Hotel Recommendation Section */}
//           <div className="mt-10 text-black">
//             <h3 className="text-xl font-bold mb-4">Hotel Recommendation</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {hotels.map((hotel, index) => (
//                 <HotelCard
//                   key={index}
//                   image={hotel.image}
//                   name={hotel.name}
//                   address={hotel.address}
//                   price={hotel.price}
//                   rating={hotel.rating}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Day Activities Section */}
//           <div className="mt-10 text-black">
//             <h3 className="text-xl font-bold mb-4">Places to Visit</h3>
//             {days.map((dayData) => (
//               <DayActivities
//                 key={dayData.day}
//                 day={dayData.day}
//                 activities={dayData.activities}
//               />
//             ))}
//           </div>

//           {/* Action Button */}
//           <div className="flex justify-end mt-6">
//             <button className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg flex items-center space-x-2 transition-all duration-300">
//               <span>Plan Your Trip</span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//                 fill="none"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path stroke="none" d="M0 0h24v24H0z" />
//                 <line x1="5" y1="12" x2="19" y2="12" />
//                 <line x1="13" y1="18" x2="19" y2="12" />
//                 <line x1="13" y1="6" x2="19" y2="12" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

////////////////////////////////////////////////////////////////////////////////

"use client";
import React, { useState, useEffect } from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import DayActivities from "./day-activity";
import HotelCard from "./hotel-card";

interface HotelRecommendation {
  name: string;
  address: string;
  price: string;
  rating: string;
  photoUrl: string;
  googleMapUrl?: string;
}

interface TripActivity {
  timeRange: string;
  activityTitle: string;
  description: string;
  duration: string;
  price: string;
  photoUrl: string;
  googleMapUrl: string;
}

interface TripDay {
  day: number;
  activities: TripActivity[];
}

interface TripData {
  destinationName: string;
  destinationPhoto: string;
  tripDays: TripDay[];
  hotelRecommendations: HotelRecommendation[];
}

export const ViewTripComponent: React.FC = () => {
  const [tripData, setTripData] = useState<TripData | null>(null);

  // Retrieve the trip data from localStorage when the component mounts
  useEffect(() => {
    const storedTrip = localStorage.getItem("generatedTrip");
    if (storedTrip) {
      const parsedTrip = JSON.parse(storedTrip);
      setTripData(parsedTrip);
    }
  }, []);

  // Function to check if a URL is valid
  const isValidUrl = (url: string) => {
    return url.startsWith("http://") || url.startsWith("https://");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10">
      <div className="">
        <h1>AI Trip Planner</h1>
      </div>
      <div className="bg-white p-8 rounded-lg w-full max-w-7xl">
        {/* Trip Data */}
        {tripData ? (
          <>
            {/* Destination Photo */}
            {isValidUrl(tripData?.destinationPhoto) ? (
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={tripData.destinationPhoto}
                  alt={tripData.destinationName}
                  width={1280}
                  height={720}
                  className="w-full h-72 object-cover rounded-lg"
                />
              </div>
            ) : (
              <div className="w-full h-72 bg-gray-200 flex items-center justify-center rounded-lg">
                <span>No image available</span>
              </div>
            )}

            {/* Destination Name */}
            <div className="mt-6">
              <h2 className="text-3xl font-bold text-gray-800">
                {tripData?.destinationName}
              </h2>

              {/* Trip Details */}
              <div className="mt-4 flex items-center space-x-4 text-gray-500">
                <div className="flex items-center space-x-1">
                  <CalendarDaysIcon className="h-5 w-5 text-gray-500" />
                  <span>{tripData?.tripDays?.length} Days</span>
                </div>
              </div>

              {/* Home Recommendation Section */}
              <div className="mt-10 text-black">
                <h3 className="text-xl font-bold mb-4">Home Recommendations</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {tripData?.hotelRecommendations?.map((home, index) => (
                    <HotelCard
                      key={index}
                      image={
                        isValidUrl(home.photoUrl)
                          ? home.photoUrl
                          : "/path/to/placeholder-image.jpg"
                      }
                      name={home.name}
                      address={home.address}
                      price={home.price}
                      rating={home.rating}
                      url={home?.googleMapUrl as string}
                    />
                  ))}
                </div>
              </div>

              {/* Day Activities Section */}
              <div className="mt-10 text-black">
                <h3 className="text-xl font-bold mb-4">Places to Visit</h3>
                {tripData?.tripDays?.map((day, index) => (
                  <DayActivities
                    key={index}
                    day={day.day}
                    activities={day?.activities}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <p>No trip data found. Please generate your trip first.</p>
        )}
      </div>
    </div>
  );
};
