import { NavigationContainer, DefaultTheme,
    DarkTheme,
    useNavigation, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
import { useColorScheme } from 'react-native';
import { HomeScreen } from './src/screens/home/HomeScreen';
import { LoginScreen } from './src/screens/login/LoginScreen';
import { CustomDarkTheme, CustomLightTheme } from './src/themes';

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    const theme = useColorScheme();
    
    return <NavigationContainer theme={theme === "dark" ? CustomDarkTheme : CustomLightTheme}>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    </NavigationContainer>;
};

export default App;
