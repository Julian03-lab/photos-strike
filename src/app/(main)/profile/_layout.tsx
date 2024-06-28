import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Mi perfil",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          title: "Configurar notificaciones",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
