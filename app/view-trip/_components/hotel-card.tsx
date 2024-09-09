import React from "react";
import Image from "next/image";
import Link from "next/link";

interface HotelCardProps {
  image: string;
  name: string;
  address: string;
  price: string;
  rating: string;
  url?: string;
}

const HotelCard: React.FC<HotelCardProps> = ({
  image,
  name,
  address,
  price,
  rating,
  url,
}) => {
  const placeholderImage = ""; // Update this path accordingly

  return (
    <>
      <Link href={url as string}>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden text-black">
          <Image
            src={image.startsWith("http") ? image : placeholderImage} // Check if the URL is valid, else use the placeholder
            alt={name}
            width={400}
            height={160}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">{address}</p>
            <p className="mt-2 text-sm text-gray-700">💰 {price} per night</p>
            <p className="mt-1 text-sm text-gray-700">⭐ {rating} stars</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default HotelCard;
