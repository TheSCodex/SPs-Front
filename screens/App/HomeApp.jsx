import { View, Text, StatusBar, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import BtnExit from "./BtnExit";
import Parking from "./Parking/Parking";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "@env";
import { decode } from "base-64";
import { jwtDecode } from "jwt-decode";
import ParkingDirections from "./Parking/ParkingDirections";

export default function HomeApp() {
  global.atob = decode;
  const navigation = useNavigation();
  const [availableSpots, setAvailableSpots] = useState(null)
  const [availableSpotsLength, setAvailableSpotsLength] = useState(0);
  const [hasReservation, setHasReservation] = useState(false);
  const [noAvailableSpots, setNoAvailableSpots] = useState(false);
  const [reservationID, setReservationID] = useState(null);
  const [userId, setUserId] = useState(null);
  const [cancelClicked, setCancelClicked] = useState(false);
  const [occupiedSpots, setOccupiedSpots] = useState([])
  const [checkedIn, setCheckedIn] = useState(null);
  const [reservationData, setReservationData] = useState([])
  const [initialFee, setInitialFee] = useState(null);
  const [totalFee, setTotalFee] = useState(null);

  const route = useRoute();
  const [isOccupied, setIsOccupied] = useState(false)

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
    // const mapping = {
    //   1: 1,
    //   2: 3,
    //   3: 5,
    //   4: 7,
    //   5: 9
    // };
  
    const occupiedSpotsIds = parkingData
      .filter(spot => spot.statusId === 3)
      .map(spot =>spot.id);
  
    return occupiedSpotsIds;
  };

  const mapAvailableSpotsIds = (parkingData) => {
    // const mapping = {
    //   1: 1,
    //   2: 3,
    //   3: 5,
    //   4: 7,
    //   5: 9
    // };

    const availableSpotsIds = parkingData
      .filter(spot => spot.statusId === 1 || spot.statusId == 4)
      .map(spot => spot.id)
      .filter(id => id !== undefined); 



    return availableSpotsIds 
  }  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL + "/status/parkingSpots");
        if (!response.ok) {
            Alert.alert(
              'Error de conexión',
              'Hubo un error recuperando los datos. Por favor, verifica tu conexión a internet.',
              [
                  {
                      text: 'Aceptar',
                  },
                ],
          )
          throw new Error("Error en la solicitud de estacionamiento");
        }
        const parkingData = await response.json();
        const filteredSpots = parkingData.filter(
          (spot) => spot.statusId === 1 || spot.statusId === 4
        );
        setAvailableSpotsLength(filteredSpots.length);

        if (parkingData.filter(spot => spot.statusId === 5)) {
          setIsOccupied(false)
        }
        
        const spotsOccupied = mapOccupiedSpotsIds(parkingData);
        const availableIds = mapAvailableSpotsIds(parkingData);
        setAvailableSpots(availableIds);
        if (availableSpots && availableSpots.length === 0){
          setNoAvailableSpots(true)
        } else {
          setNoAvailableSpots(false)
        }
        setOccupiedSpots(spotsOccupied);
      } catch (error) {
        console.error("Error fetching parking status in HomeApp:", error);
      }
    };
  // 
    fetchData();
  }, [occupiedSpots]); 
  
  

  const handleReservePress = () => {
    navigation.navigate("Reservar");
  };


  useEffect(() => {
    let isMounted = true;

    const handleReservationData = (data) => {
        if (data.length > 0) {
            const reservation = data[0];
            if (reservation.status === "Active") {
                setNoAvailableSpots(false);
                setHasReservation(true);
                setReservationID(reservation.id);
                setInitialFee(reservation.initialFee);
                if (occupiedSpots.includes(reservation.spotId) && isOccupied === false && reservationID !== null) {
                    navigation.navigate("Ocupado", { id: reservationID });
                    setIsOccupied(true);
                }
            } else if (reservation.status === 'Checked-In' && isOccupied === false  ) {
                setIsOccupied(false)
                setReservationID(reservation.id);
                setInitialFee(reservation.initialFee);
                setHasReservation(false);
                setCheckedIn(true);
                if (availableSpots && availableSpots.includes(reservation.spotId) && isOccupied === false){
                  navigation.navigate("Check-Out", { id: reservationID, initialFee: initialFee });
                  setIsOccupied(true);
                }
            } else if (reservation.status === 'Completed') {
                if (isMounted) {
                    setHasReservation(false);
                    setCheckedIn(false);
                    setTotalFee(reservation.totalFee);
                    console.log("El total fee es", totalFee);
                    deleteReservation(reservation.id);
                }
            } else {
                setHasReservation(false);
                setIsOccupied(false);
            }
        } else {
            setCheckedIn(false)
            setHasReservation(false);
        }
    };

    const getReservation = async () => {
        try {
            const response = await fetch(`${URL}/reservations/user/${userId}`);
            if (!response.ok) {
              Alert.alert(
                'Error de conexión',
                'Hubo un error recuperando los datos. Por favor, verifica tu conexión a internet.',
                [
                    {
                        text: 'Aceptar',
                    },
                  ],
            )
                throw new Error("Error en la solicitud de reservaciones");
            }
            const data = await response.json();
            handleReservationData(data);
        } catch (error) {
            console.error(
                `Error al obtener las reservaciones del usuario con ID ${userId}:`,
                error
            );
        }
    };

    getReservation();

    return () => {
        isMounted = false;
    };
}, [userId, occupiedSpots]);


const deleteReservation = async (reservationId) => {
  try {
      const response = await fetch(`${URL}/reservations/${reservationId}`, {
          method: 'DELETE'
      });
      if (!response.ok) {
          throw new Error("Error al eliminar la reserva");
      }
      console.log("Se eliminó la reserva")
      setCheckedIn(false);
      setIsOccupied(false);
  } catch (error) {
      console.error("Error al eliminar la reserva:", error);
  }
};


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
          setIsOccupied(false)
          console.log("Is occupied", isOccupied)
          console.log("Reserva cancelada exitosamente.");
        } catch (error) {
          console.error(`Hubo un error al cancelar la reservación ${error}`);
        } finally {
          console.log("Is occupied", isOccupied)
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
            <Text className="text-white font-bold text-lg">{availableSpotsLength} </Text>
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
          <TouchableOpacity onPress={() => navigation.navigate("Check-Out", {id: reservationID, initialFee: initialFee})} className="border border-focusColor bg-primaryColor rounded">
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
