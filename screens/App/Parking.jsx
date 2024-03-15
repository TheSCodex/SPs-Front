import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import img from "../../img/car.png";

const Parking = () => {
  return (
    <View className="flex-row w-full justify-around">
      <View className="space-y-3">
        {Array.from({ length: 5 }, (_, i) => (
          <TouchableOpacity key={i} style={styles.container} className="flex items-center justify-center">
            {/* <Image source={img} className="w-10 h-20 -rotate-90" /> */}
            <Text className='text-white'>{i}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="space-y-3 rotate-180">
        {Array.from({ length: 5 }, (_, i) => (
          <TouchableOpacity key={i + 5} style={styles.container} className='flex items-center justify-center'>
            <Image source={img} className="w-10 h-20 -rotate-90" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 5,
    borderLeftColor: "yellow",
    borderTopWidth: 5,
    borderTopColor: "yellow",
    borderBottomWidth: 5,
    borderBottomColor: "yellow",
    width: 110,
    height: 80,
  },
});

export default Parking;
