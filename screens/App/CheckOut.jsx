import React, { useState, useEffect } from "react";
import HomeApp from './HomeApp'
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import {URL} from "@env";
import { useRoute, useNavigation } from '@react-navigation/native';

const CheckOut = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const reservationID = route.params?.id;

    const handleCheckOut = async () => {
        console.log(URL);
        console.log(reservationID)
        const currentDate = new Date().toISOString();
        const formattedDate = currentDate.slice(0, -1);
        try {
            const response = await fetch(URL + "/reservations/check-out/" + reservationID, {
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
        console.log("Se hizo el check out")
        } catch (error){
            console.log("Error en la solicitud de check-in", error)
        } finally {
            navigation.navigate("HomeApp")
        }
    }

    return (
    <View class="relative">
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50" />
        
        <View className="bg-black opacity-40 z-1">
            <HomeApp/>
        </View>
        
        <View className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <View className="flex justify-center items-center rounded-lg bg-blue-950 p-4 space-y-4 w-60">
            <Text className="text-yellow-300 text-xl ">¿Ya te vas?</Text>
            <Text className="text-white w-52 text-center font-light">Hemos detectado que tu lugar ha sido desocupado. Por favor, haz Check-Out.</Text>
            <View className="flex flex-row justify-center space-x-6">
            <TouchableOpacity onPress={handleCheckOut} className="p-2 bg-yellow-300 rounded-md">
                <Text className="text-white text-sm">Hacer Check-Out</Text>
            </TouchableOpacity>
        </View>
        </View>
        </View>
    </View>
  )
}

export default CheckOut