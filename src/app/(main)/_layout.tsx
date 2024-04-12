import { Tabs, useSegments } from "expo-router";

const MainLayout = () => {
  const segment = useSegments();

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarStyle: {
            display: segment.length === 3 ? "none" : "flex",
          },
        }}
      />
      <Tabs.Screen name="progress" options={{ title: "Progreso" }} />
      <Tabs.Screen name="objectives" options={{ headerShown: false }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil" }} />
    </Tabs>
  );
};
export default MainLayout;
