import { Feather, FontAwesome } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { Fragment, useRef, useState } from "react";
import {
  GestureResponderEvent,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ContextMenu from "../buttons/ContextMenu";

const IndividualObjectiveCard = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [faved, setFaved] = useState(false);
  const cardRef = useRef<View>(null);
  const [positionY, setPositionY] = useState(0);

  const closeMenu = () => setMenuVisible(false);
  const openMenu = () => {
    if (!cardRef.current) return setMenuVisible(!menuVisible);
    cardRef.current.measureInWindow((_x, y) => {
      setPositionY(y);
      setMenuVisible(!menuVisible);
    });
  };

  const handleFav = () => {
    setFaved(!faved);
  };

  const Card = ({
    openMenu,
    cardRef,
  }: {
    openMenu: () => void;
    cardRef?: React.RefObject<View>;
  }) => (
    <Pressable style={styles.container} onLongPress={openMenu} ref={cardRef}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {
        <TouchableOpacity style={{ padding: 20 }} onPress={openMenu}>
          <Feather name="sliders" size={24} />
        </TouchableOpacity>
      }
    </Pressable>
  );

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
      icon: <Feather name={"trash"} size={24} color={"red"} />,
      textColor: "red",
    },
  ];

  return (
    <ContextMenu
      options={options}
      menuVisible={menuVisible}
      closeMenu={closeMenu}
      underMenu={<Card openMenu={openMenu} />}
      positionY={positionY}
    >
      <Card openMenu={openMenu} cardRef={cardRef} />
    </ContextMenu>
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
    width: "100%",
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
