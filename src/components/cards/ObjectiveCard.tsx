import useDeleteDoc from "@/hooks/useDeleteDoc";
import useUpdateDoc from "@/hooks/useUpdateDoc";
import { Objective } from "@/utils/types";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ContextMenu from "../buttons/ContextMenu";
import { getStreak } from "@/utils/calculateStrike";
import { router } from "expo-router";

const ObjectiveCard = ({ objective }: { objective: Objective }) => {
  const [handleDelete, loadingDelete] = useDeleteDoc();
  const [handleUpdate, loadingUpdate] = useUpdateDoc();
  const [menuVisible, setMenuVisible] = useState(false);
  const [faved, setFaved] = useState(objective.principal || false);
  const streak = useMemo(() => getStreak(objective.files), [objective.files]);
  const filesToRender = useMemo(
    () =>
      objective.files.concat(
        Array.from({
          length: objective.totalDays - objective.files.length,
        }).map(() => ({ empty: true }))
      ),
    [objective.files]
  );

  // console.log(filesToRender);

  const closeMenu = () => setMenuVisible(false);
  const openMenu = () => setMenuVisible(true);

  const handleFavorite = () => {
    setFaved(!faved);
    handleUpdate(objective.id, { principal: !faved });
  };

  const handleEdit = () => {
    setMenuVisible(false);
    router.push({
      pathname: "/objectives/edit-objective",
      params: {
        objectiveId: objective.id,
        title: objective.title,
        endingDate: objective.endingDate,
        startingDate: objective.startingDate,
        notificationTime: objective.notificationTime,
      },
    });
  };

  const options = [
    {
      label: faved ? "Destacado" : "Destacar",
      icon: <FontAwesome name={faved ? "star" : "star-o"} size={24} />,
      onPress: handleFavorite,
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
      onPress: () => handleDelete(objective.id),
    },
  ];

  const streakTexts = useMemo(() => {
    if (objective.completed) {
      return "🎉 Objetivo completado!";
    }
    if (streak === 0) {
      return "👀 No has comenzado aun!";
    }
    if (streak === 1) {
      return "💪 Llevas un dia, vamos por mas!";
    }
    return `🔥 Racha de ${streak} dias!`;
  }, [streak]);

  const Card = ({ openMenu }: { openMenu: () => void }) => {
    return (
      <View>
        <TouchableOpacity
          style={{ position: "absolute", right: 16, top: 16, zIndex: 2 }}
          onPress={openMenu}
        >
          <Feather name="sliders" size={24} />
        </TouchableOpacity>
        <View style={styles.cardBody}>
          <Text style={styles.bodyTitle}>
            Comenzado el: {objective.startingDate}
          </Text>
          <FlatList
            contentContainerStyle={{
              paddingHorizontal: 20,
              flexGrow: 1,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filesToRender}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.dot,
                  item.empty && { backgroundColor: "rgba(0, 0, 0, 0.2)" },
                  !item.empty && styles.completedDot,
                ]}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          />

          <Text style={styles.bodySubtitle}>{streakTexts}</Text>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.footerTitle}>{objective.title}</Text>
          <Text style={styles.footerSubtitle}>
            {objective.files.length}/{objective.totalDays} dias
          </Text>
        </View>
      </View>
    );
  };
  return (
    <ContextMenu
      options={options}
      menuVisible={menuVisible}
      closeMenu={closeMenu}
      disabled={loadingDelete || loadingUpdate}
    >
      <Card openMenu={openMenu} />
    </ContextMenu>
  );
};

export default ObjectiveCard;

const styles = StyleSheet.create({
  cardBody: {
    gap: 16,
    // paddingHorizontal: 20,
    paddingVertical: 20,
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
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    paddingHorizontal: 20,
  },
  bodySubtitle: {
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    paddingHorizontal: 20,
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
    // marginHorizontal: 6,
  },
  completedDot: {
    backgroundColor: "#51C878",
  },
});
