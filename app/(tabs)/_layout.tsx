import { Stack, Tabs } from "expo-router";
import { ReactElement } from "react";

export default function TabsLayout() : ReactElement {
    return (
        <Stack screenOptions={{ headerShown : false }}>
            <Stack.Screen name="index"/>
        </Stack>
    )
}