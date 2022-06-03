import { View, Text, TextInput, Button, ActivityIndicator } from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isLoading } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login Screen</Text>
      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        placeholderTextColor="gray"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
      ></TextInput>
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        placeholderTextColor="gray"
        autoCapitalize="none"
        secureTextEntry={true}
      ></TextInput>
      <Button onPress={() => login(email, password)} title="Login"></Button>
      <Button
        onPress={() => navigation.navigate("RegisterScreen")}
        title="Go to Register Screen"
      ></Button>
      {error && <Text style={{ color: "red", marginTop: 8 }}>{error}</Text>}
      {isLoading && (
        <ActivityIndicator size="small" color="gray" style={{ marginTop: 8 }} />
      )}
    </View>
  );
}
