import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isLoading } = useContext(AuthContext);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={{ marginTop: 130, width: 260 }}>
          <View style={{ alignItems: "center" }}>
            <Image
              style={styles.logo}
              source={require("../../assets/larydefault.png")}
            ></Image>
          </View>
          <View style={{ marginTop: 40 }}>
            {error && (
              <Text style={{ color: "red", marginTop: 8 }}>{error}</Text>
            )}
            <TextInput
              style={[styles.inputBox, styles.mt4]}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
              placeholderTextColor="gray"
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
            ></TextInput>
            <TextInput
              style={[styles.inputBox, styles.mt4]}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              placeholderTextColor="gray"
              autoCapitalize="none"
              secureTextEntry={true}
            ></TextInput>
          </View>
          <TouchableOpacity
            onPress={() => login(email, password)}
            style={[styles.loginButton, styles.mt5]}
          >
            {isLoading && (
              <ActivityIndicator
                size="small"
                color="white"
                style={{ marginRight: 18 }}
              />
            )}
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 12,
            }}
          >
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              <Text style={styles.registerTextLink}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d9bf1",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 120,
  },
  inputBox: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
  },
  loginButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0084b3",
    padding: 12,
    borderRadius: 5,
  },
  loginButtonText: {
    color: "white",
  },
  registerText: {
    fontSize: 12,
  },
  registerTextLink: {
    fontSize: 12,
    color: "white",
    textDecorationLine: "underline",
  },
  mt4: {
    marginTop: 16,
  },
  mt5: {
    marginTop: 22,
  },
});
