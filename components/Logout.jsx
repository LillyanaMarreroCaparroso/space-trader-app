import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { useEffect } from "react";

const Logout = ({ saveToken }) => {
  useEffect(() => {
    saveToken("", false);
  }, []);

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Logout;
