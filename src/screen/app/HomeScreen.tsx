import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../../asset/css'
import { StatusBar } from 'expo-status-bar'
import * as ImagePicker from 'expo-image-picker';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import {
    useFonts,
    MountainsofChristmas_400Regular,
    MountainsofChristmas_700Bold,
} from '@expo-google-fonts/mountains-of-christmas';

const HomeScreen = ({ navigation }: any) => {
    const adUnitId = "ca-app-pub-6635131293357908/9331385561";
    // const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-6635131293357908/9331385561';

    let [fontsLoaded] = useFonts({
        MountainsofChristmas_400Regular,
        MountainsofChristmas_700Bold,
    });

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

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles().screen}>
            <Image style={styles().imgBG} source={require('../../asset/img/backGroud.png')} />
            <StatusBar style='dark' />
            <View style={styles().container}>
                <Text style={styles().textHome}>ANIAGA AI</Text>
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