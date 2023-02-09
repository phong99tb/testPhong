import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../../asset/css'
import { AntDesign } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { imageDark } from '../../asset/variable';
import { BannerAd, BannerAdSize, InterstitialAd, AdEventType, TestIds, useInterstitialAd } from 'react-native-google-mobile-ads';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { Box, useToast } from 'native-base';
import { useSelector } from 'react-redux';
import DisconnectWifi from '../../component/DisconnectWifi';

const SelectOutput = ({ navigation, route }: any) => {
	const [imageRender, setImageRender] = useState<any>([]);
	const [theme, setTheme] = useState<any>();
	const [loaded, setLoaded] = useState(false);
	const [choise, setChoise] = useState(false);
	const [arrChoise, setArrChoise] = useState<any>([]);
	const dataState: any = useSelector(state => state)
	const toast = useToast()
	const id = "test-toast";

	const adUnitId = "ca-app-pub-1885745425234581/8620012420";
	const adUnitIdInter = "ca-app-pub-1885745425234581/7421916175";

	const interstitial = InterstitialAd.createForAdRequest(adUnitIdInter, {
		requestNonPersonalizedAdsOnly: true,
		keywords: ['fashion', 'clothing'],
	});

	const changePossion = (i: any) => {
		var arr = [...imageRender]
		arr[0] = imageRender[i]
		arr[i] = imageRender[0]
		setImageRender(arr)
	}

	const choiseImg = (e: any) => {
		setChoise(true)
		var imgChoiseTem = [...arrChoise]
		imgChoiseTem.push(e)
		setArrChoise(imgChoiseTem)
	}

	const noChoiseImg = (e: any) => {
		const imgChoiseTem = arrChoise.filter((item: any) => !e.includes(item));
		setArrChoise(imgChoiseTem)
	}

	const closeChoise = () => {
		setChoise(false),
			setArrChoise([])
	}

	const downloadAll = () => {
		imageRender.map((e: any, index: any) => {
			const runTask = async () => {
				try {
					const { status } = await MediaLibrary.requestPermissionsAsync();
					if (status === "granted") {
						const data = e
						const base64Code = data.split("data:image/png;base64,")[1];

						const filename = FileSystem.documentDirectory + "some_unique_file_name.png";
						await FileSystem.writeAsStringAsync(filename, base64Code, {
							encoding: FileSystem.EncodingType.Base64,
						});

						const mediaResult = await MediaLibrary.saveToLibraryAsync(filename);
						console.log(index)
					}
				} catch (error) {
					console.log(error);
					runTask()
				}
			}
			runTask()
		})
		if (!toast.isActive(id)) {
			toast.show({
				id,
				duration: 1000,
				render: () => {
					return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
						Download Success
					</Box>;
				}
			})
		}
	}

	const downloadSelect = () => {
		arrChoise.map((e: any) => {
			const runTask = async () => {
				try {
					const { status } = await MediaLibrary.requestPermissionsAsync();
					if (status === "granted") {
						const data = e
						const base64Code = data.split("data:image/png;base64,")[1];

						const filename = FileSystem.documentDirectory + "some_unique_file_name.png";
						await FileSystem.writeAsStringAsync(filename, base64Code, {
							encoding: FileSystem.EncodingType.Base64,
						});

						const mediaResult = await MediaLibrary.saveToLibraryAsync(filename);
					}
				} catch (error) {
					console.log(error);
					runTask()
				}
			}
			runTask()
		})
		const id = "test-toast";
		if (!toast.isActive(id)) {
			toast.show({
				id,
				duration: 1000,
				render: () => {
					return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
						Download Success
					</Box>;
				}
			})
		}
	}

	const shareImage = async () => {
		try {
			const { status } = await MediaLibrary.requestPermissionsAsync();
			if (status === "granted") {
				try {
					const data = imageRender[0]
					const base64Code = data.split("data:image/png;base64,")[1];

					let filename = 'share.gif'; // or some other way to generate filename
					let filepath = `${FileSystem.documentDirectory}/${filename}`;
					await FileSystem.writeAsStringAsync(filepath, base64Code, { encoding: 'base64' });
					await Sharing.shareAsync(filepath, { mimeType: 'image/gif' })
				} catch (error) {
					console.log(error)
				}
			}
		} catch (error) {
			console.log(error);
			shareImage()
		}
	}

	const downImage = async () => {
		try {
			const { status } = await MediaLibrary.requestPermissionsAsync();
			if (status === "granted") {
				const data = imageRender[0]
				const base64Code = data.split("data:image/png;base64,")[1];

				const filename = FileSystem.documentDirectory + "some_unique_file_name.png";
				await FileSystem.writeAsStringAsync(filename, base64Code, {
					encoding: FileSystem.EncodingType.Base64,
				});

				const mediaResult = await MediaLibrary.saveToLibraryAsync(filename);
				console.log(mediaResult)
			}
			const id = "test-toast";
			if (!toast.isActive(id)) {
				toast.show({
					id,
					duration: 1000,
					render: () => {
						return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
							Download Success
						</Box>;
					}
				})
			}
		} catch (error) {
			downImage()
		}
	}

	const selectAll = () => {
		if (arrChoise.length != imageRender.length) {
			setArrChoise(imageRender)
		} else {
			setArrChoise([])
		}
	}

	useEffect(() => {
		const getImage = async () => {
			try {
				const result = await axios.get(`https://zilni.com/aidata/intelAnime.json`, {
					headers: {
						'Cache-Control': 'no-cache'
					}
				})
				setTheme(result.data.data)
				imageRender.length = result.data.data.length
			} catch (error) {
				console.log(error);
			}
		}
		getImage()
		const myTimeout = setTimeout(() => setLoaded(true), 3000);
	}, [])

	useEffect(() => {
		const getImage = async () => {
			const base64 = await FileSystem.readAsStringAsync(route.params.route.params.result.assets[0].uri, { encoding: 'base64' });
			const picture = ["style 2", "style 4"]
			if (base64 != undefined) {
				picture.map((e: any, i: any) => {
					const featch = async () => {
						try {
							const themeTem = {
								data: ["data:image/jpeg;base64," + base64, e],
								cleared: false,
								example_id: null,
								session_hash: "9nd2e3159dc"
							}
							const result = await axios.post(`https://adpro-informative` + dataState.random + `.hf.space/api/predict/`, JSON.stringify(themeTem), {
								headers: {
									'content-type': 'application/json'
								}
							})
							var imageTemp = imageRender
							imageTemp[i] = result.data.data[0]
							setImageRender(imageTemp)
							var imageTemp1 = [...imageTemp]
							setImageRender(imageTemp1)
						} catch (error) {
							console.log(error);
						}
					}
					featch()
				})
				if (theme.length != 0) {
					axios.all(theme.map((e: string, index: any) => {
						const featch1 = async () => {
							try {
								var text = ""
								var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
								for (var i = 0; i < 11; i++) {
									text += possible.charAt(Math.floor(Math.random() * possible.length));
								}
								if (text.length != 0) {
									const themeTem =
									{
										"fn_index": 0,
										"data": [
											"data:image/jpeg;base64," + base64
										],
										"action": "predict",
										"session_hash": text
									}
									const result = await axios.post(e, themeTem, {
										headers: {
											'content-type': 'application/json'
										}
									})
									var imageTemp = imageRender
									imageTemp[index + 2] = result.data.data[0]
									setImageRender(imageTemp)
									if (result.data.data[0] == imageDark) {
										featch1()
									}
									if (result.data.data[0] != imageDark) {
										var imageTemp1 = [...imageRender]
										setImageRender(imageTemp1)
									}
								}
							} catch (error) {
								console.log(error);
								featch1()
							}
						}
						featch1()
					}))
				}
			}
			console.log(theme);
		}
		getImage()
	}, [theme])

	useEffect(() => {
		const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
			setLoaded(true);
			interstitial.show();
		});
		interstitial.load();
		console.log(interstitial.load())
		return unsubscribe;
	}, []);

	if (!loaded) {
		return null;
	}

	if (dataState.disconnect == false) {
		return (
			<DisconnectWifi />
		)
	}
	return (
		<View style={styles().screen} >
			<View style={styles().container}>
				<View style={styles().head}>
					{
						choise === false ?
							<>
								<AntDesign name="left" size={18} color="black" style={{ marginTop: 4 }} onPress={() => navigation.pop()} />
								<Text style={styles().title}>Select output</Text>
								<View style={{ flexDirection: "row" }}>
									{/* <TouchableOpacity style={{ marginRight: 20 }} onPress={shareImage} >
										<Image source={require("../../asset/img/iconShare.png")} style={{ width: 20, height: 20 }} />
									</TouchableOpacity> */}
									{
										imageRender.some((e: any) => e !== undefined) === true ?
											<TouchableOpacity onPress={() => setChoise(true)} >
												<Image source={require("../../asset/img/iconEdit.png")} style={{ width: 20, height: 20 }} />
											</TouchableOpacity> :
											<></>
									}
								</View>
							</> : <>
								<TouchableOpacity onPress={closeChoise} style={{ width: 20, height: 20, justifyContent: 'flex-end' }}>
									<Image source={require("../../asset/img/iconClose.png")} style={{ width: 16, height: 16 }} />
								</TouchableOpacity>
								<Text style={styles().title}>Select {arrChoise.length} photo</Text>
								<Text onPress={selectAll}>Select All</Text>
							</>
					}
				</View>
				<Text style={styles().text}>Choose one output to finalize and save</Text>
				{
					choise === false ?
						imageRender[0] === undefined ? <ActivityIndicator size="large" style={styles().viewImage} /> :
							<View style={styles().viewImage}>
								<Image resizeMode='contain' source={{ uri: imageRender[0] }} style={styles().imageShow} />
								<View style={styles().viewDbBtImage}>
									<TouchableOpacity style={styles().viewBtImage} onPress={shareImage}>
										<Image style={styles().buttonImage} source={require("../../asset/img/iconShareWhite.png")} />
									</TouchableOpacity>
									<TouchableOpacity style={styles().viewBtImage} onPress={downImage}>
										<Image style={styles().buttonImage} source={require("../../asset/img/iconDownloadWhite.png")} />
									</TouchableOpacity>
								</View>
							</View> : arrChoise.includes(imageRender[0]) !== true ?
							<View style={styles().viewImage}>
								<TouchableOpacity onPress={() => choiseImg(imageRender[0])} >
									<Image resizeMode='contain' source={{ uri: imageRender[0] }} style={styles().imageShow} />
									<Image source={require('../../asset/img/iconNoChoise.png')} style={styles().imgChoise} />
								</TouchableOpacity>
							</View> :
							<View style={styles().viewImage}>
								<TouchableOpacity onPress={() => noChoiseImg(imageRender[0])} >
									<Image resizeMode='contain' source={{ uri: imageRender[0] }} style={styles().imageShow} />
									<Image source={require('../../asset/img/iconChoise.png')} style={styles().imgChoise} />
								</TouchableOpacity>
							</View>
				}
				<View >
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						{
							imageRender?.map((e: any, i: any) => {
								return (
									i == 0 ? <></> :
										e == undefined || e.length === 0 ? <ActivityIndicator key={e} size="large" style={styles().imgTouchableLarge} /> :
											choise !== false ?
												arrChoise.includes(e) !== true ?
													<>
														<TouchableOpacity key={e} style={styles().imgTouchableLarge} onPress={() => choiseImg(e)} onLongPress={() => setChoise(true)} >
															<Image resizeMode='contain' source={{ uri: e }} style={styles().imgLarge} />
															<Image source={require('../../asset/img/iconNoChoise.png')} style={styles().imgChoise} />
														</TouchableOpacity>
													</> :
													<>
														<TouchableOpacity key={e} style={styles().imgTouchableLarge} onPress={() => noChoiseImg(e)} onLongPress={() => setChoise(true)} >
															<Image resizeMode='contain' source={{ uri: e }} style={styles().imgLarge} />
															<Image source={require('../../asset/img/iconChoise.png')} style={styles().imgChoise} />
														</TouchableOpacity>
													</>
												:
												<TouchableOpacity key={e} style={styles().imgTouchableLarge} onPress={() => changePossion(i)} onLongPress={() => choiseImg(e)} >
													<Image resizeMode='contain' source={{ uri: e }} style={styles().imgLarge} />
												</TouchableOpacity>
								)
							})
						}
					</ScrollView>
				</View>
				{
					choise === false ?
						<View style={styles().viewDoubleBt}>
							<TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles().buttonLeft}>
								<Text style={{ color: "#3787EB" }}>Create new photo</Text>
							</TouchableOpacity>
							{
								imageRender.includes(undefined) === true ?
									<View style={styles().buttonRight}>
										<Text style={{ color: "white" }}>Download all</Text>
									</View> :
									<TouchableOpacity onPress={downloadAll} style={styles().buttonRight}>
										<Text style={{ color: "white" }}>Download all</Text>
									</TouchableOpacity>
							}
						</View>
						:
						<View style={styles().viewChoise}>
							<TouchableOpacity onPress={downloadSelect} style={styles().buttonRight}>
								<Text style={{ color: "white" }}>Download</Text>
							</TouchableOpacity>
						</View>
				}
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

export default SelectOutput
