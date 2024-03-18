import { View, Text, StatusBar } from "react-native";
import React from "react";
import Parking from "./Parking/Parking";
import BtnExit from "./BtnExit";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function Directions() {
  const navigation = useNavigation();
  return (
    <View className="flex flex-col items-center justify-between h-screen bg-primaryColor">
      <StatusBar backgroundColor="#21325E" />
      <BtnExit />
      <View className="space-x-2 flex-row bg-focusColor rounded-2xl w-[75%] h-12 justify-center items-center">
        <Text className="text-white font-semibold text-lg">
          Lugar reservado exitosamente
        </Text>
      </View>
      <View className="w-full h-1/2">
        <Parking />
      </View>
      <View className=" bg-secondaryColor w-full h-[22%] flex justify-center items-center rounded-t-3xl space-y-2">
        <Text className="text-white text-sm px-6 text-center">
          Sigue las indicaciones del mapa para encontrar tu lugar.
        </Text>
      </View>
    </View>
  );
}
