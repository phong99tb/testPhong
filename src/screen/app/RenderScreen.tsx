import { View, Text, Image, Dimensions, StatusBar } from 'react-native'
import React from 'react'
import styles from '../../asset/css'
import { AntDesign } from '@expo/vector-icons';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { Box, useToast } from 'native-base';
import { useNetInfo } from '@react-native-community/netinfo';
import DisconnectWifi from '../../component/DisconnectWifi';
import { useSelector } from 'react-redux';

const RenderScreen = ({ navigation, route }: any) => {
    const toast = useToast()
    const dataState: any = useSelector(state => state)
    const windowHeight = Dimensions.get('window').height;
    const adUnitId = "ca-app-pub-1885745425234581/8620012420";
    // const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-6635131293357908/9331385561';
    const renderPic = () => {
        if (!route.params.result.assets[0].uri.match(/\.(jpg|jpeg|png|gif)$/i)) {
            toast.show({
                render: () => {
                    return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                        Not a photo, please re-enter
                    </Box>;
                }
            })
        } else {
            navigation.navigate('SelectOutput', { route })
        }
    }
    if (dataState.disconnect == false) {
		return (
			<DisconnectWifi/>
		)
	}
    return (
        <View style={styles().screen} >
            <View style={styles().container}>
                <AntDesign name="left" size={24} color="black" style={{ marginTop: StatusBar.currentHeight }} onPress={() => navigation.pop()} />
                <Image resizeMode='contain' source={{ uri: route.params.result.assets[0].uri }} style={{ width: "100%", marginTop: 15, height: windowHeight - 230 }} />
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