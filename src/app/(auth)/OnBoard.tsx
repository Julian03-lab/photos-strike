import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CarouselPagination from "@/components/onboarding/CarouselPagination";
import OnBoardComponent from "@/components/onboarding/OnBoardComponent";
import { ProgressImage } from "root/assets/svgs/progressImage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MetaImage } from "root/assets/svgs/metaImage";
import { StartImage } from "root/assets/svgs/startImage";
import { router } from "expo-router";

type SliderData = {
  image: React.JSX.Element;
  title: string;
  subtitle: string;
  index: number;
}[];

const sliderData: SliderData = [
  {
    index: 1,
    image: <ProgressImage height={400} />,
    title: "¡Captura tu progreso!",
    subtitle:
      "¿Quieres ver tu cuerpo transformarse, plantas evolucionar o mascotas crecer? ¡Visualize te ayuda a registrarlo y crea un timelapse inspirador!",
  },
  {
    index: 2,
    image: <MetaImage height={250} />,
    title: "Elige tu meta.",
    subtitle:
      "Define días de reto y frecuencia de fotos. ¡Desde 1 día hasta 1 año! Fotos diarias, semanales o mensuales.",
  },
  {
    index: 3,
    image: <StartImage height={400} />,
    title: "¡Empieza tu viaje!",
    subtitle:
      " ¡Toma tu primera foto y observa cómo tu progreso cobra vida. ¡No te rindas, los resultados valen la pena!",
  },
];

const OnBoardScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slidesRef = useRef<FlatList>(null);
  const handleOnViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any }) => {
      setActiveIndex(viewableItems[0].index);
    }
  ).current;

  const viewConfigRef = useRef({ itemVisiblePercentThreshold: 50 }).current;

  const updateViewedOnboarding = async () => {
    try {
      await AsyncStorage.setItem("@viewedOnboarding", "true");
    } catch (e) {
      console.log(e);
    }
  };

  const scrollTo = (direction: "back" | "next") => {
    if (slidesRef.current === null) return;

    if (direction === "back") {
      slidesRef.current.scrollToIndex({ index: activeIndex - 1 });
      return;
    }
    if (activeIndex < sliderData.length - 1) {
      slidesRef.current.scrollToIndex({ index: activeIndex + 1 });
    } else {
      updateViewedOnboarding();
      router.replace("/(auth)/turn-notifications");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ flexGrow: 0 }}
        data={sliderData}
        renderItem={({ item }) => (
          <OnBoardComponent
            image={item.image}
            title={item.title}
            subtitle={item.subtitle}
          />
        )}
        keyExtractor={(item) => item.index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewConfigRef}
        ref={slidesRef}
      />
      <CarouselPagination SliderData={sliderData} activeIndex={activeIndex} />
      <View style={styles.buttonContainer}>
        {activeIndex > 0 ? (
          <TouchableHighlight
            onPress={() => scrollTo("back")}
            underlayColor="transparent"
            activeOpacity={0.5}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
          </TouchableHighlight>
        ) : (
          <View />
        )}
        <TouchableHighlight
          onPress={() => scrollTo("next")}
          underlayColor="transparent"
          activeOpacity={0.5}
        >
          {activeIndex === sliderData.length - 1 ? (
            <View>
              <MaterialCommunityIcons name="check" size={24} color="black" />
            </View>
          ) : (
            <View>
              <MaterialCommunityIcons
                name="arrow-right"
                size={24}
                color="black"
              />
            </View>
          )}
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default OnBoardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 36,
    paddingVertical: 48,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 44,
    alignItems: "center",
    width: "100%",
  },
});
