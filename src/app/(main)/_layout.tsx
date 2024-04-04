import { Stack } from "expo-router";

export default function RootLayout() {
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: true }} />
      <Stack.Screen
        name="take-photo"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
