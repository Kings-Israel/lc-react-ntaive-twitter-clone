import { View, Text, Button } from 'react-native'
import React from 'react'

export default function RegisterScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>This is the register screen</Text>
      <Button onPress={() => navigation.navigate('LoginScreen')} title="Go to Login Screen"></Button>
    </View>
  )
}