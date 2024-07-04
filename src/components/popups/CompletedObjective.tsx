import { useObjectivesStore } from "@/context/store";
import useUpdateDoc from "@/hooks/useUpdateDoc";
import { getBestStreak } from "@/utils/getBestStrike";
import { Objective } from "@/utils/types";
import { Link, router } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";

const CompletedObjective = ({
  objectiveId,
}: {
  objectiveId: string | undefined;
}) => {
  if (!objectiveId) return null;

  const [modalVisible, setModalVisible] = useState(true);
  const [updateDoc] = useUpdateDoc();
  const animationRef = React.useRef<LottieView>(null);
  const { files, totalDays, title } = useObjectivesStore().getObjective(
    objectiveId
  ) as Objective;
  const streak = getBestStreak(files);

  const handleCollect = async () => {
    setModalVisible(!modalVisible);
    router.push(`/home/${objectiveId}`);
    await updateDoc(objectiveId, { viewed: true, completed: true });
  };

  const handleDismiss = async () => {
    setModalVisible(!modalVisible);
    await updateDoc(objectiveId, { viewed: true, completed: true });
  };

  useEffect(() => {
    setTimeout(() => {
      animationRef.current?.play();
    }, 500);
  }, []);

  const zoom1 = ZoomIn.delay(1200);
  const zoom2 = ZoomIn.delay(1700);
  const zoom3 = ZoomIn.delay(2200);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleDismiss}
    >
      <TouchableWithoutFeedback onPress={handleDismiss}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <Animated.Text entering={ZoomIn} style={styles.title}>
                Que alegria!
              </Animated.Text>

              <Animated.View style={styles.rewardsContainer}>
                <View style={styles.reward}>
                  <LottieView
                    style={{
                      width: 80,
                      height: 100,
                      transform: [{ scale: 2.5 }],
                      bottom: 20,
                    }}
                    ref={animationRef}
                    source={require("root/assets/animations/win.json")}
                  />
                  {/* <Animated.Text style={styles.rewardText} entering={ZoomIn}>
                    Puntos obtenidos
                  </Animated.Text>
                  <AnimatedNumber
                    animateToNumber={275}
                    fontStyle={{ fontSize: 24 }}
                  /> */}
                </View>
              </Animated.View>
              <View
                style={{
                  flexDirection: "row",
                  // gap: 4,
                  justifyContent: "center",
                }}
              >
                <Animated.Text entering={zoom1} style={styles.subtitle}>
                  Tras{" "}
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "Poppins_700Bold",
                      color: "#51C878",
                    }}
                  >
                    {totalDays}
                  </Text>{" "}
                  dias llegaste al final de "
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "Poppins_700Bold",
                      color: "#51C878",
                    }}
                  >
                    {title}
                  </Text>
                  "
                </Animated.Text>
              </View>
              <Animated.View
                entering={zoom2}
                style={{
                  flexDirection: "row",
                  gap: 4,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 16,
                }}
              >
                <Text style={styles.subtitle}>Tu mejor racha fue de</Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Poppins_700Bold",
                    color: "#51C878",
                  }}
                >
                  {streak} {streak === 1 ? "dia" : "dias"}
                </Text>
                <LottieView
                  style={{
                    width: 20,
                    height: 20,
                    transform: [{ scale: 2 }],
                    bottom: 10,
                    left: 2,
                  }}
                  autoPlay
                  loop
                  source={require("root/assets/animations/streak.json")}
                />
              </Animated.View>

              {/* Buttons */}
              <Animated.View style={styles.buttonContainer} entering={zoom3}>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.8}
                  onPress={handleCollect}
                >
                  <Text style={styles.buttonText}>Ver el resultado</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={handleDismiss}>
                  <Text style={styles.skipButtonText}>Cerrar</Text>
                </TouchableOpacity>
              </Animated.View>
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
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
    color: "#475467",
    textAlign: "center",
  },
  rewardsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
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
  skipButtonText: {
    color: "#51C878",
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

export default CompletedObjective;
