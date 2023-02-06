import { StatusBar, StyleSheet } from "react-native"

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
            
        },
        viewBtImage:{
            width: 36,
            height: 36,
            backgroundColor:"rgba(90, 90, 90, 0.31)",
            borderRadius: 1000,
            alignItems:"center",
            justifyContent:"center"
        },
        buttonImage:{
            width: 20,
            height: 20
        },
        viewDbBtImage: {
            position:"absolute",
            bottom: 8,
            right: 8,
            height: 78,
            justifyContent:"space-between"
        },
        title:{
            flexGrow: 1, 
            paddingLeft: 20, 
            fontWeight: "500", 
            fontSize: 16
        },
        head: {
            flexDirection: "row", 
            marginTop: StatusBar.currentHeight, 
            justifyContent: "space-between"
        },
        text: {
            fontWeight: "400", 
            fontSize: 14, 
            color: "#858585", 
            marginTop: 10
        },
        viewImage: {
            width: 195, 
            height: 230, 
            alignSelf: "center", 
            marginTop: 30
        },
        imageShow: {
            width: 195,
            height: 230, 
            alignSelf: "center"
        },
        viewDoubleBt: {
            flexDirection: "row", 
            justifyContent: "space-between", 
            marginTop: 20
        },
        buttonLeft: {
            width: "45%", 
            height: 50, 
            borderRadius: 9, 
            alignItems: "center", 
            justifyContent: "center", 
            borderColor: "#3787EB", 
            borderWidth: 1
        },
        buttonRight: {
            width: "45%", 
            alignItems: "center", 
            justifyContent: "center", 
            backgroundColor: "#3787EB", 
            height: 50, 
            borderRadius: 9
        },
        viewChoise: {
            alignItems: "center", 
            width: "100%", 
            marginTop: 20
        }
        
    })
    return css
}
export default styles;