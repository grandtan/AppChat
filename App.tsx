// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Quiz from "./src/components/Quiz";
import Leaderboard from "./src/components/Leaderboard";

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Quiz">
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="Leaderboard" component={Leaderboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
