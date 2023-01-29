import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import styles from '../../asset/css';
import { StatusBar } from 'expo-status-bar';

const TakePhotoScreen = ({ route }: any) => {
	const [image, setImage] = useState<any>();
	const [imageBase64, setImageBase64] = useState<string>("");
	const [imageBase642, setImageBase642] = useState<string>("");
	const [urlChange, setUrlChange] = useState<any>();

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
	}

	const changeImage1 = () => {
		var imgTemp = image
		setImage(imageBase64)
		setImageBase64(imgTemp)
	}

	const changeImage2 = () => {
		var imgTemp = image
		setImage(imageBase642)
		setImageBase642(imgTemp)
	}

	useEffect(() => {
		const getString = async () => {
			try {
				const result = await axios.get(`https://zilni.com/aidata/sketchManga.json`)
				// const result = await axios.get(`https://huggingface.co/api/spaces/adpro/informative08/runtime`)
				setUrlChange(result.data[Math.floor(Math.random() * 10)])
			} catch (error) {
				console.log(error);
			}
		}
		getString()
	}, [])

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
				const usersName = JSON.stringify(bodyJson);
				const usersName2 = JSON.stringify(bodyJson2);
				if (base64 != undefined) {
					const featch = async () => {
						try {
							const result = await axios.post(urlChange + `.hf.space/api/predict/`, usersName, {
								headers: {
									'content-type': 'application/json'
								}
							})
							setImageBase64(result.data.data[0])
						} catch (error) {
							console.log(error);
						}
					}
					featch()
					const featch2 = async () => {
						try {
							const result = await axios.post(`https://adpro-informative09.hf.space/api/predict/`, usersName2, {
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
				// function download
				// const filename = FileSystem.documentDirectory + "some_unique_file_name.png";
				// await FileSystem.writeAsStringAsync(filename, base64, {
				// 	encoding: FileSystem.EncodingType.Base64,
				// });
				// const mediaResult = await MediaLibrary.saveToLibraryAsync(filename);
			}
		}
		getImage()
	}, [urlChange])

	return (
		<View style={styles().screen}>
			<StatusBar style='dark' />
			<View style={styles().container}>
				<Image source={{ uri: image }} style={{ width: "100%", height: 300, marginTop: 50 }} />
				<View style={{ flexDirection: "row", marginTop: 20, marginBottom: 20, justifyContent: "space-between" }}>
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
				</View>
				<Button title="Download" onPress={downImage} />
			</View>

		</View>
	);
}

export default TakePhotoScreen

