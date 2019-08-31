import React from "react";
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import AuthScreen from "./screens/AuthScreen";

const AuthStack = createStackNavigator(
    {
        Auth: AuthScreen,
    }
);

const AppStack = createStackNavigator(
    {
        Home: HomeScreen,
        Details: DetailsScreen,
    }
);

export default createAppContainer(createSwitchNavigator(
    {
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'Auth',
    }
));