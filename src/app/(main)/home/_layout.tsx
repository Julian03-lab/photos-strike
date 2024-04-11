import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function HomeLayoutNav() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: true }} />
        <Stack.Screen
          name="take-photo"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor={"black"} />
    </>
  );
}
