import { View, Text, Image, TextInput } from "react-native";
import React, { useState } from "react";
import logo from "../../assets/img/Logo.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("AppStack");
  };

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
          <TextInput className="text-contrastColor border-b-[1px] border-focusColor w-[250px]"></TextInput>
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
