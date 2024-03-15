import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import img from "../../img/car.png";
import { AntDesign } from "@expo/vector-icons";


const Parking = () => {
  return (
    <View className="flex-col items-center w-full">
      {/* Icono de entrada */}
      <AntDesign name="down" size={30} color="grey" />
      <View className="flex-row justify-around w-full">
        {/* Cajon de estacionamiento 1 */}
        <View className="space-y-3">
          {Array.from({ length: 5 }, (_, i) => (
            <TouchableOpacity
              key={i}
              style={styles.container}
              className="flex items-center justify-center"
            >
              <Image source={img} className="w-10 h-20 -rotate-90" />
              {/* <Text className='text-white'>{i+1}</Text> */}
            </TouchableOpacity>
          ))}
        </View>
        {/* Cajon de estacionamiento 2 */}
        <View className="space-y-3 rotate-180">
          {Array.from({ length: 5 }, (_, i) => (
            <TouchableOpacity
              key={i + 5}
              style={styles.container}
              className="flex items-center justify-center"
            >
              {/* <Image source={img} className="w-10 h-20 -rotate-90" /> */}
              <Text className="text-white rotate-180">{i + 6}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
    height: 75,
  },
});

export default Parking;
