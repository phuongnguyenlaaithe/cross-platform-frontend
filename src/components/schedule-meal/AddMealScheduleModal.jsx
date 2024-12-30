import React, { useState } from "react";
import {
  Modal,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { addNewMealPlanAPI } from "../../redux/apiRequests/mealPlanRequest";
import { TextInput } from "react-native-paper";
import style from "../../screens/Styles";

const statusOptions = ["DONE", "NOT_PASS_YET"];

const AddMealScheduleModal = ({ modalVisible, setModalVisible, currentDate }) => {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("DONE");
  const [selectedMeal, setSelectedMeal] = useState("");
  const dispatch = useDispatch();

  const foodItems = useSelector((state) => state.food.allFood);
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser?.accessToken
  );

  const toggleFoodSelection = (food) => {
    setSelectedFoods((prev) => {
      if (prev.includes(food.id)) {
        return prev.filter((id) => id !== food.id);
      } else {
        return [...prev, food.id];
      }
    });
  };

  const handleSaveMeal = async () => {
    await addNewMealPlanAPI(accessToken, dispatch, {
      name: selectedMeal,
      timestamp: currentDate,
      foodIds: selectedFoods,
      status: selectedStatus,
    });
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

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
              Add Meal Schedule
            </Text>
            <TouchableOpacity onPress={handleSaveMeal}>
              <Text
                style={{
                  color: theme.colors.primary,
                  fontWeight: "bold",
                  fontSize: 16,
                  marginTop: 5,
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={[styles.input, { marginBottom: theme.spacing.medium, height: 1 }]}
            placeholder="Meal Name"
            value={selectedMeal}
            onChangeText={setSelectedMeal}
          />

          <Text style={styles.label}>Food:</Text>
          <FlatList
            data={foodItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => toggleFoodSelection(item)}
                style={[
                  styles.foodOption,
                  selectedFoods.includes(item.id) && styles.selectedOption,
                ]}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
            style={styles.foodList}
          />

          <Text style={styles.label}>Status:</Text>
          {statusOptions.map((status) => (
            <TouchableOpacity
              key={status}
              onPress={() => setSelectedStatus(status)}
              style={[
                styles.statusOption,
                selectedStatus === status && styles.selectedOption,
              ]}
            >
              <Text>{status}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: theme.spacing.medium,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    maxHeight: "80%",
  },
  title2: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: theme.spacing.medium,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: theme.spacing.small,
  },
  foodList: {
    maxHeight: 150,
    marginVertical: theme.spacing.small,
  },
  foodOption: {
    padding: theme.spacing.small,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: theme.spacing.small,
  },
  statusOption: {
    padding: theme.spacing.small,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginVertical: theme.spacing.small,
  },
  selectedOption: {
    borderColor: theme.colors.primary,
    backgroundColor: "#f0f8ff",
  },
});

export default AddMealScheduleModal;