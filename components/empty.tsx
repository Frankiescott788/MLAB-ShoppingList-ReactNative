import { ReactElement } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const emptyimage = require("@/assets/images/empty.jpeg");

export default function EmptyList({ setOnOpen }: { setOnOpen: () => void }): ReactElement {
    return (
        <View>
            <View className="flex-row justify-center">
                <Image source={emptyimage} style={{
                    height: 200,
                    width: 200,
                    borderRadius: 100,
                    borderWidth: 2,
                    borderColor: "#9ca3af",
                }}
                />
            </View>
            <View className="my-10 " style={{ paddingBlock: 10 }}>
                <Text className="text-center text-3xl">No Shopping Lists Yet.</Text>
                <Text className="text-center text-gray-400">create new one by clicking the button below</Text>
            </View>
            <View>
                <TouchableOpacity 
                    className="bg-[#fe938c]" 
                    style={{ paddingBlock: 20, marginInline: 40, borderRadius: 10, marginBlock: 10 }}
                    onPress={setOnOpen}
                >
                    <Text className="text-center text-white text-xl">Create List</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}