import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Screens = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Button style={styles.button} title="Login" onPress={() => navigation.navigate("Login")}></Button>
            <View style={styles.buttonSeparator}></View>
            <Button title="Register" onPress={() => navigation.navigate("Register")}></Button>
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

    buttonSeparator: {
        marginBottom: 10,
    },
});

export default Screens;
