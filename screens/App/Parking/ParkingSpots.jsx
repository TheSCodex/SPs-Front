import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import ParkingCars from "./ParkingCars";
import { URL } from '@env';

const ParkingSpots = () => {
  const left1 = 45.9;
  const left2 = 225;
  const top1 = 41;
  const top2 = 120;
  const top3 = 195;
  const top4 = 275;
  const top5 = 350;
  const [parking, setParking] = useState([]);
  const [occupiedSpots, setOccupiedSpots] = useState([]);
  const [reservedSpots, setReservedSpots] = useState([]);
  const [triggerRender, setTriggerRender] = useState(false); 

  const mapOccupiedSpotsIds = (parkingData) => {
    const mapping = {
      1: 1,
      2: 3,
      3: 5,
      4: 7,
      5: 9
    };

    const occupiedSpotsIds = parkingData
      .filter(spot => spot.statusId === 3)
      .map(spot => mapping[spot.id]);

    return occupiedSpotsIds;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL + "/status/parkingSpots");
        if (!response.ok) {
          throw new Error('Error en la solicitud de estacionamiento');
        }
        const parkingData = await response.json();
        setParking(parkingData);

        const occupiedSpotsIds = mapOccupiedSpotsIds(parkingData);
        const reservedSpotsIds = parkingData
          .filter(spot => spot.statusId === 2)
          .map(spot => spot.id);
        
        setOccupiedSpots(occupiedSpotsIds);
        setReservedSpots(reservedSpotsIds);
        setTriggerRender(prevState => !prevState);
      } catch (error) {
        console.error("Error fetching parking status:", error);
      }
    };

    fetchData();
  }, [triggerRender]);

  useEffect(() => {
    console.log(URL);
    console.log(occupiedSpots);
  }, []);

  const spotsNumbers = [
    { id: 1, number: 1, top: top1, left: left1 },
    { id: 2, number: 2, top: top2, left: left1 },
    { id: 3, number: 3, top: top3, left: left1 },
    { id: 4, number: 4, top: top4, left: left1 },
    { id: 5, number: 5, top: top5, left: left1 },
    { id: 6, number: 6, top: top5, left: left2 },
    { id: 7, number: 7, top: top4, left: left2 },
    { id: 8, number: 8, top: top3, left: left2 },
    { id: 9, number: 9, top: top2, left: left2 },
    { id: 10, number: 10, top: top1, left: 215 },
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
            <Text key={spot.id} style={[styles.spotText, reservedSpots.includes(spot.id) ? { color: 'gray' } : null]}>
              {spot.number}
            </Text>
          </View>
        ))}
      </View>
      <ParkingCars reservedSpots={reservedSpots} occupiedSpots={occupiedSpots} spotsNumbers={spotsNumbers} />
    </>
  );
};

const styles = {
  spotText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
};

export default ParkingSpots;
