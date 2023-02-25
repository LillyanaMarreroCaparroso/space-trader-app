import React, { useState } from "react";
import { View, Button, TextInput, Text, StyleSheet } from "react-native";

const Register = ({ saveToken }) => {
  const [user, setUser] = useState("");
  const [inputText, setInputText] = useState("");

  const handleRegister = () => {
    fetch(`https://api.spacetraders.io/users/${inputText}/claim`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert("Error user");
        } else {
          saveToken(data.token, true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please write your user</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setInputText(text)}
        placeholder="Enter your user"
        placeholderTextColor="black"
      ></TextInput>
      <Button title="Register" onPress={handleRegister}></Button>
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
  input: {
    width: "70%",
    height: "7%",
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    marginBottom: 10,
    borderRadius: 10,
    color: "black",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    color: "black",
    fontWeight: "bold"
  },
});

export default Register;
