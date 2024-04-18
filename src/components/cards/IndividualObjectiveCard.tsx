import { Feather, FontAwesome } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { Fragment, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Card = ({ openMenu }) => (
  <View style={styles.container}>
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        paddingHorizontal: 16,
      }}
    >
      <Text style={styles.title}>Cambio fisico</Text>
      <Text style={styles.subtitle}>4/30 dias</Text>
    </View>
    <TouchableOpacity style={{ padding: 20 }} onPress={openMenu}>
      <Feather name="sliders" size={24} />
    </TouchableOpacity>
  </View>
);

const IndividualObjectiveCard = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const [faved, setFaved] = useState(false);

  const handleFav = () => {
    setFaved(!faved);
  };

  const options = [
    {
      label: faved ? "Destacado" : "Destacar",
      icon: <FontAwesome name={faved ? "star" : "star-o"} size={24} />,
      onPress: handleFav,
    },
    {
      label: "Editar",
      icon: <Feather name={"edit"} size={24} />,
    },
    {
      label: "Eliminar",
      icon: <Feather name={"trash"} size={24} />,
    },
  ];

  return (
    <View>
      <Card openMenu={openMenu} />
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback>
              <View>
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "#fff",
                    right: 0,
                    bottom: "100%",
                    borderRadius: 10,
                    marginBottom: 20,
                  }}
                >
                  {options.map((option, index) => (
                    <Fragment key={index}>
                      <TouchableOpacity
                        style={styles.optionButton}
                        activeOpacity={0.5}
                        onPress={option.onPress}
                      >
                        <Text style={styles.option}>{option.label}</Text>
                        {option.icon}
                      </TouchableOpacity>
                      {index < options.length - 1 && (
                        <View
                          style={{
                            width: "100%",
                            height: 1,
                            backgroundColor: "#ccc",
                          }}
                        />
                      )}
                    </Fragment>
                  ))}
                </View>
                <Card openMenu={openMenu} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
export default IndividualObjectiveCard;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#51C878",
    // padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontFamily: "Poppins_500Medium",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "rgba(0, 0, 0, 0.5)",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
    paddingHorizontal: 20,
  },
  option: {
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
  },
  optionButton: {
    paddingVertical: 12,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
});
