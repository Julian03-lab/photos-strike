import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function HomeLayoutNav() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#fff",
          },
        }}
      >
        <Stack.Screen name="modal" options={{
          presentation: "modal",

        }}/>
        </Stack>
      <StatusBar backgroundColor={"black"} />
    </>
  );
}
