import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const DisconnectWifi = () => {
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Image source={require("../asset/img/iconDisconnect.jpg")} />
                <Text style={{ fontSize: 24, marginTop: 20 }}>Disconnect</Text>
            </View>
        </View>
    )
}

export default DisconnectWifi

