import React, { useState } from "react";
import {
  View,
  Button,
  TextInput,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";

const Login = ({ saveToken }) => {
  const [user, setUser] = useState("");
  const [wrongUser, setWrongUser] = useState(false);

  const handleLogin = () => {
    console.log(user);
    fetch(`https://api.spacetraders.io/my/account?token=${user}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setWrongUser(true);
          setTimeout(() => {
            setWrongUser(false);
          }, 3000);
        } else {
          saveToken(user, true);
          setUser(data.user);
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.text}>Welcome to SpaceTraders!</Text>
        <TextInput
          style={
            wrongUser ? [styles.input, { borderColor: "red" }] : styles.input
          }
          placeholder="Enter your token"
          placeholderTextColor="black"
          onChangeText={(text) => setUser(text)}
        ></TextInput>
        {wrongUser && (
          <Text style={styles.errorText}>
            Error, please try again.
          </Text>
        )}
        <Button title="Login" onPress={handleLogin}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainer: {
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  input: {
    height: 40,
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    marginBottom: 20,
    borderRadius: 10,
    color: "black",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default Login;
