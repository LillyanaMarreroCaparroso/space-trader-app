import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const Ships = ({ userData }) => {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    const fetchShips = async () => {
      const response = await fetch(
        `https://api.spacetraders.io/my/ships?token=${userData.token}`
      );
      const data = await response.json();
      setShips(data.ships);
    };
    fetchShips();
  }, [userData]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ships</Text>
      {!ships || ships.length === 0 ? <Text>No ships available</Text> : null}
      {ships?.map((ship) => (
        <View key={ship.id} style={styles.ship}>
            <Text style={styles.shipName}>{ship.type}</Text>
            <Text style={styles.shipLocation}>
            Location: {ship.location}
            </Text>
            <Text style={styles.shipStatus}>
            Status: {ship.flightPlanId ? "In flight" : "Docked"}
        </Text>
    </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  ship: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: "80%",
  },
  shipName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  shipLocation: {
    fontSize: 16,
    marginBottom: 5,
  },
  shipStatus: {
    fontSize: 16,
  },
});

export default Ships;
