import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../app/HomeScreen';
import TakePhotoScreen from '../app/TakePhotoScreen';
import SelectPhotoScreen from '../app/SelectPhotoScreen';
import RenderScreen from '../app/RenderScreen';
import SelectOutput from '../app/SelectOutput';

const Stack = createNativeStackNavigator();

const StackHome = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="TakePhoto" component={TakePhotoScreen} />
            <Stack.Screen name="SelectPhoto" component={SelectPhotoScreen} />
            <Stack.Screen name="RenderPhoto" component={RenderScreen} />
            <Stack.Screen name="SelectOutput" component={SelectOutput} />
        </Stack.Navigator>
    )
}

export default StackHome