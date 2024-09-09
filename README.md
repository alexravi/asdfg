# Adventure Tour Travel Plan Generator

## Overview

The **Adventure Tour Travel Plan Generator** is a web-based application that allows users to create personalized travel itineraries based on their preferences such as destination, budget, travel style, and interests. The platform integrates AI to generate detailed itineraries and provides Google Maps integration for easy location search and navigation.

## Features

- **Personalized Travel Itineraries**: Users can input preferences, and AI will generate a custom travel plan.
- **Google Maps Integration**: Users can search for destination images and navigate to locations via Google Maps.
- **Interactive Itineraries**: The generated itineraries include day-by-day plans, recommended activities, and hotel suggestions, all linked to Google Maps for easy navigation.

## Tech Stack

- **Frontend**: Next.js, TailwindCSS, ShadCN UI
- **Backend**: Next.js API Routes, OpenAI GPT-4o, Google Maps API
- **AI Integration**: GPT-4o for travel plan generation

## Application Architecture

The app uses a full-stack architecture built on Next.js, with server-side rendering for enhanced performance. The backend is powered by API routes that communicate with the AI model (GPT-4o) to generate itineraries and with Google Maps for location search. PostgreSQL stores user data, such as preferences and saved itineraries.

## Installation

To run the project locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/adventure-tour-travel-plan-generator.git
    ```

2. Navigate to the project directory:

    ```bash
    cd adventure-tour-travel-plan-generator
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file with the following variables:

    ```
    OPENAI_API_KEY=your_openai_api_key
    GOOGLE_MAPS_API_KEY=your_google_maps_api_key
    DATABASE_URL=your_postgresql_connection_string
    ```

5. Run the development server:

    ```bash
    npm run dev
    ```

6. Open your browser and go to [http://localhost:3000](http://localhost:3000).

## Usage

1. Visit the landing page and start by entering your trip preferences (destination, budget, travel style, etc.).
2. The AI will generate a detailed itinerary for your trip.
3. Click on any destination or hotel to view it on Google Maps.
4. Adjust your preferences as needed to regenerate itineraries.

## Future Improvements

- **User Authentication**: Implement account creation and itinerary saving.
- **Real-time Updates**: Provide real-time travel updates (weather, flight cancellations).
- **Booking Integration**: Enable direct booking of flights and hotels.
- **Mobile App**: Create a mobile app for better on-the-go experience.
- **Social Sharing**: Add social sharing functionality for users to share their itineraries.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue if you have suggestions or improvements.

## License

This project is licensed under the MIT License.
