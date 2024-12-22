import {
  Modal,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import theme from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { addNewMealPlanAPI } from "../../redux/apiRequests/mealPlanRequest";
import { TextInput } from "react-native-paper";

const statusOptions = ["DONE", "NOT_PASS_YET"];

const AddMealScheduleModal = ({ currentDate, onClose }) => {
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
    onClose();
  };

  return (
    <View style={scheduleMealStyle.modalOverlay}>
      <View style={scheduleMealStyle.modalContent}>
        <Text style={scheduleMealStyle.modalTitle}>Add Meal Schedule</Text>
        <Text style={scheduleMealStyle.label}>Meal:</Text>
        <TextInput
          value={selectedMeal}
          onChangeText={setSelectedMeal}
          style={{ marginBottom: theme.spacing.small, height: 40 }}
        />
        {/* Food Selection */}
        <Text style={scheduleMealStyle.label}>Food:</Text>
        <FlatList
          data={foodItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => toggleFoodSelection(item)}
              style={[
                scheduleMealStyle.foodOption,
                selectedFoods.includes(item.id) &&
                  scheduleMealStyle.selectedOption,
              ]}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          style={scheduleMealStyle.foodList}
        />

        {/* Status Selection */}
        <Text style={scheduleMealStyle.label}>Status:</Text>
        {statusOptions.map((status) => (
          <TouchableOpacity
            key={status}
            onPress={() => setSelectedStatus(status)}
            style={[
              scheduleMealStyle.statusOption,
              selectedStatus === status && scheduleMealStyle.selectedOption,
            ]}
          >
            <Text>{status}</Text>
          </TouchableOpacity>
        ))}

        {/* Save Button */}
        <TouchableOpacity
          style={scheduleMealStyle.saveButton}
          onPress={handleSaveMeal}
        >
          <Text style={scheduleMealStyle.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const scheduleMealStyle = StyleSheet.create({
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
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: theme.spacing.medium,
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
  saveButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.small,
    borderRadius: 5,
    marginTop: theme.spacing.medium,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AddMealScheduleModal;
