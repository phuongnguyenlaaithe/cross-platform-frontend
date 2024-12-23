import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { createGroupAPI, getGroupsAPI } from "../redux/apiRequests/groupRequest";
import theme from "../theme/index";
import AppHeader from "../components/AppHeader";

// Group Item Component
const GroupItem = React.memo(({ group, onPress }) => (
  <TouchableOpacity
    style={styles.groupItem}
    onPress={onPress}
    accessible={true}
    accessibilityLabel={`Group ${group.name}, ${group.users?.length || 1} members`}
  >
    <View style={styles.groupInfo}>
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
    </View>
    <Text style={styles.groupMembers}>{group.users?.length || 1} Members</Text>
  </TouchableOpacity>
));

GroupItem.displayName = "GroupItem";

const Group = ({ navigation }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.login.currentUser?.accessToken);
  const { groups, isLoading } = useSelector((state) => state.groups);

  const [groupName, setGroupName] = useState("");
  console.log(groups);
  useEffect(() => {
    getGroupsAPI(accessToken, dispatch);
  }, [dispatch]);

  const handleCreateGroup = async () => {
    if (groupName.trim()) {
      try {
        await createGroupAPI(accessToken, { name: groupName }, dispatch);
        setGroupName("");
      } catch (error) {
        console.error("Failed to create group:", error);
      }
    } else {
      alert("Please enter a valid group name.");
    }
  };

  const renderGroup = useCallback(
    ({ item }) => (
      <GroupItem
        group={item}
        onPress={() => navigation.navigate("GroupDetail", { groupId: item.id })}
      />
    ),
    [navigation]
  );

  console.log('groups', groups)
  return (
    <>
      {/* AppHeader nằm ngoài View root để không bị ảnh hưởng padding */}
      <AppHeader navigation={navigation} showBackButton={true} />
      <View style={styles.root}>
        <Text style={styles.title}>Family Groups</Text>

        <Text style={styles.sectionHeader}>Your Groups</Text>
        {isLoading ? (
          <FlatList />
        ) : (
          <FlatList
            data={groups}
            renderItem={renderGroup}
            keyExtractor={(item) => item?.id?.toString()}
            style={styles.groupList}
            showsVerticalScrollIndicator={false}
          />
        )}

        <View style={styles.form}>
          <Text style={styles.sectionHeader}>Create New Group</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter group name"
            placeholderTextColor={theme.colors.textSecondary}
            value={groupName}
            onChangeText={setGroupName}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleCreateGroup}
            accessible={true}
            accessibilityLabel="Create group button"
          >
            <Text style={styles.buttonText}>Create Group</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.bgLight,
    padding: 20, // Padding áp dụng chỉ với nội dung bên dưới AppHeader
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
  form: {
    backgroundColor: "#f7f9ff",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Group;
