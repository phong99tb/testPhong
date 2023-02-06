import * as React from 'react';
import {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StackHome from './src/screen/setting/StackHome';
import 'expo-dev-client';
import { NativeBaseProvider } from 'native-base';
import { useNetInfo } from '@react-native-community/netinfo';
import { Text, View, Image } from 'react-native';
import { Provider, useDispatch } from "react-redux";
import store from "./src/redux/store";
import DisconnectWifi from './src/component/DisconnectWifi';
import { disconnect } from './src/redux/actions';

const Stack = createNativeStackNavigator();

function App() {
	return (
		<Provider store={store}>
			<NativeBaseProvider>
				<NavigationContainer>
					<StackHome />
				</NavigationContainer>
			</NativeBaseProvider>
		</Provider>
	);
}

export default App;