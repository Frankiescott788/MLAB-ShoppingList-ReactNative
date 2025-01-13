import { ReactElement } from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";  // Import the hook
import "@/global.css";
import store from "@/store/store";
import { Text } from "react-native";
import Database from "@/db/db";
import Loading from "@/components/loading";

// Import custom fonts (adjust paths as necessary)
const customFonts = {
  "Poppins-regular": require("@/assets/fonts/Poppins-Regular.ttf"),
};

export default function RootLayout(): ReactElement {
  // Load custom fonts using useFonts hook
  const [fontsLoaded] = useFonts(customFonts);

  Database();

  if (!fontsLoaded) {
    return <Loading /> 
  }

  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(start)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
      </Stack>
    </Provider>
  );
}
