import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  deactivateUser,
  activateUser,
} from "../redux/apiRequests/userListRequest";
import styles from "./Styles";
import theme from "../theme/index";
import {
  AppHeader,
  RoundButton,
  BottomTabViewAdmin,
  UserItem,
} from "../components";

const UserList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.adminAuth.adminLogin.currentAdmin?.accessToken
  );
  const users = useSelector((state) => state.userList.users);
  const isFetching = useSelector((state) => state.userList.isFetching);

  useEffect(() => {
    if (accessToken) {
      getAllUsers(accessToken, dispatch);
    }
  }, [accessToken, dispatch]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeactivateUser = async (userId) => {
    await deactivateUser(userId, accessToken, dispatch);
  };

  const handleActivateUser = async (userId) => {
    await activateUser(userId, accessToken, dispatch);
  };

  return (
    <View style={styles.root}>
      <AppHeader navigation={navigation} showBackButton={true} />
      <View style={styles.container}>
        <Text style={[styles.title2, { marginBottom: theme.spacing.medium }]}>
          Manage Users
        </Text>

        {/* Search Bar */}
        <View
          style={[
            styles.headerItem,
            {
              marginBottom: theme.spacing.large,
              flexDirection: "row",
              alignItems: "center",
            },
          ]}
        >
          <TextInput
            style={[styles.input, { flex: 1, paddingLeft: 40 }]}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Ionicons
            name="search"
            size={20}
            color={theme.colors.textSecondary}
            style={{ position: "absolute", left: 10 }}
          />
        </View>

        {/* User List */}
        {isFetching ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: theme.spacing.large }}
            renderItem={({ item }) => (
              <UserItem
                item={item}
                handleDeactivateUser={handleDeactivateUser}
                handleActivateUser={handleActivateUser}
              />
            )}
          />
        )}
      </View>

      <BottomTabViewAdmin />
    </View>
  );
};

export default UserList;