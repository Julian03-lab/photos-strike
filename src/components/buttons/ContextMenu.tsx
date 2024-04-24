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
  options: Array<Option | null>;
  menuVisible: boolean;
  closeMenu: () => void;
  children: JSX.Element;
  disabled?: boolean;
};

const ContextMenu = ({
  options,
  menuVisible,
  closeMenu,
  children,
  disabled,
}: ContextMenuProps) => {
  const MENU_BOTTOM_MARGIN = 20;
  const menuRef = useRef<View>(null);
  const [menuHeight, setMenuHeight] = useState(0);
  const [menuMargin, setMenuMargin] = useState({
    marginBottom: MENU_BOTTOM_MARGIN,
    marginTop: 0,
  });
  const viewRef = useRef<View>(null);
  const [positionY, setPositionY] = useState(0);

  const handleLayout = () => {
    if (!menuRef.current) return;
    menuRef.current.measure((_x, _y, _w, h) => {
      if (positionY - 20 > h) {
        setMenuHeight(h);
        setMenuMargin({ marginBottom: MENU_BOTTOM_MARGIN, marginTop: 0 });
      } else {
        setMenuHeight(h);
        setMenuMargin({ marginTop: MENU_BOTTOM_MARGIN, marginBottom: 0 });
      }
    });
  };

  const handleViewLayout = () => {
    if (!viewRef.current) return;
    viewRef.current.measureInWindow((_x, y, _w, _h) => {
      // console.log("pos y: ", y);
      setPositionY(y);
    });
  };

  useEffect(() => {
    handleViewLayout();
  }, [menuVisible]);

  return (
    <View>
      <View ref={viewRef} onLayout={handleViewLayout}>
        {children}
      </View>
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={[styles.centeredView, { justifyContent: "flex-start" }]}>
            <Pressable
              style={{
                position: "relative",
                top:
                  positionY - 20 < menuHeight
                    ? positionY
                    : positionY - menuHeight - MENU_BOTTOM_MARGIN,
              }}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection:
                    positionY - 20 < menuHeight ? "column-reverse" : "column",
                }}
              >
                <View
                  ref={menuRef}
                  onLayout={handleLayout}
                  style={[
                    {
                      position: "relative",
                      backgroundColor: "#fff",
                      borderRadius: 10,
                      alignSelf: "flex-end",
                      width: "100%",
                    },
                    menuMargin,
                  ]}
                >
                  {options.map(
                    (option, index) =>
                      option && (
                        <Fragment key={index}>
                          <TouchableOpacity
                            style={styles.optionButton}
                            activeOpacity={0.5}
                            onPress={option.onPress}
                            disabled={disabled}
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
                      )
                  )}
                </View>
                {children}
              </View>
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
