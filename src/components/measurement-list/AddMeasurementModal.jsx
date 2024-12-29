import React from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from '../../screens/Styles';
import theme from '../../theme/index';

const AddMeasurementModal = ({
  modalVisible,
  setModalVisible,
  newMeasurement,
  setNewMeasurement,
  handleAddMeasurement,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: theme.spacing.medium,
            }}
          >
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text
                style={{
                  color: theme.colors.primary,
                  fontWeight: "bold",
                  fontSize: 16,
                  marginTop: 5,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <Text style={[styles.title2, { textAlign: "center" }]}>
              Add Measurement
            </Text>
            <TouchableOpacity onPress={handleAddMeasurement}>
              <Text
                style={{
                  color: theme.colors.primary,
                  fontWeight: "bold",
                  fontSize: 16,
                  marginTop: 5,
                }}
              >
                Add
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={[styles.input, { marginBottom: theme.spacing.medium }]}
            placeholder="Measurement Name"
            value={newMeasurement.name}
            onChangeText={(text) =>
              setNewMeasurement({ ...newMeasurement, name: text })
            }
          />
        </View>
      </View>
    </Modal>
  );
};

export default AddMeasurementModal;