"use server";

import axios from "axios";

export interface AiTripRequest {
  destination: string;
  days: number;
  budget: string;
  travelStyle: string;
  activityType: string;
}

export interface TripActivity {
  timeRange: string;
  activityTitle: string;
  description: string;
  duration: string;
  price: string;
  photoUrl?: string;
  googleMapUrl?: string;
}

export interface TripDay {
  day: number;
  activities: TripActivity[];
}

export interface HotelRecommendation {
  name: string;
  address: string;
  price: string;
  rating: string;
  amenities: string;
  nearbyAttractions: string;
  photoUrl?: string;
  googleMapUrl?: string;
}

export interface AiTripResponse {
  success?: boolean;
  error?: string;
  data?: {
    destinationName: string;
    destinationPhoto: string;
    tripDays: TripDay[];
    hotelRecommendations: HotelRecommendation[];
  };
}

export async function AiTripModel({
  destination,
  days,
  budget,
  travelStyle,
  activityType,
}: AiTripRequest): Promise<AiTripResponse> {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  try {
    if (!destination || !days || !budget || !travelStyle || !activityType) {
      return { error: "All fields must be provided!" };
    }

    const prompt = `You are a travel planning expert. Create a detailed and realistic trip itinerary for a ${days}-day trip to ${destination} with a ${budget} budget.
    The travel style is ${travelStyle}, and the user prefers ${activityType} activities (e.g., adventurous, relaxing, cultural).
    Ensure there are activities planned for each part of the day (morning, afternoon, and evening), and they reflect the user's preferences. The plan should be based on real-world data, actual activities, and real experiences in the destination. Avoid generating fictional places or events.

    ### Output Format:
    Trip to: ${destination}
    Budget: ${budget}
    Days: ${days}
    Travel Style: ${travelStyle}
    Preferred Activities: ${activityType}

    ### Itinerary Structure:
    For each day, include the following:
    - **Time Range:** <time_range>
    - **Activity:** <activity_title>
    - **Description:** <detailed_description_of_the_activity> (Include nearby attractions, things to see or experience, and realistic expectations)
    - **Duration:** <activity_duration>
    - **Price:** <activity_price> (mention 'Free' if no cost is involved)

    Include both morning, afternoon, and evening activities, as well as suggestions for evening leisure or dining.

    #### Hotel Recommendations:
    Provide 4 luxury hotel options that align with the user's budget and travel style. For each hotel, provide the following details:
    1. **Name:** <hotel_name>
       - **Address:** <hotel_address>
       - **Price per Night:** <hotel_price_per_night>
       - **Rating:** <hotel_rating>
       - **Amenities:** <hotel_amenities>
       - **Nearby Attractions:** <nearby_attractions>

    **IMPORTANT**:
    1. Use real information and avoid creating fictional data.
    2. Respond in the exact structure mentioned, with no deviation.`;

    const aiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 4096,
          temperature: 0.5,
        }),
      }
    );

    const aiData = await aiResponse.json();
    console.log("AI Response -------> ", aiData.choices?.[0]?.message?.content);

    if (!aiResponse.ok || !aiData.choices?.[0]?.message?.content) {
      console.error("Error from OpenAI API:", aiData.error?.message);
      return { error: "Failed to generate trip using OpenAI" };
    }

    const aiGeneratedContent = aiData.choices[0].message.content.trim();

    // Parse the structured AI content
    const structuredTripData =
      (await parseTripContent(aiGeneratedContent, googleApiKey as string)) ||
      [];

    const hotelRecommendations =
      (await parseHotelRecommendations(
        aiGeneratedContent,
        googleApiKey as string
      )) || [];

    // Fetch destination photo using Google Places API
    const destinationPhotoUrl = await getGooglePlacePhoto(
      destination,
      googleApiKey as string
    );

    const finalTripData = {
      destinationName: destination,
      destinationPhoto: destinationPhotoUrl || "No photo available",
      tripDays: structuredTripData,
      hotelRecommendations: hotelRecommendations,
    };
    console.log("🚀 ~ finalTripData:", finalTripData);

    return {
      success: true,
      data: finalTripData,
    };
  } catch (error) {
    console.error("Error generating trip:", error);
    return {
      error: "An error occurred while generating the trip.",
    };
  }
}

