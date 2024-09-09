import React from "react";
import { ActivityCard } from "./activity-card";

interface TripActivity {
  timeRange: string;
  activityTitle: string;
  description: string;
  duration: string;
  price: string;
  photoUrl: string;
  googleMapUrl: string;
}

interface DayActivitiesProps {
  day: number;
  activities: TripActivity[];
}

const DayActivities: React.FC<DayActivitiesProps> = ({ day, activities }) => {
  return (
    <div className="mb-10 text-black">
      <h3 className="text-xl font-bold mb-4">Day {day}</h3>
      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div key={index}>
            <h4 className="text-orange-600 mb-2">{activity.timeRange}</h4>
            <ActivityCard
              timeRange={activity.timeRange}
              title={activity.activityTitle}
              description={activity.description}
              duration={activity.duration}
              price={activity.price}
              image={activity.photoUrl}
              url={activity.googleMapUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayActivities;
