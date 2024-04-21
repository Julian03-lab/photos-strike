import { useSession } from "@/context/ctx";
import { Feather } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

const ObjectivesLayout = () => {
  const { session } = useSession();

  return (
    <>
      <Stack
        screenOptions={{
          // headerShown: false,
          headerShadowVisible: false,
          headerTitle: "",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Objetivos",
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={() => console.log("hola")}
              >
                <Feather name="settings" size={24} color="black" />
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Poppins_400Regular",
                }}
              >
                Hola{" "}
                <Text
                  style={{
                    fontFamily: "Poppins_700Bold",
                    textTransform: "capitalize",
                  }}
                >
                  {session?.displayName}
                </Text>
                !
              </Text>
            ),
          }}
        />
        <Stack.Screen
          name="new-objective"
          options={{
            title: "Nuevo Objetivo",
            headerLeft: () => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => router.push("/(main)/objectives/")}
                >
                  <Feather name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Poppins_500Medium",
                  }}
                >
                  Nuevo Objetivo
                </Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="edit-objective"
          options={{
            title: "Editar Objetivo",
            headerLeft: () => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => router.push("/(main)/objectives/")}
                >
                  <Feather name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Poppins_500Medium",
                  }}
                >
                  Editar Objetivo
                </Text>
              </View>
            ),
          }}
        />
      </Stack>
      <Toast />
    </>
  );
};
export default ObjectivesLayout;