// Parsing function to handle the AI response format for trip content
async function parseTripContent(
  content: string,
  googleApiKey: string
): Promise<TripDay[]> {
  const tripDays: TripDay[] = [];

  // Improved Regex to match each day's activities (#### Day X: Day Title)
  const dayRegex = /#### Day (\d+)(: .*?)?\n([\s\S]*?)(?=####|###|$)/g;
  let dayMatch;

  while ((dayMatch = dayRegex.exec(content)) !== null) {
    const dayNumber = parseInt(dayMatch[1], 10);
    const activities: TripActivity[] = [];
    const activitiesBlock = dayMatch[3];

    // Regex to match each activity within the day's activities block
    const activityRegex =
      /- \*\*Time Range:\*\* (.*?)\n- \*\*Activity:\*\* (.*?)\n- \*\*Description:\*\* (.*?)\n- \*\*Duration:\*\* (.*?)\n- \*\*Price:\*\* (.*?)\n/g;
    let activityMatch;

    while ((activityMatch = activityRegex.exec(activitiesBlock)) !== null) {
      const timeRange = activityMatch[1].trim();
      const activityTitle = activityMatch[2].trim();
      const description = activityMatch[3].trim();
      const duration = activityMatch[4].trim();
      const price = activityMatch[5].trim();

      const googleMapUrl = await getGooglePlaceUrl(activityTitle, googleApiKey);
      const photoUrl = await getGooglePlacePhoto(activityTitle, googleApiKey);

      activities.push({
        timeRange,
        activityTitle,
        description,
        duration,
        price,
        photoUrl: photoUrl || "No photo available",
        googleMapUrl: googleMapUrl || "No map available",
      });
    }

    tripDays.push({
      day: dayNumber,
      activities,
    });
  }

  return tripDays;
}

// Parsing function to handle AI response format for hotel recommendations
async function parseHotelRecommendations(
  content: string,
  googleApiKey: string
): Promise<HotelRecommendation[]> {
  const hotelRecommendations: HotelRecommendation[] = [];

  // Improved Regex to match hotel recommendations block, including the hotel numbering
  const hotelRegex =
    /\d+\.\s\*\*Name:\*\*\s(.*?)\n\s+-\s\*\*Address:\*\*\s(.*?)\n\s+-\s\*\*Price per Night:\*\*\s(.*?)\n\s+-\s\*\*Rating:\*\*\s(.*?)\s*\/?\s?5?\n\s+-\s\*\*Amenities:\*\*\s(.*?)\n\s+-\s\*\*Nearby Attractions:\*\*\s(.*?)\n/g;

  let match;

  while ((match = hotelRegex.exec(content)) !== null) {
    const name = match[1].trim();
    const address = match[2].trim();
    const price = match[3].trim();
    const rating = match[4].trim();
    const amenities = match[5].trim();
    const nearbyAttractions = match[6].trim();

    // Fetch Google Map URL and Photo URL for the hotel
    const googleMapUrl = await getGooglePlaceUrl(name, googleApiKey);
    const photoUrl = await getGooglePlacePhoto(name, googleApiKey);

    hotelRecommendations.push({
      name,
      address,
      price,
      rating,
      amenities,
      nearbyAttractions,
      photoUrl: photoUrl || "No photo available",
      googleMapUrl: googleMapUrl || "No map available",
    });
  }

  return hotelRecommendations;
}

// Fetch Google Places photo for a given query
async function getGooglePlacePhoto(
  query: string,
  apiKey: string
): Promise<string | null> {
  const BASE_URL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
    query
  )}&inputtype=textquery&fields=photos&key=${apiKey}`;

  try {
    const response = await axios.get(BASE_URL);
    const place = response.data.candidates?.[0];

    if (place?.photos?.[0]?.photo_reference) {
      const photoReference = place.photos[0].photo_reference;
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photoReference}&key=${apiKey}`;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching Google Place photo:", error);
    return null;
  }
}

// Fetch Google Places URL for a given query
async function getGooglePlaceUrl(
  query: string,
  apiKey: string
): Promise<string | null> {
  const BASE_URL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
    query
  )}&inputtype=textquery&fields=place_id&key=${apiKey}`;

  try {
    const response = await axios.get(BASE_URL);
    const place = response.data.candidates?.[0];

    if (place?.place_id) {
      return `https://www.google.com/maps/place/?q=place_id:${place.place_id}`;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching Google Place URL:", error);
    return null;
  }
}
