import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TakePhotoScreen from './src/screen/app/TakePhotoScreen';
import SelectPhotoScreen from './src/screen/app/SelectPhotoScreen';
import HomeScreen from './src/screen/app/HomeScreen';
import StackHome from './src/screen/setting/StackHome';
import 'expo-dev-client';
import { NativeBaseProvider } from 'native-base';

const Stack = createNativeStackNavigator();

function App() {
	return (
		<NativeBaseProvider>
			<NavigationContainer>
				<StackHome />
			</NavigationContainer>
		</NativeBaseProvider>
	);
}

export default App;