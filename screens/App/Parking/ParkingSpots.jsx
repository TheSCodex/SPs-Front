import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import ParkingCars from "./ParkingCars";
import Car from "../../../assets/img/car.png";

const ParkingSpots = () => {
  const left1 = 45.9;
  const left2 = 225;
  const top1 = 41;
  const top2 = 120;
  const top3 = 195;
  const top4 = 275;
  const top5 = 350;
  // const [occupiedSpots, setOccupiedSpots] = useState([]);
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch();
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa");
        }
        const data = await response.json();
        setSensorData(sensorData);
      } catch (error) {
        console.error("Se produjo un error:", error);
      }
    };
    fetchSensorData();

    const interval = setInterval(fetchSensorData, 5000);
    return () => clearInterval(interval);
  }, []);

  const spotsNumbers = [
    { number: 1, top: top1, left: left1 },
    { number: 2, top: top2, left: left1 },
    { number: 3, top: top3, left: left1 },
    { number: 4, top: top4, left: left1 },
    { number: 5, top: top5, left: left1 },
    { number: 6, top: top5, left: left2 },
    { number: 7, top: top4, left: left2 },
    { number: 8, top: top3, left: left2 },
    { number: 9, top: top2, left: left2 },
    { number: 10, top: top1, left: 215 },
  ];

  return (
    <>
      <View className="absolute">
        {spotsNumbers?.map((spot, index) => (
          <View
            key={index}
            style={{
              position: "absolute",
              top: spot.top,
              left: spot.left,
            }}
          >
            {sensorData[index]?.state === 0 ? (
              <Image
                className="rotate-90 w-9 h-20"
                source={Car}
                style={{
                  position: "absolute",
                }}
              />
            ) : (
              <Text key={spot.number} className="text-white font-bold text-xl">
                {spot.number}
              </Text>
            )}
          </View>
        ))}
      </View>
    </>
  );
};

export default ParkingSpots;
