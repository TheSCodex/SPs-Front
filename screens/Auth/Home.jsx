import { View, Text, Image } from 'react-native'
import React from 'react'
import home from "../../assets/img/Home.png"
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation()
  return (
    <View className="w-full h-screen bg-primaryColor">
      <View className="pt-24 ml-12">
        <Text className="text-focusColor font-bold tracking-widest text-5xl">HOLA!</Text>
        <Text className="text-contrastColor ">Bienvenido a SPS</Text>
      </View>
      <View>
        <Image source={home}/>
      </View>
      <View className="w-full h-screen items-center mt-12 space-y-6">
        <TouchableOpacity 
        onPress={()=> navigation.navigate("Login")}
        className="border-focusColor border-[1px] rounded-sm bg-primaryColor p-2 w-36">
          <Text className="text-contrastColor uppercase text-center font-bold">Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=> navigation.navigate("Registrarse")}
        className="border-focusColor border-[1px] rounded-sm bg-primaryColor p-2 w-36">
          <Text className="text-contrastColor uppercase text-center font-bold">Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}