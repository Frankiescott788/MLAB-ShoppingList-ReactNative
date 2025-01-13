import { Redirect, useNavigation, useRouter } from "expo-router";
import { ReactElement, useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "@/components/loading";

const start_image = require("@/assets/images/start.png");

export default function Start(): ReactElement {
  const fadeInBottom = useRef(new Animated.Value(300)).current;
  const fadeInTop = useRef(new Animated.Value(-300)).current;
  const fadeInBottomSlow = useRef(new Animated.Value(0)).current;
  const fadeInLeft = useRef(new Animated.Value(-300)).current;
  const fadeInRight = useRef(new Animated.Value(300)).current;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const animations = [
      Animated.timing(fadeInBottom, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeInBottomSlow, {
        toValue: 1, // Opacity animation
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeInTop, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeInLeft, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeInRight, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ];

    Animated.parallel(animations).start();

    return () => {
      animations.forEach((anim) => anim.stop());
    };
  }, []);

  const navigate = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const res = await AsyncStorage.getItem("dismissScreen");
        if (res) {
          navigate.replace("/(tabs)");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  })

  async function disableScreen() {
    await AsyncStorage.setItem("dismissScreen", "dismissed");
  }

  if(isLoading) {
    return <Loading />
  }

  return (
    <SafeAreaView className="flex flex-1 bg-white px-5 pt-[8rem]">
      <View className="w-full">
        <Animated.View
          className="flex flex-col justify-center p-2"
          style={{ transform: [{ translateY: fadeInTop }] }}
        >
          <ImageBackground
            source={start_image}
            className="w-full h-[20rem]"
          ></ImageBackground>
        </Animated.View>
        <View className="pt-[4rem]">
          <Animated.Text
            className="text-5xl font-semibold text-[#EDB5B4]"
            style={{ transform: [{ translateY: fadeInBottom }] }}
          >
            Simplify Your Shopping
          </Animated.Text>
          <Animated.Text
            className="text-gray-400 text-md"
            style={{
              opacity: fadeInBottomSlow,
            }}
          >
            Stay organized, save time, and shop with confidence. Create your
            perfect shopping lists and make every trip a breeze. Let’s begin!
          </Animated.Text>
        </View>
        <View className="flex flex-row justify-center gap-4 p-4 mt-[2rem] mb-5">
          <Animated.View
            className="h-2 w-[8rem] bg-gray-200 rounded-full"
            style={{ transform: [{ translateX: fadeInLeft }] }}
          ></Animated.View>
          <View className="h-2 w-[8rem] bg-[#EDB5B4] rounded-full"></View>
          <Animated.View
            className="h-2 w-[8rem] bg-gray-200 rounded-full"
            style={{ transform: [{ translateX: fadeInRight }] }}
          ></Animated.View>
        </View>
        <View className="">
          <TouchableOpacity
            className="bg-[#EDB5B4] py-5 rounded-xl"
            onPress={() => {
              disableScreen();
              navigate.navigate("/(tabs)");
            }}
          >
            <Text className="text-center text-xl text-white">Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
