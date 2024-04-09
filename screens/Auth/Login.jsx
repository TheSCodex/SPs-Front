import { View, Text, Image, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import logo from "../../assets/img/Logo.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch(URL + "/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error("Error al iniciar sesion");
      }

      const responseData = await response.json();
      const token = responseData.token;

      await AsyncStorage.setItem('token', token);

      navigation.navigate("AppStack", { screen: "HomeApp" });
    } catch (error) {
      console.error("Error de API:", error);
      Alert.alert("Error", "Ocurrió un error al intentar iniciar sesión");
    }  };

  return (
    <View className="w-full h-screen bg-primaryColor items-center">
      <View className="w-full flex flex-col items-center space-y-4 mt-24">
        <Text className="text-contrastColor text-center font-bold tracking-tight text-2xl uppercase">
          Bienvenido
        </Text>
        <Image source={logo} />
      </View>
      <Text className="text-focusColor font-bold tracking-tight text-2xl uppercase mt-24">
        Iniciar sesión
      </Text>
      <View className="w-full flex flex-col items-center space-y-12 mt-8">
        <View className="flex items-start ">
          <Text className="text-contrastColor font-thin">Email</Text>
          <TextInput 
          value={email}
          onChangeText={(text) => setEmail(text)}
          className="text-contrastColor border-b-[1px] border-focusColor w-[250px]"></TextInput>
        </View>
        <View className="flex items-start ">
          <Text className="text-contrastColor font-thin">Contraseña</Text>
          <TextInput
            className="text-contrastColor border-b-[1px] border-focusColor w-[250px]"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
          ></TextInput>
        </View>
      </View>
      <TouchableOpacity onPress={handleLogin} className="mt-9 border-focusColor border-[1px] rounded-sm bg-primaryColor p-2 w-36">
        <Text className="text-contrastColor text-center uppercase font-semibold">
          Iniciar sesión
        </Text>
      </TouchableOpacity>
      <View className="bg-secondaryColor w-full rounded-md flex justify-center mt-32 h-14">
        <TouchableOpacity onPress={() => navigation.navigate("Registrarse")}>
          <Text className="text-center text-contrastColor">
            Crear una cuenta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
