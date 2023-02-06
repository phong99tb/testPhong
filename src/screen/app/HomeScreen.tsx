import { View, Text, Image, TouchableOpacity, LogBox } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../../asset/css'
import { StatusBar } from 'expo-status-bar'
import * as ImagePicker from 'expo-image-picker';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import {
    useFonts,
    MountainsofChristmas_400Regular,
    MountainsofChristmas_700Bold,
} from '@expo-google-fonts/mountains-of-christmas';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { disconnect, random } from '../../redux/actions';
import { useNetInfo } from '@react-native-community/netinfo';
import DisconnectWifi from '../../component/DisconnectWifi';

const HomeScreen = ({ navigation }: any) => {
    const adUnitId = "ca-app-pub-1885745425234581/8620012420";
    // const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-6635131293357908/9331385561';
    const [randomNumber,setRandomNumber]=useState("0"+ Math.floor(Math.random() * 9 + 1))
    const dispatch = useDispatch();
    const dataState: any = useSelector(state => state)

    let [fontsLoaded] = useFonts({
        MountainsofChristmas_400Regular,
        MountainsofChristmas_700Bold,
    });

    const randomPress = () => {
        console.log(Math.floor(Math.random() * 9 + 1))
        console.log("random",random)
    }


    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });
        if (!result.canceled) {
            // navigation.navigate('SelectPhoto', { result })
            navigation.navigate('RenderPhoto', { result })
        }
    }
    const takePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }
        const result = await ImagePicker.launchCameraAsync();
        if (!result.canceled) {
            // navigation.navigate('SelectPhoto',{result})
            navigation.navigate('RenderPhoto', { result })
        }
    }

    useEffect(() => {
        const check = async () => {
            try {
                const result = await axios.get(`https://huggingface.co/api/spaces/xelu3banh/anime`+randomNumber+`/runtime`, {
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                })
                if (result.data.stage === "RUNNING") {
                    dispatch(random(randomNumber))
                } else if (result.data.stage === "BUILDING") {
                    setRandomNumber("0"+ Math.floor(Math.random() * 9 + 1))
                    check()
                }else if (result.data.stage === "STOPPED") {
                    const setup = await axios.post(`https://huggingface.co/spaces/xelu3banh/anime`+randomNumber+`/start`, {
                        headers: {
                            'csrf':'eyJkYXRhIjp7ImV4cGlyYXRpb24iOjE2NzU3Mzg4NDg2NDEsInVzZXJJZCI6IjYzYTUxMGUwMjI1NDU1OTQwODAwZDdkOSJ9LCJzaWduYXR1cmUiOiJjOTk2OTk1ZmYxOWVmYjdlMTcwM2Y5OGNiNzNmYjdmNzA4NDFkOWJkMjRmNWYxYTBhOGFiM2Q4NWRkNWJlN2VhIn0=',
                            'content-type': 'application/x-www-form-urlencoded'
                        }
                    })
                    setRandomNumber("0"+ Math.floor(Math.random() * 9 + 1))
                    check()
                }
            } catch (error) {
                console.log(error);
            }
        }
        check()
    }, [])

    const netInfo = useNetInfo();
	useEffect(()=>{
		dispatch(disconnect(netInfo.isConnected))
	},[netInfo])

    if (!fontsLoaded) {
        return null;
    }

    if (netInfo.isConnected == false) {
		return (
			<DisconnectWifi/>
		)
	}
    return (
        <View style={styles().screen}>
            <Image style={styles().imgBG} source={require('../../asset/img/backGroud.png')} />
            <StatusBar style='dark' />
            <View style={styles().container}>
                <Text style={styles().textHome} onPress={randomPress}>ANIAGA AI</Text>
                <View style={styles().viewDoubleButton}>
                    <TouchableOpacity style={styles().buttonCircle} onPress={takePhoto} >
                        <Image style={{ width: 140, height: 95 }} source={require('../../asset/img/takePic.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles().buttonCircle} onPress={selectImage} >
                        <Image style={{ width: 140, height: 95 }} source={require('../../asset/img/ChoosePic.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles().viewBanner}>
                    <BannerAd
                        unitId={adUnitId}
                        size={BannerAdSize.LARGE_BANNER}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

export default HomeScreen