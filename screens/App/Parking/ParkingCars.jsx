import React from 'react';
import { View, Image } from 'react-native';
import Car from '../../../assets/img/car.png';

const ParkingCars = ({ occupiedSpots, spotsNumbers }) => {
  return (
    <>
      {occupiedSpots?.map((spotIndex) => (
        <View
          key={spotIndex}
          style={{
            position: 'absolute',
            top: spotsNumbers[spotIndex].top-23,
            left: spotsNumbers[spotIndex].left-10,
          }}
        >
          <Image
            className="rotate-90 w-9 h-20"
            source={Car}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        </View>
      ))}
    </>
  );
};

export default ParkingCars;