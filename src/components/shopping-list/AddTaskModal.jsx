import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Iconicons from 'react-native-vector-icons/Ionicons';
import theme from '../../theme/index';
import styles from "../../screens/Styles";



const AddTaskModal = ({ foods, modalVisible, setModalVisible, newTask, setNewTask, handleAddTask, setShowFoodModal }) => {
  const food = newTask.foodId ? foods.find(food => food.id === newTask.foodId) : null;
  const unit = food ? food.unit : null;
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: theme.spacing.medium }}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>Cancel</Text>
            </TouchableOpacity>
            <Text style={[styles.title2, { textAlign: 'center' }]}>Add Task</Text>
            <TouchableOpacity onPress={handleAddTask}>
              <Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>Add</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => { setModalVisible(false); setShowFoodModal(true); }}
            style={[styles.input, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.medium }]}
          >
            <Text>{newTask.foodId ? `${food.name}` : "Select Food"}</Text>
            <Iconicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.medium }}>
            <TextInput
              style={{
                backgroundColor: theme.colors.white,
                paddingHorizontal: theme.spacing.medium,
                paddingVertical: theme.spacing.small,
                borderRadius: theme.borderRadius.full,
                width: "30%",
                ...theme.shadows.button,
                height: 40,
              }}
              placeholder="Quantity"
              value={newTask.quantity ? newTask.quantity.toString() : ""}
              onChangeText={(text) => setNewTask({ ...newTask, quantity: parseInt(text) })}
              keyboardType="numeric"
              editable={!!newTask.foodId}
            />
            {unit && (
              <Text style={{
                backgroundColor: theme.colors.bgLight,
                paddingHorizontal: theme.spacing.medium,
                paddingVertical: theme.spacing.small,
                borderRadius: theme.borderRadius.full,
                ...theme.shadows.button,
                marginLeft: theme.spacing.medium,
                height: 40,
              }}>{unit.name}</Text>)}
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", marginLeft: theme.spacing.small, marginBottom: theme.spacing.medium }}>
            <Text>Deadline: </Text>
            <DateTimePicker
              value={newTask.deadline}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  setNewTask({ ...newTask, deadline: selectedDate });
                }
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddTaskModal;