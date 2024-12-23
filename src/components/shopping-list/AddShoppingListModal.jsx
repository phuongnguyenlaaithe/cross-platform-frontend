import React from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import styles from "../../screens/Styles";
import theme from "../../theme";

const AddShoppingListModal = ({ modalVisible, setModalVisible, newShoppingList, setNewShoppingList, handleAddShoppingList }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: theme.spacing.medium }}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>Cancel</Text>
            </TouchableOpacity>
            <Text style={[styles.title2, { textAlign: 'center' }]}>Add Shopping List</Text>
            <TouchableOpacity onPress={handleAddShoppingList}>
              <Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>Add</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={[styles.input, { marginBottom: theme.spacing.medium }]}
            placeholder="Name"
            value={newShoppingList.name}
            onChangeText={(text) => setNewShoppingList({ ...newShoppingList, name: text })}
          />

          <TextInput
            style={[styles.input, { marginBottom: theme.spacing.medium }]}
            placeholder="Note"
            value={newShoppingList.note}
            onChangeText={(text) => setNewShoppingList({ ...newShoppingList, note: text })}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AddShoppingListModal;