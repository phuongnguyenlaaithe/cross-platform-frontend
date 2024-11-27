import React, { useEffect, useState } from "react";
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
import { getGroups, addGroup } from "../redux/apiRequests/groupRequest";
import * as ImagePicker from "expo-image-picker";
import theme from "../theme/index";

const Group = () => {
  const dispatch = useDispatch();
  const { groups, isLoading } = useSelector((state) => state.groups);

  const [groupName, setGroupName] = useState("");
  const [image, setImage] = useState({ file: null, uri: "" });

  useEffect(() => {
    getGroups(dispatch);
  }, [dispatch]);

  const handleAddImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage({ file: result.assets[0].file, uri: result.assets[0].uri });
    }
  };

  const handleCreateGroup = async () => {
    if (groupName.trim()) {
      await addGroup({ name: groupName, image: image }, dispatch);

      setGroupName("");
      setImage({ file: null, uri: "" });
    }
  };

  // Render nhóm
  const renderGroup = ({ item }) => (
    <View style={styles.groupItem}>
      <Text style={styles.groupName}>{item.name}</Text>
      <Text style={styles.groupMembers}>{item.users.length || 1} Members</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ShoppingPal</Text>
      <Text style={styles.subtitle}>Family Groups</Text>

      <Text style={styles.sectionHeader}>Your Groups</Text>
      {isLoading ? (
        <Text>Đang tải...</Text>
      ) : (
        <FlatList
          data={groups}
          renderItem={renderGroup}
          keyExtractor={(item, index) => index.toString()}
          style={styles.groupList}
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
        <TouchableOpacity style={styles.imageBox} onPress={handleAddImage}>
          {image.uri ? (
            <Image source={{ uri: image.uri }} style={styles.imagePreview} />
          ) : (
            <Text color={theme.colors.textSecondary}>+ Upload avatar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleCreateGroup}>
          <Text style={styles.buttonText}>Create Group</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  groupList: {
    marginBottom: 20,
  },
  groupItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  groupName: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
  },
  groupMembers: {
    fontSize: 16,
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
  imageBox: {
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 2,     
    borderColor: theme.colors.primary,
    marginBottom: 20,
  },
  imagePreview: {
    width: "100%",      
    height: "100%", 
    borderRadius: 10,
  },
  placeholderText: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    fontWeight: "bold",
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
