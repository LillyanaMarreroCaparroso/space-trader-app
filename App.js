import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import Screens from "./components/Screens";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Ships from "./components/Ships";
import Loans from "./components/Loans";
import Logout from "./components/Logout";

import * as SecureStorage from "expo-secure-store";

export default function App() {

  const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState(false);
  const [userIsLogged, setUserIsLogged] = useState(false);
  
  const TOKEN = "spaceTradersToken";  

  const getStoragedTokenValue = async () => {
    let result = await SecureStorage.getItemAsync(TOKEN);
    if (result) {
      return result;
    } else {
      return null;
    }
  };

  const saveToken = async (value, action) => {
    await SecureStorage.setItemAsync(STORED_TOKEN_KEY, value);
    setUserIsLogged(action);
    // get user data
    await fetch(`https://api.spacetraders.io/my/account?token=${value}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUserData(data.user);
        }
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    const retrieveStoredToken = async () => {
      let tokenValue = await getStoragedTokenValue();
      setUserToken(tokenValue);
      await fetch(`https://api.spacetraders.io/my/account?token=${tokenValue}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUserData(data.user);
            setUserIsLogged(true);
          }
        });
    };
    retrieveStoredToken();
  }, []);

  const Drawer = createDrawerNavigator();
  return (
    <>
      {userIsLogged ? (
        <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home">
            {() => <Home userData={userData} />}
          </Drawer.Screen>
          <Drawer.Screen name="Loans">
            {() => <Loans userData={userData} />}
          </Drawer.Screen>
          <Drawer.Screen name="Ships">
            {() => <Ships userData={userData} />}
          </Drawer.Screen>
          <Drawer.Screen name="Logout">
            {() => <Logout saveToken={saveToken} />}
          </Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Screens" component={Screens} />
            <Drawer.Screen name="Register">
              {() => <Register saveToken={saveToken} />}
            </Drawer.Screen>
            <Drawer.Screen name="Login">
              {() => <Login saveToken={saveToken} />}
            </Drawer.Screen>
          </Drawer.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
