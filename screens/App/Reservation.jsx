import { View, Text, StatusBar } from "react-native";
import React from "react";
import Parking from "./Parking/Parking";
import BtnExit from "./BtnExit";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function Reservation() {
  const navigation = useNavigation()
  return (
    <View className="flex flex-col items-center justify-between h-screen bg-primaryColor">
      <StatusBar backgroundColor="#21325E" />
      <BtnExit />
      <View className="space-x-2 flex-row bg-focusColor rounded-2xl w-[75%] h-12 justify-center items-center">
        <Text className="text-white font-semibold text-lg">
          Consto de la reservación
        </Text>
        <Text className="text-white font-bold text-lg">$22</Text>
      </View>
      <View className='w-full h-1/2'>
        <Parking />
      </View>
      <View className=" bg-secondaryColor w-full h-[22%] flex justify-center items-center rounded-t-3xl space-y-2">
        <TouchableOpacity className="border border-focusColor bg-primaryColor rounded">
          <Text onPress={()=> navigation.navigate("Direcciones")} className="text-white font-bold text-center px-20 py-4 text-base">
            Confirmar reservación
          </Text>
        </TouchableOpacity>
        <Text className="text-white text-xs px-6 text-center">
          Se te asignará el lugar más cercano a la entrada del estacionamiento.
        </Text>
      </View>
    </View>
  );
}
