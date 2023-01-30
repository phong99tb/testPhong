import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../../asset/css'
import { AntDesign } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { imageDark } from '../../asset/variable';
import { AdEventType, BannerAd, BannerAdSize, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import * as Sharing from 'expo-sharing';


const SelectOutput = ({ navigation, route }: any) => {
	const [imageRender, setImageRender] = useState<any>([]);
	const [theme, setTheme] = useState<any>()
	const [loaded, setLoaded] = useState(false);
	const [choise, setChoise] = useState(false);
	const [arrChoise, setArrChoise] = useState<any>([]);

	const adUnitId = "ca-app-pub-6635131293357908/9331385561";
	// const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-6635131293357908/9331385561';
	// const adUnitIdInter = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
	const adUnitIdInter = "ca-app-pub-6635131293357908/3131474531";

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

	useEffect(() => {
		const getImage = async () => {
			try {
				const result = await axios.get(`https://zilni.com/aidata/intelAnime.json`)
				const array = Object.values(result.data);
				setTheme(array)
				imageRender.length = array.length
			} catch (error) {
				console.log(error);
			}
		}
		getImage()
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
							const result = await axios.post(`https://adpro-informative09.hf.space/api/predict/`, JSON.stringify(themeTem), {
								headers: {
									'content-type': 'application/json'
								}
							})
							var imageTemp = imageRender
							imageTemp[i] = result.data.data[0]
							setImageRender(imageTemp)
							var imageTemp1 = [...imageTemp]
							setImageRender(imageTemp1)
							console.log(imageTemp);
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
										"fn_index": 1,
										"data": [
											"data:image/jpeg;base64," + base64,
											e,
											20,
											0.75,
											Math.floor(Math.random() * (10000000000 - 1000000000)) + 10000000000,
											7.5,
											"submit_by_human"
										],
										"session_hash": text
									}
									const result = await axios.post(`https://intel-stable-diffusion.hf.space/run/predict/`, themeTem, {
										headers: {
											'content-type': 'application/json'
										}
									})
									var imageTemp = imageRender
									imageTemp[index + 2] = result.data.data[0]
									setImageRender(imageTemp)
									console.log(imageTemp);
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
		}
		getImage()
	}, [theme])

	// useEffect(() => {
	// 	const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
	// 		setLoaded(true);
	// 		interstitial.show();
	// 	});
	// 	interstitial.load();
	// 	return unsubscribe;
	// }, []);

	// if (!loaded) {
	// 	return null;
	// }

	return (
		<View style={styles().screen} >
			<View style={styles().container}>
				<View style={{ flexDirection: "row", marginTop: 50, justifyContent: "space-between" }}>
					{
						choise === false ?
							<>
								<AntDesign name="left" size={18} color="black" style={{ marginTop: 4 }} onPress={() => navigation.pop()} />
								<Text style={{ flexGrow: 1, paddingLeft: 20, fontWeight: "500", fontSize: 16 }}>Select output</Text>
								<TouchableOpacity onPress={() => Sharing.shareAsync("http://khoahocphattrien.vn/Images/Uploaded/Share/2016/12/20/Nhung-buc-anh-dep-nhat-2016-chia-se-tren-Flickr_4.jpg")}>
									<Image source={require("../../asset/img/iconShare.png")} style={{ width: 20, height: 20 }} />
								</TouchableOpacity>
							</> : <>
								<TouchableOpacity onPress={closeChoise} style={{ width: 20, height: 20, justifyContent:'flex-end' }}>
									<Image source={require("../../asset/img/iconClose.png")} style={{ width: 16, height: 16 }} />
								</TouchableOpacity>
								<Text style={{ flexGrow: 1, paddingLeft: 20, fontWeight: "500", fontSize: 16 }}>Select {arrChoise.length} photo</Text>
								<Text>Select All</Text>
							</>
					}
				</View>
				<Text style={{ fontWeight: "400", fontSize: 14, color: "#858585", marginTop: 10 }}>Choose one output to finalize and save</Text>
				<Image source={{ uri: imageRender[0] }} style={{ width: 195, height: 230, marginTop: 30, alignSelf: "center" }} />
				{/* <Image source={{ uri: imageRender[1] }} style={{ width: 195, height: 230, marginTop: 30, alignSelf: "center" }} /> */}
				<View>
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
															<Image source={{ uri: e }} style={styles().imgLarge} />
															<Image source={require('../../asset/img/iconNoChoise.png')} style={styles().imgChoise} />
														</TouchableOpacity>
													</> :
													<>
														<TouchableOpacity key={e} style={styles().imgTouchableLarge} onPress={() => noChoiseImg(e)} onLongPress={() => setChoise(true)} >
															<Image source={{ uri: e }} style={styles().imgLarge} />
															<Image source={require('../../asset/img/iconChoise.png')} style={styles().imgChoise} />
														</TouchableOpacity>
													</>
												:
												<TouchableOpacity key={e} style={styles().imgTouchableLarge} onPress={() => changePossion(i)} onLongPress={() => choiseImg(e)} >
													<Image source={{ uri: e }} style={styles().imgLarge} />
												</TouchableOpacity>
								)
							})
						}
					</ScrollView>
				</View>
				{
					choise === false ?
						<View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
							<TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ width: "45%", height: 50, borderRadius: 9, alignItems: "center", justifyContent: "center", borderColor: "#3787EB", borderWidth: 1 }}>
								<Text style={{ color: "#3787EB" }}>Create new photo</Text>
							</TouchableOpacity>
							<TouchableOpacity style={{ width: "45%", alignItems: "center", justifyContent: "center", backgroundColor: "#3787EB", height: 50, borderRadius: 9 }}>
								<Text style={{ color: "white" }}>Download all</Text>
							</TouchableOpacity>
						</View>
						:
						<View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
							<TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ width: "45%", height: 50, borderRadius: 9, alignItems: "center", justifyContent: "center", borderColor: "#3787EB", borderWidth: 1 }}>
								<Text style={{ color: "#3787EB" }}>Share</Text>
							</TouchableOpacity>
							<TouchableOpacity style={{ width: "45%", alignItems: "center", justifyContent: "center", backgroundColor: "#3787EB", height: 50, borderRadius: 9 }}>
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