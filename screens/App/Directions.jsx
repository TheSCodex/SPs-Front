import { View, Text, StatusBar } from "react-native";
import React from "react";
import BtnExit from "./BtnExit";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import ParkingDirections from "./Parking/ParkingDirections";

export default function Directions({ route }) {
  const { userId } = route.params;
  console.log(URL);
  console.log("El user id es:", userId)
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
        <ParkingDirections userId={userId}/>
      </View>
      <View className=" bg-secondaryColor w-full h-[22%] flex justify-center items-center rounded-t-3xl space-y-2">
        <Text className="text-white text-sm px-6 text-center">
          Sigue las indicaciones del mapa para encontrar tu lugar.
        </Text>
      </View>
    </View>
  );
}
