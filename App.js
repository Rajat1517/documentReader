import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import PageScreen from "./src/screens/PageScreen";
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer initialRouteName="Home">
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Reader" component={PageScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
