import { View, Text, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import logo from "../../assets/img/Logo.png";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { URL } from '@env';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const [error, setError] = useState(""); // Estado para controlar errores de validación

  const handleRegister = async () => {
    // Validación de campos vacíos
    if (!name || !email || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    try {
      const response = await fetch(URL + "/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: name,
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al registrar el usuario");
      }

      Alert.alert("Registro exitoso", "¡Cuenta creada correctamente!");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error de API:", error);
      Alert.alert("Error", "Ocurrió un error al intentar registrarse");
    }
  };

  return (
    <View className="w-full h-screen bg-primaryColor items-center">
      <View className="w-full flex flex-col items-center space-y-4 mt-24">
        <Text className="text-contrastColor text-center font-bold tracking-tight text-2xl uppercase">Bienvenido</Text>
        <Image source={logo} />
      </View>
      <Text className="text-focusColor font-bold tracking-tight text-2xl uppercase mt-24">Regístrate</Text>
      <View className="w-full flex flex-col items-center space-y-12 mt-8">
        <View className="flex items-start ">
          <Text className="text-contrastColor font-thin">Nombre completo</Text>
          <TextInput
            className="text-contrastColor border-b-[1px] border-focusColor w-[250px]"
            value={name}
            onChangeText={(text) => setName(text)}>
          </TextInput>
        </View>
        <View className="flex items-start ">
          <Text className="text-contrastColor font-thin">Email</Text>
          <TextInput
            className="text-contrastColor border-b-[1px] border-focusColor w-[250px]"
            value={email}
            onChangeText={(text) => setEmail(text)}>
          </TextInput>
        </View>
        <View className="flex items-start ">
          <Text className="text-contrastColor font-thin">Contraseña</Text>
          <TextInput
            className="text-contrastColor border-b-[1px] border-focusColor w-[250px]"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}>
          </TextInput>
        </View>
        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      </View>
      <TouchableOpacity
        className="mt-9 border-focusColor border-[1px] rounded-sm bg-primaryColor p-2 w-36"
        onPress={handleRegister}>
        <Text className="text-contrastColor text-center uppercase font-semibold">Regístrate</Text>
      </TouchableOpacity>
      <View className="bg-secondaryColor w-full rounded-md flex justify-center mt-11 h-14">
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="text-center text-contrastColor">Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
