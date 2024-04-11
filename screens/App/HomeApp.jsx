import { View, Text, StatusBar, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import BtnExit from "./BtnExit";
import Parking from "./Parking/Parking";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "@env";
import { decode } from "base-64";
import { jwtDecode } from "jwt-decode";
import ParkingDirections from "./Parking/ParkingDirections";

export default function HomeApp() {
  global.atob = decode;
  const navigation = useNavigation();
  const [availableSpots, setAvailableSpots] = useState(0);
  const [hasReservation, setHasReservation] = useState(false);
  const [noAvailableSpots, setNoAvailableSpots] = useState(false);
  const [reservationID, setReservationID] = useState(null);
  const [userId, setUserId] = useState(null);
  const [triggerRender, setTriggerRender] = useState(false);
  const [cancelClicked, setCancelClicked] = useState(false);
  const [occupiedSpots, setOccupiedSpots] = useState([])
  const [verifySpot, setVerifySpot] = useState(false);
  const [checkedIn, setCheckedIn] = useState(null);


  useEffect(() => {
    console.log(URL);
    const getTokenAndDecode = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const cleanedToken = token.trim();
        if (cleanedToken) {
          const parts = cleanedToken.split(".");
          const joinedParts = parts.join(".");
          const decodedToken = jwtDecode(joinedParts);
          if (decodedToken.userId && decodedToken.userId !== undefined) {
            setUserId(decodedToken.userId);
          } else {
            console.log("UserID doesn't exist.");
          }
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    getTokenAndDecode();
  }, []);

  const mapOccupiedSpotsIds = (parkingData) => {
    const mapping = {
      1: 1,
      2: 3,
      3: 5,
      4: 7,
      5: 9
    };
  
    const occupiedSpotsIds = parkingData
      .filter(spot => spot.statusId === 3)
      .map(spot => mapping[spot.id]);
  
    return occupiedSpotsIds;
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL + "/status/parkingSpots");
        if (!response.ok) {
          throw new Error("Error en la solicitud de estacionamiento");
        }
        const parkingData = await response.json();
        if (parkingData) {
          setTriggerRender((prevState) => !prevState);
        }
        const filteredSpots = parkingData.filter(
          (spot) => spot.statusId === 1 || spot.statusId === 4
        );
  
        const availableSpotsCount = filteredSpots.length;
        setAvailableSpots(availableSpotsCount);
  
        const spotsOccupied = mapOccupiedSpotsIds(parkingData);
        setOccupiedSpots(spotsOccupied);
      } catch (error) {
        console.error("Error fetching parking status in HomeApp:", error);
      }
    };
  
    fetchData();
  }, [triggerRender]);
  

  const handleReservePress = () => {
    navigation.navigate("Reservar");
  };


  useEffect(() => {
    const getReservation = async () => {
      try {
        const response = await fetch(`${URL}/reservations/user/${userId}`);
        if (!response.ok) {
          throw new Error("Error en la solicitud de reservaciones");
        }
        const data = await response.json();

        if (data.length > 0 && data[0].status === "Active") {
          setNoAvailableSpots(false);
          setHasReservation(true);
          setReservationID(data[0].id);
          if (occupiedSpots.includes(data[0].spotId)) {
            navigation.navigate("Ocupado", {id: reservationID});
          }  
        } else if (data.length > 0 && data[0].status === 'Checked-In') {
          setReservationID(data[0].id);
          setHasReservation(false)
          setCheckedIn(true)
          setTriggerRender((prevState) => !prevState);
        } else if (data.length > 0 && data[0].status == 'Completed') {
          setHasReservation(false)
          setCheckedIn(false)
        } else {
          setHasReservation(false);
        }
      } catch (error) {
        console.error(
          `Error al obtener las reservaciones del usuario con ID ${userId}:`,
          error
        );
      }
    };

    getReservation();
  }, [userId, triggerRender]);

  useEffect(() => {
    if (cancelClicked && reservationID !== null) {
      const cancelReservation = async () => {
        try {
          const response = await fetch(`${URL}/reservations/cancel/${reservationID}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          if (!response.ok) {
            throw new Error("Error al cancelar la reserva");
          }
          setTriggerRender((prevState) => !prevState);
          console.log("Reserva cancelada exitosamente.");
        } catch (error) {
          console.error(`Hubo un error al cancelar la reservación ${error}`);
        }
      };
  
      cancelReservation();
      setCancelClicked(false);
    }
  }, [cancelClicked, reservationID]);
  
  const handleCancelClick = () => {
    setCancelClicked(true);
  };
  

  return (
    <View className="flex flex-col items-center justify-between h-screen bg-primaryColor">
      <StatusBar backgroundColor="#21325E" />
      <BtnExit />
      <View className="space-x-2 flex-row bg-focusColor rounded-2xl w-[75%] h-12 justify-center items-center">
        {hasReservation ? (
          <View>
            <Text className="text-white font-bold text-lg">
              ¡Lugar reservado exitosamente!
            </Text>
          </View>
        ) : checkedIn ? (
          <View>
            <Text className="text-white font-bold text-lg">
              ¡Has hecho Check In!
            </Text>
          </View>
        ) : (
          <Text>
            <Text className="text-white font-bold text-lg">{availableSpots} </Text>
            <Text className="text-white font-semibold text-lg">Lugares disponibles</Text>
          </Text>
        )}
      </View>
      {hasReservation ? (
        <View className="w-full h-1/2">
          <ParkingDirections userId={userId} />
        </View>
      ) : (
        <View className="w-full h-1/2">
          <Parking />
        </View>
      )}

      {noAvailableSpots ? (
        <View className=" bg-secondaryColor w-full h-[22%] flex justify-center items-center rounded-t-3xl space-y-2">
          <Text className="text-white text-md px-6 text-center">No hay lugares de estacionamiento disponibles.</Text>
          <Text className="text-white text-md px-6 text-center">Por favor, vuelve a intentarlo más tarde.</Text>
        </View>
      ) : hasReservation ? (
        <View className=" bg-secondaryColor w-full h-[22%] flex justify-center items-center rounded-t-3xl space-y-2">
          <Text className="text-white text-md px-6 text-center">Sigue las instrucciones para encontrar tu lugar.</Text>
          <TouchableOpacity onPress={handleCancelClick} className="border border-focusColor bg-primaryColor rounded">
            <Text className="text-white font-bold text-center px-20 py-4 text-base">Cancelar reservación</Text>
          </TouchableOpacity>
        </View>
      ) : checkedIn ? (
        <View className=" bg-secondaryColor w-full h-[22%] flex justify-center items-center rounded-t-3xl space-y-2">
          <TouchableOpacity onPress={() => navigation.navigate("Check-Out", {id: reservationID})} className="border border-focusColor bg-primaryColor rounded">
            <Text className="text-white font-bold text-center px-20 py-4 text-base">Hacer Check-Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className=" bg-secondaryColor w-full h-[22%] flex justify-center items-center rounded-t-3xl space-y-2">
          <TouchableOpacity onPress={handleReservePress} className="border border-focusColor bg-primaryColor rounded">
            <Text className="text-white font-bold text-center px-20 py-4 text-base">Reservar lugar</Text>
          </TouchableOpacity>
          <Text className="text-white text-xs px-6 text-center">Se te asignará un lugar según la demanda de estacionamiento.</Text>
        </View>
      )}
    </View>
  );
}
