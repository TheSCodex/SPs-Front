import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import img from "../../img/Parking.png";
import { AntDesign } from "@expo/vector-icons";

const Parking = () => {
  return (
    <View className="flex-col items-center justify-center w-full">
      {/* Icono de entrada */}
      <View className='w-[72%] h-full'>
        <Image source={img} className="w-full h-full" />
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
