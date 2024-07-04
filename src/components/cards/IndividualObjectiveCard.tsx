import { Feather, FontAwesome } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { Fragment, useRef, useState } from "react";
import {
  ActivityIndicator,
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
import { Objective } from "@/utils/types";
import useDeleteDoc from "@/hooks/useDeleteDoc";
import useUpdateDoc from "@/hooks/useUpdateDoc";
import { router } from "expo-router";

const IndividualObjectiveCard = ({
  objective,
  isFinished,
}: {
  objective: Objective;
  isFinished?: boolean;
}) => {
  const [handleDelete, loadingDelete] = useDeleteDoc();
  const [handleUpdate, loadingUpdate] = useUpdateDoc();
  const [menuVisible, setMenuVisible] = useState(false);
  const [faved, setFaved] = useState(objective.principal || false);

  const closeMenu = () => setMenuVisible(false);
  const openMenu = () => setMenuVisible(true);

  const handleFavorite = () => {
    setFaved(!faved);
    handleUpdate(objective.id, { principal: !faved });
  };

  const Card = ({ openMenu }: { openMenu: () => void }) => (
    <Pressable style={styles.container} onLongPress={openMenu}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <Text style={styles.title}>{objective.title}</Text>
        <Text style={styles.subtitle}>
          {objective.files.length}/{objective.totalDays} dias
        </Text>
      </View>
      {
        <TouchableOpacity style={{ padding: 20 }} onPress={openMenu}>
          <Feather name="sliders" size={24} />
        </TouchableOpacity>
      }
    </Pressable>
  );

  const handleEdit = () => {
    setMenuVisible(false);
    router.push({
      pathname: "/objectives/edit-objective",
      params: {
        objectiveId: objective.id,
        title: objective.title,
        endingDate: objective.endingDate,
        startingDate: objective.startingDate,
      },
    });
  };

  const goingOptions = [
    {
      label: faved ? "Destacado" : "Destacar",
      icon: <FontAwesome name={faved ? "star" : "star-o"} size={24} />,
      onPress: () => {
        closeMenu();
        handleFavorite();
      },
    },
    !objective.completed
      ? {
          label: "Editar",
          icon: <Feather name={"edit"} size={24} />,
          onPress: handleEdit,
        }
      : null,
    {
      label: loadingDelete ? "Eliminando" : "Eliminar",
      icon: loadingDelete ? (
        <ActivityIndicator size={24} color={"red"} />
      ) : (
        <Feather name={"trash"} size={24} color={"red"} />
      ),
      textColor: "red",
      onPress: () => {
        handleDelete(objective.id);
      },
    },
  ];

  const finishedOptions = [
    {
      label: "Ver resultado",
      icon: <Feather name={"arrow-up-right"} size={24} color={"black"} />,
      onPress: () => router.push(`/home/${objective.id}`),
    },
  ];

  return (
    <ContextMenu
      options={isFinished ? finishedOptions : goingOptions}
      menuVisible={menuVisible}
      closeMenu={closeMenu}
      disabled={loadingDelete || loadingUpdate}
    >
      <Card openMenu={openMenu} />
    </ContextMenu>
  );
};
export default IndividualObjectiveCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CAE7CB",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  activeBorder: {
    borderWidth: 2,
    borderColor: "#51C878",
  },
  finishedBorder: {
    borderWidth: 2,
    borderColor: "red",
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
