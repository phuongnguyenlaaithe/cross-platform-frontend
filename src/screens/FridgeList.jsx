import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllFridgeItems, addNewFridgeItem, deleteFridgeItem } from "../redux/apiRequests/fridgeItemRequest";
import { getAllFoods } from "../redux/apiRequests/foodRequest";
import styles from "./Styles";
import theme from "../theme/index";
import { AppHeader, AddFridgeItemModal, FridgeItem, SelectionModal, RoundButton, BottomTabView } from "../components";
import { getAllMeasurement } from "../redux/apiRequests/measurementRequest";

const FridgeList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [newFridgeItem, setNewFridgeItem] = useState({
    quantity: null,
    foodId: null,
    foodName: "",
    unitId: "",
    unitName: "",
    note: "",
    startDate: "",
    expiredDate: "",
  });

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.login.currentUser?.accessToken);
  const fridgeItems = useSelector((state) => state.fridgeItem.allFridgeItems);
  const foods = useSelector((state) => state.food.allFood);
  const units = useSelector((state) => state.measurement.allMeasurement);
  const isFetching = useSelector((state) => state.fridgeItem.isFetching);

  useEffect(() => {
    if (accessToken) {
      getAllFridgeItems(accessToken, dispatch);
      getAllFoods(accessToken, dispatch);
      getAllMeasurement(accessToken, dispatch);
    }
  }, [accessToken, dispatch]);

  const filteredFridgeItems = fridgeItems.filter((item) => {
    const food = foods.find((food) => food.id === item.foodId);
    return food && food.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleAddFridgeItem = async () => {
    if (newFridgeItem.quantity && newFridgeItem.foodId && newFridgeItem.startDate && newFridgeItem.expiredDate) {
      const data = {
        quantity: newFridgeItem.quantity,
        foodId: newFridgeItem.foodId,
        note: newFridgeItem.note,
        startDate: newFridgeItem.startDate,
        expiredDate: newFridgeItem.expiredDate,
      };

      await addNewFridgeItem(accessToken, dispatch, data);

      setNewFridgeItem({ quantity: 1, foodId: null, foodName: "", note: "", startDate: "", expiredDate: "" });
      setModalVisible(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDeleteFridgeItem = async (id) => {
    await deleteFridgeItem(accessToken, dispatch, id);
  };

  return (
    <View style={styles.root}>
      <AppHeader navigation={navigation} showBackButton={true} />
      <View style={styles.container}>
        <Text style={[styles.title2, { marginBottom: theme.spacing.medium }]}>Fridge Items</Text>

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

        {/* Fridge Item List */}
        {isFetching ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={filteredFridgeItems}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: theme.spacing.large }}
            renderItem={({ item }) => (
              <FridgeItem
                item={item}
                foods={foods}
                units={units}
                handleDeleteFridgeItem={handleDeleteFridgeItem}
              />
            )}
          />
        )}
      </View>

      {/* Add Fridge Item Button */}
      <RoundButton onPress={() => setModalVisible(true)} />

      {/* Add Fridge Item Modal */}
      <AddFridgeItemModal
        foods={foods}
        units={units}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newFridgeItem={newFridgeItem}
        setNewFridgeItem={setNewFridgeItem}
        handleAddFridgeItem={handleAddFridgeItem}
        setShowFoodModal={setShowFoodModal}
      />

      {/* Food Selection Modal */}
      <SelectionModal
        visible={showFoodModal}
        onClose={() => { setShowFoodModal(false); setModalVisible(true) }}
        data={foods}
        onSelect={(item) => {
          setNewFridgeItem({
            ...newFridgeItem,
            foodId: item.id,
            foodName: item.name,
            unitId: item.unitId,
          });
          setShowFoodModal(false);
          setModalVisible(true);
        }}
        title="Select Food"
      />
      <BottomTabView />
    </View>
  );
};

export default FridgeList;