import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BtnExit = () => {
    const navigation = useNavigation()

  return (
    <View>
      <TouchableOpacity onPress={()=>navigation.navigate("Inicio")} className='mt-6'>
        <Ionicons name="exit-outline" size={30} color="#F1D00A" />
      </TouchableOpacity>
    </View>
  );
};

export default BtnExit;
