import { Feather, Ionicons } from "@expo/vector-icons";
import { Tabs, useNavigation, useSegments } from "expo-router";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
  Animated,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSession } from "@/context/ctx";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import AnimatedNumber from "react-native-animated-numbers";
import Points from "@/components/Points";

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const { navigate } = useNavigation();
  const segment = useSegments();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setVisible(false);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setVisible(true);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  if (
    segment.length === 3 &&
    (segment[2] === "take-photo" || segment[2] === "modal")
  ) {
    return null;
  }

  return (
    visible && (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          padding: 10,
          justifyContent: "space-around",
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigate(route.name as never);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
              key={route.name}
              activeOpacity={0.5}
            >
              {isFocused && (
                <View
                  style={{
                    height: 50,
                    width: 50,
                    backgroundColor: "#000",
                    borderRadius: 100,
                    position: "absolute",
                    top: 0,
                  }}
                />
              )}
              <Feather
                name={options.title as any}
                size={24}
                color={isFocused ? "#fff" : "#000"}
                style={isFocused && { position: "absolute", top: 12 }}
              />
              <Text style={!isFocused ? styles.text : { color: "transparent" }}>
                {label as string}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    )
  );
};

const MainLayout = () => {
  const { session } = useSession();
  const segment = useSegments();

  // console.log(segment);

  return (
    <>
      <StatusBar style="auto" />
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerTitle: "",
          headerStyle: {
            shadowColor: "transparent",
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => console.log("hola")}
            >
              <Feather name="settings" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View
              style={{
                marginLeft: 16,
              }}
            >
              <Points />
            </View>
          ),
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: "Inicio",
            title: "home",
            headerShown: !["[objectiveId]", "take-photo", "modal"].includes(
              segment[2]
            ),
          }}
        />
        <Tabs.Screen
          name="objectives"
          options={{
            tabBarLabel: "Objetivos",
            title: "target",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: "Perfil",
            title: "user",
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  );
};
export default MainLayout;

const styles = StyleSheet.create({
  text: {
    color: "#000",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },
});
