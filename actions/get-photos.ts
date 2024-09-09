/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    "X-Goog-FieldMask": ["places.photos", "places.displayName", "places.id"],
  },
};
//@ts-expect-error
export const getPlaceDetails = (data) => axios.post(BASE_URL, data, config);
