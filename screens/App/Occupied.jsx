import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from "react";
import HomeApp from './HomeApp'
import Eyes from '../assets/eyes.png'
import {URL} from "@env";
import { useRoute, useNavigation } from '@react-navigation/native';

export default function Occupied() {
  const navigation = useNavigation();

  const route = useRoute();
  const reservationID = route.params?.id;
  const [notMe, setNotMe] = useState(false)
  const [checkedIn, setCheckedIn] = useState(false)

  const handleItsMeButton = async () => {
    console.log(URL);
    console.log("Hola")
    const currentDate = new Date().toISOString();
    const formattedDate = currentDate.slice(0, -1);

    try {
      const response = await fetch(URL + "/reservations/check-in/" + reservationID, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: reservationID,
          checkInTime: formattedDate,
        })
      });
      if (!response.ok){
        throw new Error("Error de api");
      }
      console.log("Se hizo el checkin")
    } catch (error){
      console.log("Error en la solicitud de check-in", error)
    } finally {
      Alert.alert(
        'Check In',
        'Se cobrará una cuota de $10.00MXN por cada hora de tu estancia',
        [
          {
            text: 'Aceptar',
            onPress: () => navigation.navigate("HomeApp", {checkedIn: checkedIn}),
          },
        ],
        {
          cancelable: false,
        }
      )
    }
  }

  return (
    <View className="relative">
      <View className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50" />
      
      <View className="bg-black opacity-40 z-1">
        <HomeApp/>
      </View>
      
      <View className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <View className="flex justify-center items-center rounded-lg bg-blue-950 p-4 space-y-4 w-60">
          <Text className="text-yellow-300 text-xl ">¿Eres túúúú?</Text>
          <Image source={Eyes} className="h-[20px] w-[26px]"></Image>
          <Text className="text-white w-52 text-center font-light">Hemos detectado que tu lugar reservado ha sido ocupado.</Text>
          <View className="flex flex-row justify-center space-x-6">
            <TouchableOpacity onPress={handleItsMeButton} className="p-2 bg-yellow-300 rounded-md">
              <Text className="text-white text-sm">Sí, soy yo.</Text>
            </TouchableOpacity>
            <TouchableOpacity className="p-2 border-[1px] border-yellow-300 rounded-md">
              <Text className="text-white text-sm">No, no soy yo.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
