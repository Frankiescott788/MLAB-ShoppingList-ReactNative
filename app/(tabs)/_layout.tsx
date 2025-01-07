import { Tabs } from "expo-router";
import { ReactElement } from "react";

export default function TabsLayout() : ReactElement {
    return (
        <Tabs screenOptions={{ headerShown : false }}>
            <Tabs.Screen name="index"/>
        </Tabs>
    )
}