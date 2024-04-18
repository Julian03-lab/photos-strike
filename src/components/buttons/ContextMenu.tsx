import { Fragment, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type Option = {
  label: string;
  icon?: JSX.Element;
  onPress?: () => void;
  textColor?: string;
};

type ContextMenuProps = {
  options: Option[];
  menuVisible: boolean;
  closeMenu: () => void;
  children: JSX.Element;
  underMenu?: JSX.Element;
  positionY?: number;
};

const ContextMenu = ({
  options,
  menuVisible,
  closeMenu,
  children,
  underMenu,
  positionY,
}: ContextMenuProps) => {
  // const MENU_HEIGHT = 183;
  const MENU_BOTTOM_MARGIN = 20;

  const menuRef = useRef<View>(null);
  const [menuHeight, setMenuHeight] = useState(0);

  const handleLayout = () => {
    if (!menuRef.current) return;
    menuRef.current.measure((_x, _y, _w, h) => {
      console.log("3: ", h);
      setMenuHeight(h + MENU_BOTTOM_MARGIN);
    });
  };

  return (
    <View>
      {children}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View
            style={[
              styles.centeredView,
              underMenu && positionY
                ? { justifyContent: "flex-start" }
                : { justifyContent: "center" },
            ]}
          >
            <Pressable
              style={{
                position: "relative",
                top: underMenu && positionY ? positionY - menuHeight : 0,
              }}
            >
              <View
                ref={menuRef}
                onLayout={handleLayout}
                style={{
                  position: "relative",
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  marginBottom: MENU_BOTTOM_MARGIN,
                  alignSelf: "flex-end",
                }}
              >
                {options.map((option, index) => (
                  <Fragment key={index}>
                    <TouchableOpacity
                      style={styles.optionButton}
                      activeOpacity={0.5}
                      onPress={option.onPress}
                    >
                      <Text
                        style={[
                          styles.option,
                          option.textColor
                            ? { color: option.textColor }
                            : { color: "#000" },
                        ]}
                      >
                        {option.label}
                      </Text>
                      {option.icon}
                    </TouchableOpacity>
                  </Fragment>
                ))}
              </View>
              {underMenu || children}
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
export default ContextMenu;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    paddingHorizontal: 20,
  },
  option: {
    fontSize: 18,
    fontFamily: "Poppins_500Medium",
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
