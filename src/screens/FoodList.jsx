import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from 'expo-image-picker';
import { getAllFoods, addNewFood, deleteFood } from "../redux/apiRequests/foodRequest";
import { getAllCategory } from "../redux/apiRequests/categoryRequest";
import { getAllMeasurement } from "../redux/apiRequests/measurementRequest";
import styles from "./Styles";
import theme from "../theme/index";
import { AppHeader, AddFoodModal, FoodItem, SelectionModal, RoundButton } from "../components";

const FoodList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showMeasurementModal, setShowMeasurementModal] = useState(false);
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
      const formData = new FormData();
      formData.append('name', newFood.name);
      formData.append('category', newFood.category);
      formData.append('unit', newFood.unit);
      formData.append('image', {
        uri: newFood.imageUri,
        type: 'image/png',
        name: 'foodImage.png',
      });

      await addNewFood(accessToken, dispatch, formData);

      setNewFood({ name: "", category: "", unit: "", image: null });
      setModalVisible(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDeleteFood = async (id) => {
    await deleteFood(accessToken, dispatch, id);
  };

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setNewFood({ ...newFood, image: result.assets[0], imageUri: result.assets[0].uri });
    }
  };

  return (
    <View style={styles.root}>
      <AppHeader navigation={navigation} showBackButton={true} />
      <View style={styles.container}>
        <Text style={[styles.title2, { marginBottom: theme.spacing.medium }]}>Food List</Text>

        {/* Search Bar */}
        <View style={[styles.headerItem, { marginBottom: theme.spacing.large, flexDirection: 'row', alignItems: 'center' }]}>
          <TextInput
            style={[styles.input, { flex: 1, paddingLeft: 40 }]}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Ionicons name="search" size={20} color={theme.colors.textSecondary} style={{ position: 'absolute', left: 10 }} />
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
              <FoodItem
                item={item}
                categories={categories}
                measurements={measurements}
                handleDeleteFood={handleDeleteFood}
              />
            )}
          />
        )}
      </View>

      {/* Add Fridge Item Button */}
      <RoundButton onPress={() => setModalVisible(true)} />

      {/* Add Food Modal */}
      <AddFoodModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newFood={newFood}
        setNewFood={setNewFood}
        handleAddFood={handleAddFood}
        handleImageUpload={handleImageUpload}
        setShowCategoryModal={setShowCategoryModal}
        setShowMeasurementModal={setShowMeasurementModal}
      />

      {/* Category Selection Modal */}
      <SelectionModal
        visible={showCategoryModal}
        onClose={() => { setShowCategoryModal(false); setModalVisible(true) }}
        data={categories}
        onSelect={(item) => {
          setNewFood({ ...newFood, category: item.name });
          setShowCategoryModal(false);
          setModalVisible(true);
        }}
        title="Select Category"
      />

      {/* Measurement Selection Modal */}
      <SelectionModal
        visible={showMeasurementModal}
        onClose={() => { setShowMeasurementModal(false); setModalVisible(true) }}
        data={measurements}
        onSelect={(item) => {
          setNewFood({ ...newFood, unit: item.name });
          setShowMeasurementModal(false);
          setModalVisible(true);
        }}
        title="Select Measurement"
      />
    </View>
  );
};

export default FoodList;