import { View, Image, Button, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import styles from '../../asset/css';
import { StatusBar } from 'expo-status-bar'

const SelectPhotoScreen = ({ route }: any) => {
	const [image, setImage] = useState<any>();
	const [imageBase64, setImageBase64] = useState<string>("");
	const [imageBase642, setImageBase642] = useState<string>("");
	const [imageBase64Meme1, setImageBase64Meme1] = useState<string>("");
	const [imageBase64Meme2, setImageBase64Meme2] = useState<string>("");
	const [imageBase64Meme3, setImageBase64Meme3] = useState<string>("");
	const [imageBase64Meme4, setImageBase64Meme4] = useState<string>("");
	const [imageBase64Meme5, setImageBase64Meme5] = useState<string>("");
	const [imageBase64Meme6, setImageBase64Meme6] = useState<string>("");
	const [imageBase64Meme7, setImageBase64Meme7] = useState<string>("");
	const [imageBase64Meme8, setImageBase64Meme8] = useState<string>("");
	const [imageBase64Meme9, setImageBase64Meme9] = useState<string>("");
	const [imageBase64Meme10, setImageBase64Meme10] = useState<string>("");
	const [reload, setReload]= useState<any>(false)

	const downImage = async () => {
		try {
			const { status } = await MediaLibrary.requestPermissionsAsync();
			if (status === "granted") {
				const base64Code = imageBase64.split("data:image/png;base64,")[1];
				const filename = FileSystem.documentDirectory + "some_unique_file_name.png";
				await FileSystem.writeAsStringAsync(filename, base64Code, {
					encoding: FileSystem.EncodingType.Base64,
				});
				const mediaResult = await MediaLibrary.saveToLibraryAsync(filename);
			}
		} catch (error) {
			console.log(error);
		}
		try {
			const { status } = await MediaLibrary.requestPermissionsAsync();
			if (status === "granted") {
				const base64Code = imageBase642.split("data:image/png;base64,")[1];
				const filename = FileSystem.documentDirectory + "some_unique_file_name.png";
				await FileSystem.writeAsStringAsync(filename, base64Code, {
					encoding: FileSystem.EncodingType.Base64,
				});
				const mediaResult = await MediaLibrary.saveToLibraryAsync(filename);
			}
		} catch (error) {
			console.log(error);
		}
	}

	console.log(route.params.result);

	useEffect(() => {
		const getImage = async () => {
			if (!route.params.result.canceled) {
				setImage(route.params.result.assets[0].uri);
				const base64 = await FileSystem.readAsStringAsync(route.params.result.assets[0].uri, { encoding: 'base64' });
				var dataBase64 = "data:image/jpeg;base64," + base64
				var bodyJson = {
					data: [dataBase64, "style 2"],
					cleared: false,
					example_id: null,
					session_hash: "9nd2e3159dc"
				}
				var bodyJson2 = {
					data: [dataBase64, "style 4"],
					cleared: false,
					example_id: null,
					session_hash: "9nd2e3159dc"
				}
				if (base64 != undefined) {
					const featch1 = async () => {
						try {
							const result = await axios.post(`https://adpro-informative09.hf.space/api/predict/`, JSON.stringify(bodyJson), {
								headers: {
									'content-type': 'application/json'
								}
							})
							setImageBase64(result.data.data[0])
						} catch (error) {
							console.log(error);
						}
					}
					featch1()
					const featch2 = async () => {
						try {
							const result = await axios.post(`https://adpro-informative09.hf.space/api/predict/`, JSON.stringify(bodyJson2), {
								headers: {
									'content-type': 'application/json'
								}
							})
							setImageBase642(result.data.data[0])
						} catch (error) {
							console.log(error);
						}
					}
					featch2()
				}
			}
		}
		getImage()
	}, [])

	useEffect(() => {
		const getImage = async () => {
			if (!route.params.result.canceled) {
				setImage(route.params.result.assets[0].uri);
				const base64 = await FileSystem.readAsStringAsync(route.params.result.assets[0].uri, { encoding: 'base64' });
				// var baseCode64 = "data:image/jpeg;base64," + base64
				var theme1 = {
					"fn_index": 2,
					"data": [
						"http://34.229.166.42:80",
						"data:image/jpeg;base64," + base64,
						"manga character, pretty manga, black young soldier, glasses, flying, red boots, wearing helmet, urban city, manga, mangaka hirohiko, araki studio,  manga style, panels, brown vibrant colors, octane renderer, long hair, dark",
						60,
						0.5,
						509364318,
						10
					],
					"session_hash": "7vdoo0yofnj"
				}
				var theme2 = {
					"fn_index": 2,
					"data": [
						"http://34.229.166.42:80",
						"data:image/jpeg;base64," + base64,
						"join the party, pretty, perfect eyes, perfect face, black dress, perfect face, symmetric eyes, sharp focus, directed gaze, specular reflection, beauty shot at the beach, occlusion shadow, intricate, bokeh, masterpiece",
						60,
						0.5,
						837717654,
						10
					],
					"session_hash": "7vdoo0yofnj"
				}
				var theme3 = {
					"fn_index": 2,
					"data": [
						"http://34.229.166.42:80",
						"data:image/jpeg;base64," + base64,
						"caricature, funny, cute caricature,  laughing caricature, friendly, caricature just for fun, a caricature man, a caricature woman, fat caricature, meme, trending meme, super big mount and nose, tiny eyes, caricature, funny caricature, top of caricature",
						65,
						0.5,
						837717654,
						10
					],
					"session_hash": "7vdoo0yofnj"
				}
				var theme4 = {
					"fn_index": 2,
					"data": [
						"http://34.229.166.42:80",
						"data:image/jpeg;base64," + base64,
						"fashion, fashion of the week, luxury clothes, elite, outfit, blink, flashy, cinematic, high detail, idol,  full body shot, middle shot, tight shot, beauty face, wearing jewelry, bokeh, extreme detail, fashion show, photograph booth background, photo booth",
						65,
						0.5,
						837717654,
						10
					],
					"session_hash": "7vdoo0yofnj"
				}
				if (base64 != undefined) {
					const featch1 = async () => {
						try {
							const result = await axios.post(`https://intel-stable-diffusion-side-by-side.hf.space/run/predict/`, theme1, {
								headers: {
									'content-type': 'application/json'
								} 
							})
							setImageBase64Meme1(result.data.data[0])
							// setImageBase64Meme2(result.data.data[1])
							console.log(result);
						} catch (error) {
							console.log(error);
						}
					}
					featch1()
					const featch2 = async () => {
						try {
							const result = await axios.post(`https://intel-stable-diffusion-side-by-side.hf.space/run/predict/`, theme2, {
								headers: {
									'content-type': 'application/json'
								}
							})
							setImageBase64Meme2(result.data.data[0])
							// setImageBase64Meme4(result.data.data[1])
							console.log(result);
							
						} catch (error) {
							console.log(error);
						}
					}
					featch2()
					const featch3 = async () => {
						try {
							const result = await axios.post(`https://intel-stable-diffusion-side-by-side.hf.space/run/predict/`, theme3, {
								headers: {
									'content-type': 'application/json'
								}
							})
							setImageBase64Meme3(result.data.data[0])
							// setImageBase64Meme4(result.data.data[1])
							console.log(result);
							
						} catch (error) {
							console.log(error);
						}
					}
					featch3()
					const featch4 = async () => {
						try {
							const result = await axios.post(`https://intel-stable-diffusion-side-by-side.hf.space/run/predict/`, theme4, {
								headers: {
									'content-type': 'application/json'
								}
							})
							setImageBase64Meme4(result.data.data[0])
							// setImageBase64Meme4(result.data.data[1])
							console.log("--phong--",result);
						} catch (error) {
							console.log(error);
						}
					}
					featch4()
				}
			}
		}
		getImage()
	}, [])

	const changeImage1 = () => {
		var imgTemp = image
		setImage(imageBase64)
		setImageBase64(imgTemp)
		setReload(!reload)
	}

	const changeImage2 = () => {
		var imgTemp = image
		setImage(imageBase642)
		setImageBase642(imgTemp)
		setReload(!reload)
	}

	const changeImage3 = () => {
		var imgTemp = image
		setImage(imageBase64Meme1)
		setImageBase64Meme1(imgTemp)
		setReload(!reload)
	}

	const changeImage4 = () => {
		var imgTemp = image
		setImage(imageBase64Meme2)
		setImageBase64Meme2(imgTemp)
		setReload(!reload)
	}

	const changeImage5 = () => {
		var imgTemp = image
		setImage(imageBase64Meme3)
		setImageBase64Meme3(imgTemp)
		setReload(!reload)
	}

	const changeImage6 = () => {
		var imgTemp = image
		setImage(imageBase64Meme4)
		setImageBase64Meme4(imgTemp)
		setReload(!reload)
	}

	return (
		<View style={styles().screen}>
			<StatusBar style='dark' />
			<View style={styles().container}>
				<Image source={{ uri: image }} style={{ width: "100%", height: 300, marginTop: 50 }} />
				<View style={{ width: "100%", height: 300, marginTop:20 }}>
					<ScrollView horizontal={true} style={{ width: "100%", height: "100%" }}>
						{
							imageBase64.length === 0 ? <ActivityIndicator size="large" style={styles().imgTouchable} /> :
								<TouchableOpacity style={styles().imgTouchable} onPress={changeImage1} >
									<Image source={{ uri: imageBase64 }} style={styles().imgShow} />
								</TouchableOpacity>
						}
						{
							imageBase642.length === 0 ? <ActivityIndicator size="large" style={styles().imgTouchable} /> :
								<TouchableOpacity style={styles().imgTouchable} onPress={changeImage2} >
									<Image source={{ uri: imageBase642 }} style={styles().imgShow} />
								</TouchableOpacity>
						}
						{
							imageBase64Meme1.length === 0 ? <ActivityIndicator size="large" style={styles().imgTouchable} /> :
								<TouchableOpacity style={styles().imgTouchable} onPress={changeImage3} >
									<Image source={{ uri: imageBase64Meme1 }} style={styles().imgShow} />
								</TouchableOpacity>
						}
						{
							imageBase64Meme2.length === 0 ? <ActivityIndicator size="large" style={styles().imgTouchable} /> :
								<TouchableOpacity style={styles().imgTouchable} onPress={changeImage4} >
									<Image source={{ uri: imageBase64Meme2 }} style={styles().imgShow} />
								</TouchableOpacity>
						}
						{
							imageBase64Meme3.length === 0 ? <ActivityIndicator size="large" style={styles().imgTouchable} /> :
								<TouchableOpacity style={styles().imgTouchable} onPress={changeImage5} >
									<Image source={{ uri: imageBase64Meme3 }} style={styles().imgShow} />
								</TouchableOpacity>
						}
						{
							imageBase64Meme4.length === 0 ? <ActivityIndicator size="large" style={styles().imgTouchable} /> :
								<TouchableOpacity style={styles().imgTouchable} onPress={changeImage6} >
									<Image source={{ uri: imageBase64Meme4 }} style={styles().imgShow} />
								</TouchableOpacity>
						}
					</ScrollView>
				</View>
				<Button title="Download" onPress={downImage} />
			</View>
		</View>
	)
}

export default SelectPhotoScreen