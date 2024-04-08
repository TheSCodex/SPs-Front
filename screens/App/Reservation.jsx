import { View, Text, StatusBar } from "react-native";
import React, {useState, useEffect} from "react";
import Parking from "./Parking/Parking";
import BtnExit from "./BtnExit";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from 'base-64';
import { jwtDecode } from "jwt-decode"; 

export default function Reservation() {
  global.atob = decode;
  const navigation = useNavigation()
  const [userId, setUserId] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    const getTokenAndDecode = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const cleanedToken = token.trim()
        console.log('Token:', cleanedToken);
        if(cleanedToken) {
          const parts = cleanedToken.split('.');
          const joinedParts = parts.join('.')
          console.log(joinedParts)
          const decodedToken = jwtDecode(joinedParts);
          console.log('Token decodificado:', decodedToken);
          if(decodedToken.userId && decodedToken.userId !== undefined) { 
            console.log('Decoded token', decodedToken);
            setUserId(decodedToken.userId);
          } else {
            console.log("UserID doesn't exist.")
          }
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    getTokenAndDecode(); 
  }, []); 

  useEffect(() => {
    const fetchAvailableParkingSpot = async () => {
      try {
        const response = await fetch(URL + '/status/availableParkingSpots');
        if (!response.ok) {
          throw new Error('Error en la solicitud de estacionamiento');
        }
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        const spot = data[randomIndex];
        setSelectedSpot(spot);
        if (!selectedSpot){
          isLoading(true);
        } else {
          isLoading(false)
        }
      } catch (error) {
        console.error("Error al obtener lugares de estacionamiento disponibles:", error);
      }
    };

    fetchAvailableParkingSpot(); 
  }, []); 

  const handleConfirmReservation = async () => {

    const currentDate = new Date().toISOString();
    const formattedDate = currentDate.slice(0, -1);

    if (!selectedSpot || !userId){
      console.log("No existe o el userId o el SelectedSpot")
      console.log("Selected spot:", selectedSpot)
      console.log("UserId", userId);
      return
    };

    try {
      const response = await fetch(URL + '/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          spotId: selectedSpot.id,
          reservationTime: formattedDate,
          initialFee: 22
        })
      });

      if (!response.ok) {
        throw new Error('Error al crear la reserva', response);
      }

      const responseData = await response.json();
      console.log("Reserva creada con ID:", responseData.reservationId);
      navigation.navigate("Direcciones", {userId: userId});
    } catch (error) {
      console.error("Error al crear la reserva:", error);
    }
  };

  useEffect(() => {
    if (userId !== null && selectedSpot !== null) {
      isLoading(false);
      console.log("User ID:", userId);
      console.log("Selected Spot:", selectedSpot);
    }
  }, [userId, selectedSpot]);

  return (
    <View className="flex flex-col items-center justify-between h-screen bg-primaryColor">
      <StatusBar backgroundColor="#21325E" />
      <BtnExit />
      <View className="space-x-2 flex-row bg-focusColor rounded-2xl w-[75%] h-12 justify-center items-center">
        <Text className="text-white font-semibold text-lg">
          Costo de la reservación
        </Text>
        <Text className="text-white font-bold text-lg">$22</Text>
      </View>
      <View className='w-full h-1/2'>
        <Parking />
      </View>
      <View className=" bg-secondaryColor w-full h-[22%] flex justify-center items-center rounded-t-3xl space-y-2">
        <TouchableOpacity onPress={handleConfirmReservation} className="border border-focusColor bg-primaryColor rounded">
          <Text className="text-white font-bold text-center px-20 py-4 text-base">
            Confirmar reservación
          </Text>
        </TouchableOpacity>
        {loading ? 
          <Text className="text-white text-xs px-6 text-center">
          Cargando...
          </Text>
        : 
        <Text className="text-white text-xs px-6 text-center">
        Su lugar asignado es el lugar: {selectedSpot && selectedSpot.spotCode}.
        </Text>}          
        <Text className="text-white text-xs px-6 text-center">
        </Text>
      </View>
    </View>
  );
}
