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
import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { useSession } from "@/context/ctx";
import { MetaImage } from "root/assets/svgs/metaImage";
import { StartImage } from "root/assets/svgs/startImage";

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
  const slidesRef = useRef(null);
  const { signIn, loading } = useSession();
  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    setActiveIndex(viewableItems[0].index);
  }).current;

  const viewConfigRef = useRef({ itemVisiblePercentThreshold: 50 }).current;

  const updateViewedOnboarding = async () => {
    try {
      await AsyncStorage.setItem("@viewedOnboarding", "true");
    } catch (e) {
      console.log(e);
    }
  };

  const scrollTo = (direction: "back" | "next") => {
    if (direction === "back") {
      slidesRef.current.scrollToIndex({ index: activeIndex - 1 });
      return;
    }
    if (activeIndex < sliderData.length - 1) {
      slidesRef.current.scrollToIndex({ index: activeIndex + 1 });
    } else {
      updateViewedOnboarding();
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
        {activeIndex !== sliderData.length - 1 ? (
          <TouchableOpacity
            onPress={() => scrollTo("next")}
            activeOpacity={0.8}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        ) : (
          //   <GoogleSigninButton
          //     size={GoogleSigninButton.Size.Wide}
          //     color={GoogleSigninButton.Color.Dark}
          //     onPress={signIn}
          //   />
          <TouchableOpacity
            onPress={() => scrollTo("next")}
            activeOpacity={0.8}
            style={styles.button}
          >
            <SimpleLineIcons name="social-google" size={24} color="white" />
            <Text style={styles.buttonText}>Ingresar con Google</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default OnBoardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    gap: 36,
  },
  button: {
    backgroundColor: "#51c878",
    borderRadius: 20,
    paddingVertical: 16,
    // paddingHorizontal: 42,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    paddingHorizontal: 44,
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
});
