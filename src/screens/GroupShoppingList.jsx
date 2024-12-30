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
import { getAllGroupShoppingLists, deleteGroupShoppingList, addNewGroupShoppingList } from "../redux/apiRequests/groupShoppingListRequest";
import { getAllFoods } from "../redux/apiRequests/foodRequest";
import { addGroupTask, markGroupTaskAsDoneOrNot, deleteGroupTask, assignTask } from '../redux/apiRequests/groupTaskRequest';
import styles from "./Styles";
import theme from "../theme/index";
import { AppHeader, AddShoppingListModal, RoundButton, Accordion, AddTaskModal, SelectionModal, BottomTabView } from "../components";
import Icon from "react-native-vector-icons/MaterialIcons";

const GroupShoppingList = ({ navigation, route }) => {
  const { groupId } = route.params;
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedShoppingListId, setSelectedShoppingListId] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [newShoppingList, setNewShoppingList] = useState({
    name: "",
    note: "",
  });
  const [newTask, setNewTask] = useState({
    foodId: null,
    quantity: "",
    deadline: new Date(),
  });
  const [assignee, setAssignee] = useState(null);

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.login.currentUser?.accessToken);
  const shoppingLists = useSelector((state) => state.groupShoppingList.allGroupShoppingList);
  const foods = useSelector((state) => state.food.allFood);
  const isFetching = useSelector((state) => state.food.isFetching);
  const members = useSelector((state) => state.groups.groups.find((group) => group.id === groupId).users);
  const memberProfiles = members.map(member => ({ ...member.user.Profile, id: member.userId }));

  const group = useSelector((state) =>
    state.groups.groups.find((g) => g.id === groupId)
  );
  const user = useSelector((state) => state.auth.login.currentUser);

  const isGroupAdmin = group.users.some(
    (u) => u.userId == user.userId && u.role === "ADMIN"
  );

  useEffect(() => {
    if (accessToken) {
      getAllGroupShoppingLists(accessToken, dispatch, groupId);
      getAllFoods(accessToken, dispatch);
    }
  }, [accessToken, dispatch, groupId]);

  const filteredShoppingItems = shoppingLists.filter((list) =>
    list.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddShoppingList = async () => {
    if (newShoppingList.name && newShoppingList.note) {
      const shoppingListData = {
        ...newShoppingList,
        groupId: groupId,
      };
      try {
        await addNewGroupShoppingList(accessToken, dispatch, shoppingListData);
        setNewShoppingList({ name: "", note: "" });
        setModalVisible(false);
      } catch (error) {
        Alert.alert("Error adding shopping list");
      }
    } else {
      Alert.alert("Please fill in all fields.");
    }
  };

  const handleDeleteShoppingList = async (id, groupId) => {
    try {
      await deleteGroupShoppingList(accessToken, dispatch, id, groupId);
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
        groupId: groupId,
      };
      try {
        await addGroupTask(accessToken, dispatch, taskData);
        setTaskModalVisible(false);
        setNewTask({ foodId: null, quantity: "", deadline: new Date() });
      } catch (error) {
        alert("Error adding task");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleAssignTask = async (taskId, groupId, shoppingListId, assigneeId) => {
    await assignTask(accessToken, dispatch, taskId, groupId, shoppingListId, assigneeId);
    setShowAssignModal(false);
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
        <Accordion
          title={`${item.name}`}
          handleDelete={() => handleDeleteShoppingList(item.id, groupId)}
          isGroupAdmin={isGroupAdmin}
          isShoppingListOfGroup={true}
        >
          <Text style={{ color: theme.colors.textSecondary, marginBottom: 8, fontSize: 17 }}>
            Note: {item.note}
          </Text>
          {Object.keys(groupedTasks).map((category, categoryIndex) => (
            <View key={categoryIndex} style={thisStyles.categoryContainer}>
              <Text style={thisStyles.categoryTitle}>Category: {category}</Text>
              {/* Add column headers */}
              <View style={thisStyles.headerRow}>
                <Text style={thisStyles.itemName}>Item</Text>
                <Text style={[thisStyles.itemQuantity, { marginLeft: 10 }]}>Quantity</Text>
                <Text style={[thisStyles.itemDeadline]}>Deadline</Text>
                <Text style={[thisStyles.itemAssignee, { marginRight: 40 }]}>Assignee</Text>
              </View>
              {groupedTasks[category].map((task, taskIndex) => {
                const assignee = memberProfiles.find(profile => profile.id === task.assigneeId);
                return (
                  <View key={taskIndex} style={thisStyles.itemContainer}>
                    {isGroupAdmin && (
                      <TouchableOpacity
                        onPress={() =>
                          markGroupTaskAsDoneOrNot(accessToken, dispatch, task.id, groupId, item.id, !task.done)
                        }
                        style={thisStyles.checkbox}
                      >
                        <Icon
                          name={task.done ? "check-box" : "check-box-outline-blank"}
                          size={20}
                          color={theme.colors.primary}
                        />
                      </TouchableOpacity>
                    )}

                    <Text style={[thisStyles.itemName, task.done && thisStyles.itemDone]}>
                      {task.food.name}
                    </Text>
                    <Text style={thisStyles.itemQuantity}>{task.quantity}</Text>
                    <Text style={thisStyles.itemDeadline}>
                      {new Date(task.deadline).toLocaleDateString()}
                    </Text>
                    <Text style={thisStyles.itemAssignee}>
                      {assignee ? assignee.name : "Unassigned"}
                    </Text>
                    <View style={thisStyles.actionButtons}>
                      {isGroupAdmin && (
                        <TouchableOpacity
                          onPress={() => deleteGroupTask(accessToken, dispatch, task.id, groupId, item.id)}
                        >
                          <Icon name="delete" size={20} color={theme.colors.primary} />
                        </TouchableOpacity>
                      )}
                      {isGroupAdmin && (
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedTaskId(task.id);
                            setSelectedShoppingListId(item.id);
                            setShowAssignModal(true);
                          }}
                          style={{ marginLeft: theme.spacing.small }}
                        >
                          <Icon name="person-add" size={20} color={theme.colors.primary} />
                        </TouchableOpacity>
                      )}

                    </View>
                  </View>
                );
              })}
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
        <Text style={[styles.title1, { marginBottom: theme.spacing.medium, textAlign: 'center' }]}>Group: {route.params.groupName}</Text>

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

      {/* Assign Task Modal */}
      <SelectionModal
        visible={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        data={memberProfiles}
        onSelect={(profile) => {
          handleAssignTask(selectedTaskId, groupId, selectedShoppingListId, profile.id);
        }}
        title="Select Member"
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.textSecondaryLight,
    backgroundColor: theme.colors.backgroundLight,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.textSecondaryLight,
  },
  checkbox: {
    marginRight: 8,
  },
  itemName: {
    flex: 1,
    color: theme.colors.textPrimary,
    fontWeight: "600",
  },
  itemQuantity: {
    flex: 1.5,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
  itemDeadline: {
    flex: 2.5,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
  itemAssignee: {
    flex: 3,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
  itemDone: {
    textDecorationLine: "line-through",
    color: theme.colors.textSecondary,
  },
  actionButtons: {
    flexDirection: "row",
    marginLeft: theme.spacing.small,
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

export default GroupShoppingList;