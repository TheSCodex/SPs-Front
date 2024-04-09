import { View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import SpotParking1 from "../../../assets/ImgDirections/SpotParking1.png";
import SpotParking2 from "../../../assets/ImgDirections/SpotParking2.png";
import SpotParking3 from "../../../assets/ImgDirections/SpotParking3.png";
import SpotParking4 from "../../../assets/ImgDirections/SpotParking4.png";
import SpotParking5 from "../../../assets/ImgDirections/SpotParking5.png";
import SpotParking6 from "../../../assets/ImgDirections/SpotParking6.png";
import SpotParking7 from "../../../assets/ImgDirections/SpotParking7.png";
import SpotParking8 from "../../../assets/ImgDirections/SpotParking8.png";
import SpotParking9 from "../../../assets/ImgDirections/SpotParking9.png";
import SpotParking10 from "../../../assets/ImgDirections/SpotParking10.png";

import ParkingSpots from "./ParkingSpots";
import ParkingCars from "./ParkingCars";
import { URL } from '@env';

function ParkingDirections({ userId }) {
  const [directionsImage, setDirectionsImage] = useState(null)
  const [selectedSpot, setSelectedSpot] = useState(null);

  useEffect(() => {
    const getReservation = async () => {
      try {
        const response = await fetch(`${URL}/reservations/user/${userId}`);
        if (!response.ok) {
          throw new Error('Error en la solicitud de reservaciones');
        }
        const data = await response.json();
        const reservation = data[0];
        setSelectedSpot(reservation.spotId);
      } catch (error) {
        console.error(`Error al obtener las reservaciones del usuario con ID ${userId}:`, error);
      }
    };

    getReservation(); 
  }, [userId]);

  useEffect(() => {
    const spotIdToImageMap = {
      1: SpotParking1,
      2: SpotParking2,
      3: SpotParking3,
      4: SpotParking4,
      5: SpotParking5,
      6: SpotParking6,
      7: SpotParking7,
      8: SpotParking8,
      9: SpotParking9,
      10: SpotParking10
    };

    if (selectedSpot && spotIdToImageMap[selectedSpot]) {
      setDirectionsImage(spotIdToImageMap[selectedSpot]);
    }
    console.log("El lugar reservado es", selectedSpot);
  }, [selectedSpot]);

  return (
    <View className="flex-col items-center justify-center w-full">
      <View className="w-[72%] h-full relative">
        <Image source={directionsImage} className="w-full h-full" />
        <ParkingSpots />
        <ParkingCars />
      </View>
    </View>
  );
}

export default ParkingDirections;