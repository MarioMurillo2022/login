import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";

export default function Registro() {
  const [identificacion, setIdentificacion] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!email || !password || !passwordConfirm) {
      Alert.alert(
        "Error",
        "Por favor ingrese su correo electrónico, contraseña y confirmar contraseña."
      );
      return;
    }
    try {
      setLoading(true);
      const url = `${API_URL}api/registro`;
      // const response = await axios.get(url);
      await axios.post(url, {
        correo: email,
        pass: password,
        identificacion: identificacion,
      });
      Alert.alert("", "Usuario Registrado.");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", "No se registró ningún usuario.");
    } finally {
      setLoading(false);
    }
  };

  const handleIdentificacionChange = (text) => {
    const cleanedText = text.replace(/-/g, ""); // Elimina todos los guiones
    setIdentificacion(cleanedText);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shop Cut✂ | </Text>
        <Image
          source={require("../assets/CeutecLogo.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Identificación sin Guiones"
          value={identificacion}
          onChangeText={handleIdentificacionChange}
          keyboardType="default"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Contraseña"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          secureTextEntry
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Salvar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    flex: 1,
    padding: 50,
    backgroundColor: "#192a57",
    borderTopLeftRadius: 50,
    overflow: "hidden",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 3,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 50,
    height: 40,
    backgroundColor: "#0066cc",
    borderColor: "gray",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
