import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Tabs from "./components/Tabs";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import Postform from "./screens/postscreen";
import MapScreen from "./screens/MapScreen";
import PostDetails from "./screens/PostDetails";
import { PostsProvider } from "./context/PostsProvider";
import EditProfile from "./screens/EditProfile";

const Stack = createStackNavigator();
const screenOptions = {
  headerShown: false,
};
export const SignedInStack = () => (
  <PostsProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabs" screenOptions={screenOptions}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="postDetails" component={PostDetails} />
        <Stack.Screen name="postpage" component={Postform} />
        <Stack.Screen name="mapScreen" component={MapScreen} />
        <Stack.Screen name="editProfile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  </PostsProvider>
);
export const SignedOutStack = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  </NavigationContainer>
);
