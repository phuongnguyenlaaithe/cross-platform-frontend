import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { createGroupAPI, getGroupsAPI, deleteGroupAPI } from "../redux/apiRequests/groupRequest";
import theme from "../theme/index";
import { AppHeader, BottomTabView, AddGroupModal, RoundButton } from "../components";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";

// Group Item Component
const GroupItem = React.memo(({ group, onPress, onDelete }) => (
  <View style={styles.groupItem}>
    <TouchableOpacity
      style={styles.groupInfo}
      onPress={onPress}
      accessible={true}
      accessibilityLabel={`Group ${group.name}, ${group.users?.length || 1} members`}
    >
      <Image
        alt="group-avatar"
        source={
          group.photoUrl
            ? { uri: group.photoUrl }
            : require("../../assets/adaptive-icon.png")
        }
        style={styles.groupAvatar}
      />
      <Text style={styles.groupName}>{group.name}</Text>
    </TouchableOpacity>
    <Text style={styles.groupMembers}>{group.users?.length || 1} Members</Text>
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={onDelete}
      accessible={true}
      accessibilityLabel={`Delete group ${group.name}`}
    >
      <Icon name="delete" size={20}/>
    </TouchableOpacity>
  </View>
));

GroupItem.displayName = "GroupItem";

const Group = ({ navigation }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.login.currentUser?.accessToken);
  const { groups, isLoading } = useSelector((state) => state.groups);

  const [modalVisible, setModalVisible] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: "" });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getGroupsAPI(accessToken, dispatch);
  }, [dispatch]);

  const handleCreateGroup = async () => {
    if (newGroup.name.trim()) {
      try {
        await createGroupAPI(accessToken, { name: newGroup.name }, dispatch);
        setNewGroup({ name: "" });
        setModalVisible(false);
      } catch (error) {
        console.error("Failed to create group:", error);
      }
    } else {
      alert("Please enter a valid group name.");
    }
  };

  const handleDeleteGroup = async (groupId) => {
    Alert.alert(
      "Delete Group",
      "Are you sure you want to delete this group?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteGroupAPI(accessToken, groupId, dispatch);
            } catch (error) {
              console.error("Failed to delete group:", error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderGroup = useCallback(
    ({ item }) => (
      <GroupItem
        group={item}
        onPress={() => navigation.navigate("GroupDetail", { groupId: item.id })}
        onDelete={() => handleDeleteGroup(item.id)}
      />
    ),
    [navigation]
  );

  return (
    <>
      <AppHeader navigation={navigation} showBackButton={true} />
      <View style={styles.root}>
        <Text style={styles.title}>Family Groups</Text>

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

        <Text style={styles.sectionHeader}>Your Groups</Text>
        {isLoading ? (
          <FlatList />
        ) : (
          <FlatList
            data={filteredGroups}
            renderItem={renderGroup}
            keyExtractor={(item) => item?.id?.toString()}
            style={styles.groupList}
            showsVerticalScrollIndicator={false}
          />
        )}

        <AddGroupModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          newGroup={newGroup}
          setNewGroup={setNewGroup}
          handleAddGroup={handleCreateGroup}
        />
      </View>
      <RoundButton onPress={() => setModalVisible(true)} />
      <BottomTabView />
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.bgLight,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 10,
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: theme.colors.textPrimary,
  },
  headerItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
    borderRadius: theme.borderRadius.full,
    width: "100%",
    ...theme.shadows.button,
    height: 40,
  },
  groupList: {
    marginBottom: 20,
  },
  groupItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  groupInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  groupAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  groupName: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
  },
  groupMembers: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  deleteButton: {
    backgroundColor: theme.colors.danger,
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Group;