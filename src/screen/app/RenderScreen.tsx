import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import styles from '../../asset/css'
import { AntDesign } from '@expo/vector-icons';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const RenderScreen = ({ navigation, route }: any) => {
    const windowHeight = Dimensions.get('window').height;
    const adUnitId = "ca-app-pub-6635131293357908/9331385561";
    // const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-6635131293357908/9331385561';
    const renderPic = () => {
        navigation.navigate('SelectOutput', { route })
    }
    return (
        <View style={styles().screen} >
            <View style={styles().container}>
                <AntDesign name="left" size={24} color="black" style={{ marginTop: 50 }} onPress={() => navigation.pop()} />
                <Image source={{ uri: route.params.result.assets[0].uri }} style={{ width: "100%", marginTop: 30, height:windowHeight - 230 }} />
                <Text onPress={renderPic} style={{ alignSelf: "center", width: 152, height: 50, backgroundColor: "#3787EB", textAlign: "center", textAlignVertical: "center", borderRadius: 9, color: "white", marginTop: 10 }}>Render</Text>
                <View style={styles().viewBanner}>
                    <BannerAd
                        unitId={adUnitId}
                        size={BannerAdSize.BANNER}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

export default RenderScreen