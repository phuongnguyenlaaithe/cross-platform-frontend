import React from "react";
import styles from "../screens/Styles";
import Icon from "react-native-vector-icons/MaterialIcons";

import { TouchableOpacity, Text } from "react-native";

const CommonButton = ({
  title,
  onPress,
  size = "Medium",
  type = "Primary",
  icon,
}) => {
  const iconStyle = `icon${size}`;
  const buttonStyle = `button${type}${size}`;
  const buttonTextStyle = `button${type}${size}Text`;

  return (
    <TouchableOpacity style={styles[buttonStyle]} onPress={onPress}>
      {icon && (
        <Icon
          name={icon}
          size={24}
          color={styles[buttonTextStyle].color}
          style={styles[iconStyle]}
        />
      )}
      <Text style={styles[buttonTextStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CommonButton;
