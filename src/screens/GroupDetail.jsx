import React, { useEffect, useState } from "react";
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
import {
  addMemberAPI,
  removeMemberAPI,
  updateGroupAPI,
} from "../redux/apiRequests/groupRequest";
import { leaveGroup } from "../redux/slices/groupsSlice";
import * as ImagePicker from "expo-image-picker";
import { AppHeader } from "../components";
import api from "../utils/api";
import theme from "../theme/index";

const GroupDetail = ({ route, navigation }) => {
  const { groupId } = route.params;
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.login.currentUser?.accessToken);
  
  const group = useSelector((state) =>
    state.groups.groups.find((g) => g.id === groupId)
  );

  console.log('groups', group)

  const user = useSelector((state) => state.auth.login.currentUser);
  const isGroupAdmin = group.users.some(
    (u) => u.userId === user.userId && u.role === "ADMIN"
  );
  const [userProfiles, setUserProfiles] = useState([]);
  const [email, setEmail] = useState("");
  const [groupPhoto, setGroupPhoto] = useState({
    file: null,
    uri: group.photoURL || "",
  });
  const [groupName, setGroupName] = useState(group.name);
  const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);

  useEffect(() => {
    const fetchUserProfiles = async () => {
      try {
        const profiles = await Promise.all(
          group.users.map(async (user) => {
            const response = await api.get(`/user/profile/${user.userId}`);
            console.log(response);
            return response;
          })
        );
        setUserProfiles(profiles);
      } catch (error) {
        console.error("Lỗi khi lấy profile người dùng:", error);
      }
    };

    fetchUserProfiles();
  }, [group.users]);
  console.log(userProfiles);

  const handleAddMember = async () => {
    if (email.trim()) {
      const success = await addMemberAPI(groupId, [email], dispatch);
      if (success) {
        Alert.alert("Success", "Member added successfully!");
        setEmail("");
      } else {
        Alert.alert("Error", "Failed to add member.");
      }
    } else {
      Alert.alert("Error", "Please enter a valid email.");
    }
  };

  const handleRemoveMember = async (memberId) => {
    const success = await removeMemberAPI(groupId, [memberId], dispatch);
    if (success) {
      Alert.alert("Success", "Member removed successfully!");
    } else {
      console.log("userProfile", userProfiles);
      Alert.alert("Error", "Failed to remove member.");
    }
  };

  const handleLeftGroup = async () => {
    const response = await api.patch(`/group/${groupId}/remove-member`, {
      userIds: [user.id],
    });
    if (response.status === 200) {
      dispatch(leaveGroup(groupId));
      navigation.goBack();
    } else {
      Alert.alert("Error", "Failed to leave group.");
    }
  };

  const handleChangeGroupPhoto = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setGroupPhoto({
          file: result.assets[0].uri,
          uri: result.assets[0].uri,
        });
      }
    } catch (error) {
      console.error("Error while picking image:", error);
    }
  };

  const handleUpdateGroupInfo = async () => {
    try {
      setIsUpdatingInfo(true);
      const formData = new FormData();
      if (groupPhoto.file) {
        formData.append("image", groupPhoto.file);
      }
      formData.append("name", groupName);

      const response = await updateGroupAPI(accessToken, groupId, formData, dispatch);
      if (response.status === 200) {
        Alert.alert("Success", "Group info updated successfully!");
      } else {
        Alert.alert("Error", "Failed to update group info.");
      }
    } catch (error) {
      console.error("Error updating group info:", error);
      Alert.alert("Error", "An unexpected error occurred.");
    } finally {
      setIsUpdatingInfo(false);
    }
  };

  const renderMember = ({ item }) => (
    <View style={styles.memberItem}>
      <View style={styles.memberInfo}>
        <Image
          alt="member-avatar"
          source={item.photoURL ? { uri: item.photoURL } : require("../../assets/adaptive-icon.png")}
          style={styles.memberAvatar}
        />
        <Text style={styles.memberName}>
          {item.name} {item.userId === user.userId ? " (You)" : ""}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveMember(item.id)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} showBackButton={true} />
      <View style={styles.groupInfo}>
        <TouchableOpacity onPress={handleChangeGroupPhoto}>
          <Image
            source={groupPhoto.uri ? { uri: groupPhoto.uri } : require("../../assets/adaptive-icon.png")}
            style={styles.groupImage}
            alt="group-avatar"
          />
        </TouchableOpacity>
        <TextInput
          style={styles.groupNameInput}
          value={groupName}
          onChangeText={setGroupName}
        />
        {isUpdatingInfo && <Text style={styles.updatingText}>Updating...</Text>}
        <TouchableOpacity style={styles.button} onPress={handleUpdateGroupInfo}>
          <Text style={styles.buttonText}>Update Info</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionHeader}>Members</Text>
      <FlatList
        data={userProfiles}
        renderItem={renderMember}
        keyExtractor={(member) => member.userId.toString()}
        style={styles.memberList}
      />

      {isGroupAdmin ? (
        <View style={styles.form}>
          <Text style={styles.sectionHeader}>Add Member</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter member's email"
            placeholderTextColor={theme.colors.textSecondary}
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddMember}>
            <Text style={styles.buttonText}>Add Member</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLeftGroup}>
          <Text style={styles.buttonText}>Leave Group</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bgLight,
    padding: 20,
  },
  groupInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  groupImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  groupNameInput: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: theme.colors.primary,
    marginBottom: 10,
  },
  updatingText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginVertical: 5,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  memberList: {
    marginBottom: 20,
  },
  memberItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  memberInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  memberName: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    fontWeight: "normal",
  },
  removeButton: {
    backgroundColor: "#e74c3c",
    padding: 8,
    borderRadius: 50,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
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

export default GroupDetail;
