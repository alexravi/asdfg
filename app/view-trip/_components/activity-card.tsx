import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ActivityCardProps {
  timeRange?: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  url?: string;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  timeRange,
  title,
  description,
  duration,
  price,
  image,
  url,
}) => {
  console.log("🚀 ~ timeRange:", timeRange);
  const placeholderImage = ""; // Update this path accordingly

  return (
    <>
      <Link href={url as string}>
        <div className="bg-white rounded-lg shadow-md flex p-4 space-x-4 text-black">
          {/* Image */}
          <div className="w-32 h-32 overflow-hidden rounded-lg">
            <Image
              src={image.startsWith("http") ? image : placeholderImage} // Check if the URL is valid, else use the placeholder
              alt={title}
              className="w-full h-full object-cover"
              width={128}
              height={128}
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="font-semibold text-lg">{title}</h4>
              <p className="text-gray-500">{description}</p>
            </div>
            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
              <div>🕒 {duration}</div>
              <div>💰 {price}</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
