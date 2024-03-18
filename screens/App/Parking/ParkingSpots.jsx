import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import ParkingCars from "./ParkingCars";

const ParkingSpots = () => {
  const left1 = 45.9;
  const left2 = 225;
  const top1 = 41;
  const top2 = 120;
  const top3 = 195;
  const top4 = 275;
  const top5 = 350;
  const [occupiedSpots, setOccupiedSpots] = useState([]);

  useEffect(() => {
    // Simular la ocupación aleatoria de los lugares por el carro
    const randomSpots = [];
    const spotsToOccupy = Math.floor(Math.random() * spotsNumbers.length);

    for (let i = 0; i < spotsToOccupy; i++) {
      const randomIndex = Math.floor(Math.random() * spotsNumbers.length);
      if (!randomSpots.includes(randomIndex)) {
        randomSpots.push(randomIndex);
      }
    }

    setOccupiedSpots(randomSpots);
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
            <Text key={spot.number} className="text-white font-bold text-xl">
              {spot.number}
            </Text>
          </View>
        ))}
      </View>
      <ParkingCars occupiedSpots={occupiedSpots} spotsNumbers={spotsNumbers} />
    </>
  );
};

export default ParkingSpots;
