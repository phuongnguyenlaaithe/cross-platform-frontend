import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserShoppingLists, deleteUserShoppingList, addNewUserShoppingList } from "../redux/apiRequests/userShoppingListRequest";
import { getAllFoods } from "../redux/apiRequests/foodRequest";
import { addUserTask, markUserTaskAsDoneOrNot, deleteUserTask } from '../redux/apiRequests/userTaskRequest';
import styles from "./Styles";
import theme from "../theme/index";
import { AppHeader, AddShoppingListModal, RoundButton, Accordion, AddTaskModal, SelectionModal, BottomTabView } from "../components";
import Icon from "react-native-vector-icons/MaterialIcons";

const UserShoppingList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [selectedShoppingListId, setSelectedShoppingListId] = useState(null);
  const [newShoppingList, setNewShoppingList] = useState({
    name: "",
    note: "",
  });
  const [newTask, setNewTask] = useState({
    foodId: null,
    quantity: "",
    deadline: new Date(),
  });

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.login.currentUser?.accessToken);
  const shoppingLists = useSelector((state) => state.userShoppingList.allUserShoppingList);
  const foods = useSelector((state) => state.food.allFood);
  const isFetching = useSelector((state) => state.food.isFetching);

  useEffect(() => {
    if (accessToken) {
      getAllUserShoppingLists(accessToken, dispatch);
      getAllFoods(accessToken, dispatch);
    }
  }, [accessToken, dispatch]);

  const filteredShoppingItems = shoppingLists.filter((list) =>
    list.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddShoppingList = async () => {
    if (newShoppingList.name && newShoppingList.note) {
      try {
        await addNewUserShoppingList(accessToken, dispatch, newShoppingList);
        setNewShoppingList({ name: "", note: "" });
        setModalVisible(false);
      } catch (error) {
        Alert.alert("Error adding shopping list");
      }
    } else {
      Alert.alert("Please fill in all fields.");
    }
  };

  const handleDeleteShoppingList = async (id) => {
    try {
      await deleteUserShoppingList(accessToken, dispatch, id);
    } catch (error) {
      Alert.alert("Error deleting shopping list");
    }
  };

  const handleAddTask = async () => {
    if (newTask.foodId && newTask.quantity && newTask.deadline) {
      const taskData = {
        foodId: newTask.foodId,
        quantity: parseInt(newTask.quantity),
        deadline: newTask.deadline.toISOString(),
        shoppingListId: selectedShoppingListId,
      };
      try {
        await addUserTask(accessToken, dispatch, taskData);
        setTaskModalVisible(false);
        setNewTask({ foodId: null, quantity: "", deadline: new Date() });
      } catch (error) {
        alert("Error adding task");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  const groupTasksByCategory = (tasks) => {
    const groupedTasks = {};
    tasks.forEach((task) => {
      const category = task.food.category.name;
      if (!groupedTasks[category]) {
        groupedTasks[category] = [];
      }
      groupedTasks[category].push(task);
    });
    return groupedTasks;
  };

  const renderList = ({ item }) => {
    const groupedTasks = groupTasksByCategory(item.Task);
  
    return (
      <View style={[styles.card, { marginBottom: theme.spacing.medium }]}>
        <Accordion title={`${item.name}`} handleDelete={() => handleDeleteShoppingList(item.id)}>
          <Text style={{ color: theme.colors.textSecondary, marginBottom: 8, fontSize: 17 }}>Note: {item.note}</Text>
          {Object.keys(groupedTasks).map((category, categoryIndex) => (
            <View key={categoryIndex} style={thisStyles.categoryContainer}>
              <Text style={thisStyles.categoryTitle}>{category}</Text>
              {groupedTasks[category].map((task, taskIndex) => (
                <View key={taskIndex} style={thisStyles.itemContainer}>
                  <TouchableOpacity onPress={() => markUserTaskAsDoneOrNot(accessToken, dispatch, task.id, item.id, !task.done)}>
                    <Icon name={task.done ? "check-box" : "check-box-outline-blank"} size={20} color={theme.colors.primary} />
                  </TouchableOpacity>
                  <Text style={[thisStyles.itemName, task.done && thisStyles.itemDone]}>{task.food.name}</Text>
                  <Text style={thisStyles.itemQuantity}>{task.quantity} </Text>
                  <Text style={thisStyles.itemUnit}>{task.food.unit.name}</Text>
                  <Text style={thisStyles.itemDeadline}>(deadline: {new Date(task.deadline).toLocaleDateString()})</Text>
                  <TouchableOpacity style={{marginLeft: theme.spacing.small}} onPress={() => deleteUserTask(accessToken, dispatch, task.id)}>
                    <Icon name="delete" size={20} color={theme.colors.primary} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}
          <TouchableOpacity
            style={thisStyles.addItemButton}
            onPress={() => {
              setSelectedShoppingListId(item.id);
              setTaskModalVisible(true);
            }}
          >
            <Icon name="add" size={16} color={theme.colors.primary} />
            <Text style={thisStyles.addItemText}>Add Item</Text>
          </TouchableOpacity>
        </Accordion>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <AppHeader navigation={navigation} showBackButton={true} />
      <View style={styles.container}>
        <Text style={[styles.title2, { marginBottom: theme.spacing.medium }]}>Shopping List</Text>

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

        {/* Shopping List */}
        {isFetching ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={filteredShoppingItems}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: theme.spacing.large }}
            renderItem={renderList}
          />
        )}
      </View>

      {/* Add Shopping Item Button */}
      <RoundButton onPress={() => setModalVisible(true)} />

      {/* Add Shopping Item Modal */}
      <AddShoppingListModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newShoppingList={newShoppingList}
        setNewShoppingList={setNewShoppingList}
        handleAddShoppingList={handleAddShoppingList}
      />

      {/* Add Task Modal */}
      <AddTaskModal
        foods={foods}
        modalVisible={taskModalVisible}
        setModalVisible={setTaskModalVisible}
        newTask={newTask}
        setNewTask={setNewTask}
        handleAddTask={handleAddTask}
        setShowFoodModal={setShowFoodModal}
      />

      {/* Food Selection Modal */}
      <SelectionModal
        visible={showFoodModal}
        onClose={() => { setShowFoodModal(false); setTaskModalVisible(true); }}
        data={foods}
        onSelect={(item) => {
          setNewTask({
            ...newTask,
            foodId: item.id,
          });
          setShowFoodModal(false);
          setTaskModalVisible(true);
        }}
        title="Select Food"
      />
      <BottomTabView />
    </View>
  );
};

const thisStyles = StyleSheet.create({
  categoryContainer: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontWeight: "bold",
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  itemIcon: {
    marginRight: 8,
  },
  itemName: {
    flex: 1,
    color: theme.colors.textPrimary,
  },
  itemQuantity: {
    color: theme.colors.textSecondary,
  },
  itemUnit: {
    color: theme.colors.textSecondary,
  },
  itemDeadline: {
    color: theme.colors.textSecondary,
  },
  itemDone: {
    textDecorationLine: 'line-through',
    color: theme.colors.textSecondary,
  },
  addItemButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  addItemText: {
    color: theme.colors.primary,
    marginLeft: 4,
  },
});

export default UserShoppingList;