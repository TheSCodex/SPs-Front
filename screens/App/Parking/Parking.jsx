import { View, Image } from "react-native";
import React from "react";
import img from "../../../assets/img/Parking1.png";
import ParkingSpots from "./ParkingSpots";
import ParkingCars from "./ParkingCars";

const Parking = () => {
  return (
    <View className="flex-col items-center justify-center w-full">
      <View className="w-[72%] h-full relative">
        <Image source={img} className="w-full h-full" />
        <ParkingSpots />
        <ParkingCars />
      </View>
    </View>
  );
};

export default Parking;