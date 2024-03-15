import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import Parking from './Parking'

export default function HomeApp() {
  return (
    <View className='flex flex-col items-center justify-center h-screen bg-primaryColor'>
      <StatusBar backgroundColor='#21325E'/>
      <Parking/>
    </View>
  )
}