import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import AnimatedNumber from "react-native-animated-numbers";
import Animated, { ZoomIn } from "react-native-reanimated";
import Points from "../Points";
import useUpdatePoints from "@/hooks/useUpdatePoints";

const NEW_POINTS = 50;

const CompletedDayPopup = ({ open }: { open: boolean }) => {
  // const [streak, setStreak] = useState(1);
  const [points, setPoints] = useState(0);
  const animationRef = React.useRef<LottieView>(null);
  const { handleUpdate, loading } = useUpdatePoints();

  const closeModal = () => {
    router.setParams({ completed: "false" });
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setPoints(NEW_POINTS);
      }, 1500);
      // setTimeout(() => {
      //   setStreak(2);
      // }, 3000);
    }
  }, [open]);

  const zoom1 = ZoomIn.delay(500);
  const zoom2 = ZoomIn.delay(1000);

  const handleCollect = async () => {
    if (loading) return;
    await handleUpdate(NEW_POINTS);
    animationRef.current?.play();
    setTimeout(() => {
      closeModal();
    }, 2500);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={handleCollect}
    >
      <View
        style={{
          position: "absolute",
          // top: 8,
          // left: 16,
          zIndex: 1,
          backgroundColor: "white",
          paddingVertical: 8,
          paddingHorizontal: 16,
        }}
      >
        <Points />
      </View>

      <View>
        <LottieView
          ref={animationRef}
          speed={1.5}
          style={{
            position: "absolute",
            width: 80,
            height: 180,
            transform: [{ scale: 2 }, { rotate: "-15deg" }],
            zIndex: 20,
            left: 60,
            top: 80,
          }}
          autoPlay={false}
          loop={false}
          source={require("root/assets/animations/moving-coins.json")}
        />
      </View>
      <TouchableWithoutFeedback onPress={handleCollect}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <View
                style={{
                  //   marginTop: 12,
                  //   marginBottom: 24,
                  gap: 4,
                  alignItems: "center",
                }}
              >
                <Animated.Text entering={ZoomIn} style={styles.title}>
                  Felicidades!
                </Animated.Text>
                <Animated.Text entering={zoom1} style={styles.subtitle}>
                  Completaste el primer dia
                </Animated.Text>
              </View>

              {/* Points and streak */}
              <Animated.View style={styles.rewardsContainer} entering={zoom2}>
                <View style={styles.reward}>
                  <LottieView
                    style={{
                      width: 80,
                      height: 100,
                      transform: [{ scale: 2 }],
                      bottom: 12,
                    }}
                    autoPlay
                    source={require("root/assets/animations/coins-2.json")}
                  />
                  <Animated.Text style={styles.rewardText} entering={ZoomIn}>
                    Puntos obtenidos
                  </Animated.Text>
                  <AnimatedNumber
                    animateToNumber={points}
                    fontStyle={{ fontSize: 24 }}
                  />
                </View>
                {/* <View style={styles.reward}>
                  <LottieView
                    style={{ width: 80, height: 100 }}
                    autoPlay
                    loop
                    source={require("root/assets/animations/streak.json")}
                  />
                  <Text style={styles.rewardText}>Racha</Text>
                  <AnimatedNumber
                    // animationDuration={2000}
                    animateToNumber={streak}
                    fontStyle={{ fontSize: 24 }}
                  />
                </View> */}
              </Animated.View>

              {/* Buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  disabled={loading}
                  style={styles.button}
                  activeOpacity={0.8}
                  onPress={handleCollect}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" size={27} />
                  ) : (
                    <Text style={styles.buttonText}>Recolectar puntos</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
    zIndex: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontFamily: "Poppins_600SemiBold",
    color: "#101828",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "Poppins_500Medium",
    color: "#475467",
  },
  rewardsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reward: {
    gap: 0,
    alignItems: "center",
    flex: 1,
  },
  rewardText: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
    color: "#1f1f1f",
  },
  button: {
    backgroundColor: "#51C878",
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 14,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
    gap: 20,
    marginTop: 24,
  },
});

export default CompletedDayPopup;
