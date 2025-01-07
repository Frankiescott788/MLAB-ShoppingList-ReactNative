import { ReactElement } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home(): ReactElement {
  return (
    <SafeAreaView>
      <View>
        <Text className="text-red-300">Hello world</Text>
      </View>
    </SafeAreaView>
  );
}
