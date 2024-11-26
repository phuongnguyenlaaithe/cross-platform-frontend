import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo for icons
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from 'expo-image-picker';
import { getAllFoods, addNewFood, deleteFood } from "../redux/apiRequests/foodRequest";
import { getAllCategory } from "../redux/apiRequests/categoryRequest";
import { getAllMeasurement } from "../redux/apiRequests/measurementRequest";
import styles from "./Styles";
import theme from "../theme/index";
import { AppHeader } from "../components";
import { Picker } from '@react-native-picker/picker';


const FoodList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [newFood, setNewFood] = useState({
    name: "",
    category: "",
    unit: "",
    image: null,
    imageUri: "",
  });

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.login.currentUser?.accessToken);
  const foodItems = useSelector((state) => state.food.allFood);
  const categories = useSelector((state) => state.category.allCategory);
  const measurements = useSelector((state) => state.measurement.allMeasurement);
  const isFetching = useSelector((state) => state.food.isFetching);

  useEffect(() => {
    if (accessToken) {
      getAllFoods(accessToken, dispatch);
      getAllCategory(accessToken, dispatch);
      getAllMeasurement(accessToken, dispatch);
    }
  }, [accessToken, dispatch]);

  const filteredFoodItems = foodItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleAddFood = async () => {
    if (newFood.name && newFood.category && newFood.unit && newFood.image) {
      try {
        const formData = new FormData();
        formData.append('name', newFood.name);
        formData.append('category', newFood.category);
        formData.append('unit', newFood.unit);
        formData.append('image', newFood.image); 
  
        await addNewFood(accessToken, dispatch, formData);
  
        // Reset form sau khi thêm món ăn
        setNewFood({ name: "", category: "", unit: "", image: null });
        setModalVisible(false);
      } catch (error) {
        console.error("Error", error.message);
        alert("Error: " + error.message);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };
  

  const handleDeleteFood = async (id) => {
    try {
      await deleteFood(accessToken, dispatch, id);
    } catch (error) {
      Alert.alert("Error", "An error occurred while deleting the food.");
    }
  };

  const handleImageUpload = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setNewFood({ ...newFood, image: result.assets[0].file, imageUri: result.assets[0].uri });
    }
  };

  return (
    <View style={styles.root}>
      <AppHeader navigation={navigation} showBackButton={true} />
      <View style={styles.container}>
        {/* Search Bar */}
        <View
          style={[styles.headerItem, { marginBottom: theme.spacing.large }]}
        >
          {/* <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
          /> */}
          <TouchableOpacity
            style={styles.buttonPrimaryMedium}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonPrimaryMediumText}>Add Food</Text>
          </TouchableOpacity>
        </View>

        {/* Food List */}
        {isFetching ? (
          
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={filteredFoodItems}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: theme.spacing.large }}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.card,
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    padding: theme.spacing.medium,
                    marginBottom: theme.spacing.medium, // Added spacing between cards
                  },
                ]}
              >
                {item.imageURL && (
                  <Image
                    source={{ uri: item.imageURL }}
                    style={{ width: 50, height: 50, marginRight: theme.spacing.medium }}
                  />
                )}
                <View style={{ flex: 1 }}>
                  <Text style={[styles.textPrimary, { fontWeight: "bold" }]}>
                    {item.name}
                  </Text>
                  <Text style={styles.textSecondary}>
                    Category: {categories.find((cat) => cat.id === item.categoryId)?.name || "Unknown"}
                  </Text>
                  <Text style={styles.textSecondary}>
                    Measurement: {measurements.find((unit) => unit.id === item.unitId)?.name || "Unknown"}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{ marginHorizontal: theme.spacing.tiny }}
                  onPress={() => handleDeleteFood(item.id)}
                >
                  <Ionicons
                    name="trash-outline"
                    size={24}
                    color={theme.colors.secondary}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>

      {/* Add Food Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.modalOverlay}>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.modalTitle}>Add Food</Text>
            <TextInput
              style={modalStyles.input}
              placeholder="Food Name"
              value={newFood.name}
              onChangeText={(text) => setNewFood({ ...newFood, name: text })}
            />
            <Picker
              selectedValue={newFood.category}
              onValueChange={(value) => setNewFood({ ...newFood, category: value })}
              style={modalStyles.input}
            >
              <Picker.Item label="Select a category" value="" />
              {categories.map((category) => (
                <Picker.Item key={category.id} label={category.name} value={category.id} />
              ))}
            </Picker>

            <Picker
              selectedValue={newFood.unit}
              onValueChange={(value) => setNewFood({ ...newFood, unit: value })}
              style={modalStyles.input}
            >
              <Picker.Item label="Select a measurement" value="" />
              {measurements.map((unit) => (
                <Picker.Item key={unit.id} label={unit.name} value={unit.id} />
              ))}
            </Picker>

            <TouchableOpacity
              style={modalStyles.uploadButton}
              onPress={handleImageUpload}
            >
              <Text style={modalStyles.uploadButtonText}>
                {newFood.image ? "Change Image" : "Upload Image"}
              </Text>
            </TouchableOpacity>
            {newFood.image && (
              <Image
                source={{ uri: newFood.imageUri }}
                style={{ width: 100, height: 100, marginBottom: theme.spacing.medium }}
              />
            )}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity
                style={modalStyles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={modalStyles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={modalStyles.addButton}
              >
                <Text style={modalStyles.addButtonText} onPress={handleAddFood}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.large,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.medium,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.bgDark,
    borderRadius: theme.borderRadius.small,
    padding: theme.spacing.small,
    marginBottom: theme.spacing.medium,
    color: theme.colors.textPrimary,
  },
  uploadButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.small,
    borderRadius: theme.borderRadius.small,
    alignItems: "center",
    marginBottom: theme.spacing.medium,
  },
  uploadButtonText: {
    color: theme.colors.white,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.small,
    borderRadius: theme.borderRadius.small,
    flex: 1,
    marginLeft: theme.spacing.small,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: theme.colors.secondary,
    padding: theme.spacing.small,
    borderRadius: theme.borderRadius.small,
    flex: 1,
    marginRight: theme.spacing.small,
    alignItems: "center",
  },
  addButtonText: {
    color: theme.colors.white,
    fontWeight: "bold",
  },
  cancelButtonText: {
    color: theme.colors.white,
    fontWeight: "bold",
  },
});

export default FoodList;