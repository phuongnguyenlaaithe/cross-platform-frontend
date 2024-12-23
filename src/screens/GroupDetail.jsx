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
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  addMemberAPI,
  removeMemberAPI,
  updateGroupAPI,
} from "../redux/apiRequests/groupRequest";
import { leaveGroup } from "../redux/slices/groupsSlice";
import * as ImagePicker from "expo-image-picker";
import { AppHeader } from "../components";
import theme from "../theme/index";
import axios from "axios";
import { BASE_URL } from "../constants";
import styles from "../screens/Styles";

const GroupDetail = ({ route, navigation }) => {
  const { groupId } = route.params;
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser?.accessToken
  );

  const group = useSelector((state) =>
    state.groups.groups.find((g) => g.id === groupId)
  );

  const user = useSelector((state) => state.auth.login.currentUser);

  const isGroupAdmin = true || group.users.some(
    (u) => u.userId === user.userId && u.role === "ADMIN"
  );

  const [userProfiles, setUserProfiles] = useState([]);
  const [email, setEmail] = useState("");
  const [groupPhoto, setGroupPhoto] = useState({
    file: null,
    uri: group.photoUrl || "",
  });
  const [groupName, setGroupName] = useState(group.name);
  const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);

  useEffect(() => {
    const fetchUserProfiles = async () => {
      try {
        const profiles = await Promise.all(
          group.users.map(async (user) => {
            const response = await axios.get(
              `${BASE_URL}/user/profile/${user.userId}`,
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              }
            );
            return response.data;
          })
        );
        setUserProfiles(profiles);
      } catch (error) {
        console.error("Error fetching user profiles:", error);
      }
    };

    fetchUserProfiles();
  }, [group.users]);

  const handleAddMember = async () => {
    await addMemberAPI(accessToken, groupId, [email], dispatch);
    setEmail("");
  };

  const handleRemoveMember = async (userId) => {
    await removeMemberAPI(accessToken, groupId, [userId], dispatch);
  };

  const handleLeftGroup = async () => {
    await removeMemberAPI(accessToken, groupId, [user.userId], dispatch);
    dispatch(leaveGroup(groupId));
  };

  const handleChangeGroupPhoto = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setGroupPhoto({
          file: result.assets[0],
          uri: result.assets[0].uri,
        });
      }
      setIsUpdatingInfo(true);
    } catch (error) {
      console.error("Error while picking image:", error);
    }
  };

  const handleUpdateGroupInfo = async () => {
    const formData = new FormData();
    if (groupPhoto.file) {
      formData.append("image", {
        uri: groupPhoto.file.uri,
        type: "image/png",
        name: groupPhoto.file.name || "group_photo.png",
      });
    }
    formData.append("name", groupName);
  
    await updateGroupAPI(accessToken, dispatch, groupId, formData);
    setIsUpdatingInfo(false);
  };

  const renderMember = ({ item }) => (
    <View style={groupDetailStyle.memberItem}>
      <View style={groupDetailStyle.memberInfo}>
        <Image
          alt="member-avatar"
          source={
            item.photoURL
              ? { uri: item.photoURL }
              : require("../../assets/adaptive-icon.png")
          }
          style={groupDetailStyle.memberAvatar}
        />
        <Text style={groupDetailStyle.memberName}>
          {item.name} {item.userId === user.userId ? " (You)" : ""}
        </Text>
      </View>
      {isGroupAdmin && (
        <TouchableOpacity
        style={styles.deleteIconContainer}
        onPress={() => handleRemoveMember(item.userId)}
      >
        <Icon name="delete" size={24} color={theme.colors.textSecondary} />
      </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.root}>
      <AppHeader navigation={navigation} showBackButton={true} />
      <View style={styles.container}>
        <View style={groupDetailStyle.groupInfo}>
          <TouchableOpacity onPress={handleChangeGroupPhoto}>
            <Image
              source={
                groupPhoto.uri
                  ? { uri: groupPhoto.uri }
                  : require("../../assets/adaptive-icon.png")
              }
              style={groupDetailStyle.groupImage}
              alt="group-avatar"
            />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={groupDetailStyle.groupNameInput}
              value={groupName}
              onChangeText={(text) => {
                setGroupName(text);
                setIsUpdatingInfo(true);
              }}
            />
          </View>
        </View>

        {isUpdatingInfo && (
          <TouchableOpacity
            style={groupDetailStyle.updateButton}
            onPress={handleUpdateGroupInfo}
          >
            <Text style={groupDetailStyle.buttonText}>Update</Text>
          </TouchableOpacity>
        )}

        <Text style={groupDetailStyle.sectionHeader}>Members</Text>
        {userProfiles.length > 0 && (
          <FlatList
            key={userProfiles?.id}
            data={userProfiles}
            renderItem={renderMember}
            keyExtractor={(member) => member.id}
            style={groupDetailStyle.memberList}
          />
        )}

        {isGroupAdmin ? (
          <View style={groupDetailStyle.form}>
            <Text style={groupDetailStyle.sectionHeader}>Add Member</Text>
            <TextInput
              style={groupDetailStyle.input}
              placeholder="Enter member's email"
              placeholderTextColor={theme.colors.textSecondary}
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity
              style={groupDetailStyle.button}
              onPress={handleAddMember}
            >
              <Text style={groupDetailStyle.buttonText}>Add Member</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={groupDetailStyle.button}
            onPress={handleLeftGroup}
          >
            <Text style={groupDetailStyle.buttonText}>Leave Group</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const groupDetailStyle = StyleSheet.create({
  groupInfo: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  },
  groupImage: {
    width: 75,
    height: 75,
    borderRadius: 50,
    marginBottom: theme.spacing.medium,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  groupNameInput: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: theme.colors.primary,
    marginBottom: theme.spacing.small,
    width: "60%",
  },
  updatingText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginVertical: 5,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: theme.spacing.medium,
  },
  memberList: {
    marginBottom: theme.spacing.medium,
  },
  memberItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.small,
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
    marginRight: theme.spacing.small,
  },
  memberName: {
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  removeButton: {
    backgroundColor: theme.colors.danger,
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
    borderRadius: theme.borderRadius.full,
  },
  removeButtonText: {
    color: theme.colors.white,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.small,
    borderRadius: theme.borderRadius.medium,
    marginVertical: theme.spacing.medium,
    alignItems: "center",
  },
  updateButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.small,
    borderRadius: theme.borderRadius.medium,
    marginVertical: theme.spacing.medium,
    alignItems: "center",
    width: "20%",
    alignSelf: "center",
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: "bold",
  },
  input: {
    padding: theme.spacing.small,
    borderRadius: theme.borderRadius.medium,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    marginBottom: theme.spacing.small,
  },
  form: {
    marginBottom: theme.spacing.medium,
  },
});

export default GroupDetail;
