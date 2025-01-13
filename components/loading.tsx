import { ReactElement } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Loading () : ReactElement {
    return (
        <SafeAreaView className="flex-1 bg-white flex-row justify-center items-center"> 
            <View>
                <Text className="">Loading...</Text>
            </View>
        </SafeAreaView>
    )
}