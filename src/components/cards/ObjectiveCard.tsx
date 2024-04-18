import useDeleteDoc from "@/hooks/useDeleteDoc";
import useUpdateDoc from "@/hooks/useUpdateDoc";
import { Objective } from "@/utils/types";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ContextMenu from "../buttons/ContextMenu";

const dots = Array.from({ length: 12 }, (_, i) => i);

const ObjectiveCard = ({ objective }: { objective: Objective }) => {
  const [handleDelete, loadingDelete] = useDeleteDoc();
  const [handleUpdate, loadingUpdate] = useUpdateDoc();
  const [menuVisible, setMenuVisible] = useState(false);
  const [faved, setFaved] = useState(objective.principal || false);
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

  const handleFavorite = () => {
    setFaved(!faved);
    handleUpdate(objective.id, { principal: !faved });
  };

  const options = [
    {
      label: faved ? "Destacado" : "Destacar",
      icon: <FontAwesome name={faved ? "star" : "star-o"} size={24} />,
      onPress: handleFavorite,
    },
    {
      label: "Editar",
      icon: <Feather name={"edit"} size={24} />,
    },
    {
      label: loadingDelete ? "Eliminando" : "Eliminar",
      icon: loadingDelete ? (
        <ActivityIndicator size={24} color={"red"} />
      ) : (
        <Feather name={"trash"} size={24} color={"red"} />
      ),
      textColor: "red",
      onPress: () => handleDelete(objective.id),
    },
  ];

  const Card = ({
    openMenu,
    cardRef,
  }: {
    openMenu: () => void;
    cardRef?: React.RefObject<View>;
  }) => {
    return (
      <Pressable onLongPress={openMenu} ref={cardRef}>
        <View style={styles.cardBody}>
          {/* <Text style={styles.bodyTitle}>
          Comenzado el: {objective.startingDate}
        </Text> */}
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              marginTop: 20,
            }}
          >
            {dots.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i < 4 && styles.completedDot]}
              ></View>
            ))}
          </View>
          <Text style={styles.bodySubtitle}>🔥 Racha de 4 dias</Text>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.footerTitle}>{objective.title}</Text>
          <Text style={styles.footerSubtitle}>
            {objective.files.length}/{objective.totalDays} dias
          </Text>
        </View>
      </Pressable>
    );
  };
  return (
    <ContextMenu
      options={options}
      menuVisible={menuVisible}
      closeMenu={closeMenu}
      underMenu={<Card openMenu={openMenu} />}
      positionY={positionY}
      disabled={loadingDelete || loadingUpdate}
    >
      <Card openMenu={openMenu} cardRef={cardRef} />
    </ContextMenu>
  );
};

export default ObjectiveCard;

const styles = StyleSheet.create({
  cardBody: {
    gap: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#CAE7CB",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    overflow: "hidden",
  },
  cardFooter: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#51C878",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bodyTitle: {
    fontSize: 20,
    fontFamily: "Poppins_300Light",
  },
  bodySubtitle: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
  },
  footerTitle: {
    fontSize: 18,
    fontFamily: "Poppins_500Medium",
  },
  footerSubtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "rgba(0, 0, 0, 0.5)",
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  completedDot: {
    backgroundColor: "#51C878",
  },
});
