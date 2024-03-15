import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";

const BtnExit = () => {
  return (
    <View>
      <TouchableOpacity className='mt-6'>
        <Ionicons name="exit-outline" size={30} color="#F1D00A" />
      </TouchableOpacity>
    </View>
  );
};

export default BtnExit;
