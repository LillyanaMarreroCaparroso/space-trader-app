import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";

const Home = ({ userData }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Username:</Text>
        <Text>{userData.username}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Credits:</Text>
        <Text>{userData.credits}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Ships:</Text>
        <Text>{userData.shipCount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Structures:</Text>
        <Text>{userData.structureCount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Joined:</Text>
        <Text>{userData.joinedAt.substring(0, 10)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  label: {
    fontWeight: "bold",
    marginRight: 10,
    minWidth: 100,
  },
});

export default Home;
