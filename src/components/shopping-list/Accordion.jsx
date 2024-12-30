import React, { useState } from "react";
import theme from "../../theme";
import styles from "../../screens/Styles";
import Icon from "react-native-vector-icons/MaterialIcons";

import { View, Text, TouchableOpacity } from "react-native";

const Accordion = ({ title, children, handleDelete, isGroupAdmin, isShoppingListOfGroup }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleExpand}>
        <View
          style={[styles.headerItem, { marginBottom: theme.spacing.small }]}
        >
          <Text style={styles.title2}>{title}</Text>
            {(isShoppingListOfGroup === false || isGroupAdmin === true) && (
            <TouchableOpacity onPress={handleDelete}>
              <Icon name="delete" size={24} color={theme.colors.textSecondary} />
            </TouchableOpacity>
            )}
        </View>
      </TouchableOpacity>
      {expanded && (
        <View>
          <View style={[styles.divider, { opacity: 0.5 }]} />
          <View style={styles.item}>{children}</View>
        </View>
      )}
    </View>
  );
};

export default Accordion;