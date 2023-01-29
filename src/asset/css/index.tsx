import { StyleSheet } from "react-native"

const styles = () => {
    const css = StyleSheet.create({
        screen:{
            flex:1,
            alignItems:"center",
            backgroundColor:"white"
        },
        container:{
            width:"90%",
            height:"100%"
        },
        buttonCircle:{
            width:70,
            height:70,
            justifyContent:"center",
            alignItems:"center"
        },
        imgBG:{
            width: '100%',
            height: '100%',
            position:"absolute"
        },
        textHome: {
            alignSelf: "center", 
            marginTop: 150, 
            fontSize: 41, 
            fontFamily: 'MountainsofChristmas_700Bold', 
            color:"#3EB2FF"
        },
        imgShow:{
            width: "100%",
            height: 150,
            borderRadius:5
        },
        imgTouchable: {
            width: 200,
            height: 152,
            borderWidth: 1,
            borderColor:"black",
            borderRadius:5,
            marginRight:10
        },
        imgTouchableLarge: {
            width: 63, 
            height: 63, 
            marginTop: 30, 
            marginRight: 20, 
            alignSelf: "center"
        },
        imgLarge: {
            width: 63, 
            height: 63, 
            alignSelf: "center"
        },
        viewDoubleButton: {
            marginTop: 100, 
            flexDirection: "row", 
            width: "100%", 
            justifyContent: "space-around", 
            marginBottom: 40
        },
        viewBanner: {
            position:"absolute", 
            bottom:0,
            width:"100%",
            alignItems:"center",
        },
        imgChoise: {
            position:"absolute",
            top: 5,
            right: 5,
            width:16,
            height:16
        },
        viewTwoButton: {
            
        }
        
    })
    return css
}
export default styles;