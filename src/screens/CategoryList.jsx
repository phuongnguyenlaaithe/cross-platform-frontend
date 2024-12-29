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
  getAllCategory,
  addNewCategory,
  deleteCategory,
} from "../redux/apiRequests/categoryRequest";
import styles from "./Styles";
import theme from "../theme/index";
import {
  AppHeader,
  AddCategoryModal,
  RoundButton,
  BottomTabViewAdmin,
  CategoryItem,
} from "../components";

const CategoryList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
  });

  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.adminAuth.adminLogin.currentAdmin?.accessToken
  );
  const categories = useSelector((state) => state.category.allCategory);
  const isFetching = useSelector((state) => state.category.isFetching);

  useEffect(() => {
    if (accessToken) {
      getAllCategory(accessToken, dispatch);
    }
  }, [accessToken, dispatch]);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCategory = async () => {
    if (newCategory.name) {
      const data = {
        name: newCategory.name,
      };

      await addNewCategory(accessToken, dispatch, data);

      setNewCategory({ name: "" });
      setModalVisible(false);
    } else {
      alert("Please fill in the category name.");
    }
  };

  const handleDeleteCategory = async (id) => {
    await deleteCategory(accessToken, dispatch, id);
  };

  return (
    <View style={styles.root}>
      <AppHeader navigation={navigation} showBackButton={true} />
      <View style={styles.container}>
        <Text style={[styles.title2, { marginBottom: theme.spacing.medium }]}>
          Categories
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

        {/* Category List */}
        {isFetching ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={filteredCategories}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: theme.spacing.large }}
            renderItem={({ item }) => (
              <CategoryItem item={item} handleDeleteCategory={handleDeleteCategory} />
            )}
          />
        )}
      </View>

      {/* Add Category Button */}
      <RoundButton onPress={() => setModalVisible(true)} />

      {/* Add Category Modal */}
      <AddCategoryModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        handleAddCategory={handleAddCategory}
      />

      <BottomTabViewAdmin />
    </View>
  );
};

export default CategoryList;