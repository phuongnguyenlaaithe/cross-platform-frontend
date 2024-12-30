import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Styles";
import theme from "../theme/index";
import { AppHeader, RoundButton } from "../components";
import { deleteRecipeAPI, getAllRecipeAPI } from "../redux/apiRequests/recipeRequest";
import RecipeItem from "../components/recipe/RecipeItem";
import AddRecipeModal from "../components/recipe/AddRecipeModal";

const Recipe = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser?.accessToken
  );
  const recipes = useSelector((state) => state.recipe.allRecipe);
  const isFetching = useSelector((state) => state.recipe.isFetching);

  useEffect(() => {
    if (accessToken) {
      getAllRecipeAPI(accessToken, dispatch);
    }
  }, [accessToken, dispatch]);

  const filteredRecipes = recipes ? recipes.filter((recipe) => {
    return (
      !searchQuery || recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }): [];

  const handleDeleteRecipe = async (id) => {
    await deleteRecipeAPI(accessToken, dispatch, id);
  };

  return (
    <View style={styles.root}>
      <AppHeader navigation={navigation} showBackButton={true} />
      <View style={styles.container}>
        <Text style={[styles.title2, { marginBottom: theme.spacing.medium }]}>
          Recipe
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

        {isFetching ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={filteredRecipes}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: theme.spacing.large }}
            renderItem={({ item }) => (
              <RecipeItem recipe={item} handleDeleteRecipe={handleDeleteRecipe} />
            )}
          />
        )}
      </View>

      <RoundButton onPress={() => setModalVisible(true)} />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <AddRecipeModal
          onClose={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

export default Recipe;
