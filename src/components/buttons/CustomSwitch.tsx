import { Switch, StyleSheet, Text, View } from "react-native";
import FlatButton from "./FlatButton";

const CustomSwitch = ({ value, handlePress, children, ...props }: any) => (
  <FlatButton
    onPress={handlePress}
    activeOpacity={1}
    rightIcon={
      <Switch
        trackColor={{ true: "#51C878", false: "#CAE7CB" }}
        thumbColor={"#fff"}
        onValueChange={handlePress}
        value={value}
        style={{
          transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
          marginRight: 8,
        }}
        {...props}
      />
    }
  >
    {children}
  </FlatButton>
);

export default CustomSwitch;
