import { useSession } from "@/context/ctx";
import LottieView from "lottie-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const UnlockButton = ({
  onPress,
  loading,
}: {
  onPress: () => void;
  loading: boolean;
}) => {
  const { session } = useSession();

  return (
    <View style={styles.container}>
      <View style={styles.dialog}>
        <Text style={styles.title}>¡La imagen esta bloqueada!</Text>
        <Text style={styles.subtitle}>
          Desbloquea esta imagen ahora mismo con{" "}
          <Text
            style={{
              fontFamily: "Poppins_700Bold",
              color: "#51C878",
            }}
          >
            150
          </Text>{" "}
          puntos.
        </Text>
        {session?.points && session.points >= 150 ? (
          <TouchableOpacity
            style={styles.button}
            onPress={onPress}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Desbloquear ahora</Text>
            <LottieView
              source={require("root/assets/animations/single-coin.json")}
              autoPlay
              speed={0.5}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} disabled>
            <Text style={styles.buttonText}>
              Necesitas {150 - (session?.points || 0)} puntos más
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default UnlockButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    zIndex: 1,
    paddingHorizontal: 20,
  },
  dialog: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 28,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#51C878",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    textAlign: "center",
    top: 2,
  },
});
