import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { retrieveData, storeData } from "../localstorage/localstorage";
import CustomHeader from "../components/CustomHeader";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      storeData("uid", auth.currentUser.uid);
      console.log("uid", auth.currentUser.uid);
      setEmail("");
      setPassword("");
      navigation.goBack();
    } catch (error) {
      setError(error.message);
    }
  };

  const renderLoginContainer = () => (
    <>
      <CustomHeader signout={false} />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/dp.png")} style={styles.logo} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
            <Text style={styles.signupText}>
              Don't have an account? Sign up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView>
      <FlatList
        data={[{ key: "loginContainer" }]}
        renderItem={renderLoginContainer}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        ListFooterComponent={<View style={styles.bottomSpace} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  bottomSpace: {
    height: 60,
  },
  logoContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#39C61C26",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "70%",
    borderBottomWidth: 1,
    borderColor: "black",
    color: "black",
    marginBottom: 10,
  },
  signupText: {
    marginTop: 70,
    marginBottom: 20,
    fontSize: 12,
    textAlign: "center",
    color: "#004AB8",
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#39C61C73",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen;
