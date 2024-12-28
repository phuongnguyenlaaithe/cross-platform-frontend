import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  FlatList,
} from "react-native";
import styles from "../../screens/Styles";
import theme from "../../theme/index";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { addNewRecipeAPI } from "../../redux/apiRequests/recipeRequest";
import { getAllFoods } from "../../redux/apiRequests/foodRequest";
import { useSelector, useDispatch } from "react-redux";

const AddRecipeModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    foodIds: [],
    description: "",
    htmlContent: "",
    htmlContentUri: "",
  });
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser?.accessToken
  );

  const foodItems = useSelector((state) => state.food.allFood);

  useEffect(() => {
    if (accessToken) {
      getAllFoods(accessToken, dispatch);
    }
  }, [accessToken, dispatch]);

  const handleAddRecipe = async () => {
    if (
      newRecipe.name &&
      newRecipe.foodIds &&
      newRecipe.description &&
      newRecipe.htmlContent
    ) {
      const formData = new FormData();
      formData.append("name", newRecipe.name);
      newRecipe.foodIds.forEach((id) => {
        formData.append("foodIds[]", Number(id)); 
      });
            formData.append("description", newRecipe.description);
      formData.append("htmlContent", {
        uri: newRecipe.htmlContentUri,
        type: "image/png",
        name: "recipe.png",
      });

      await addNewRecipeAPI(accessToken, dispatch, formData);

      setNewRecipe({ name: "", foodIds: [], description: "", htmlContent: "" });
      onClose();
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setNewRecipe({
        ...newRecipe,
        htmlContent: result.assets[0],
        htmlContentUri: result.assets[0].uri,
      });
    }
  };

  
  const toggleFoodSelection = (food) => {
    setNewRecipe((recipe) => {
      if (recipe.foodIds.includes(food.id)) {
        return { ...recipe, foodIds: recipe.foodIds.filter((id) => id !== food.id) };
      } else {
        return { ...recipe, foodIds: [...recipe.foodIds, food.id] };
      }
    });
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: theme.spacing.medium,
          }}
        >
          <TouchableOpacity onPress={() => onClose()}>
            <Text
              style={{
                color: theme.colors.primary,
                fontWeight: "bold",
                fontSize: 16,
                marginTop: 5,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <Text style={[styles.title2, { textAlign: "center" }]}>
            Add Recipe
          </Text>
          <TouchableOpacity onPress={handleAddRecipe}>
            <Text
              style={{
                color: theme.colors.primary,
                fontWeight: "bold",
                fontSize: 16,
                marginTop: 5,
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primary,
            padding: theme.spacing.small,
            borderRadius: theme.borderRadius.small,
            alignItems: "center",
            marginBottom: theme.spacing.medium,
            width: 60,
            alignSelf: "center",
          }}
          onPress={handleImageUpload}
        >
          <Ionicons
            name="camera-outline"
            size={24}
            color={theme.colors.white}
          />
        </TouchableOpacity>
        {newRecipe.htmlContentUri && (
          <Image
            source={{ uri: newRecipe.htmlContentUri }}
            style={{
              width: 150,
              height: 150,
              alignSelf: "center",
              borderRadius: 100,
            }}
          />
        )}

        <TextInput
          style={[
            styles.input,
            {
              marginTop: theme.spacing.small,
              width: "75%",
              alignSelf: "center",
              borderColor: theme.colors.primary,
              borderWidth: 1,
              fontWeight: "bold",
              textAlign: "center",
            },
          ]}
          placeholder="Recipe Name"
          value={newRecipe.name}
          onChangeText={(text) => setNewRecipe({ ...newRecipe, name: text })}
        />

        <View style={{ marginTop: theme.spacing.medium }}>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            Ingredients
          </Text>
          <FlatList
          data={foodItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => toggleFoodSelection(item)}
              style={[
                addRecipeStyle.foodOption,
                newRecipe.foodIds.includes(item.id) &&
                addRecipeStyle.selectedOption,
              ]}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          style={addRecipeStyle.foodList}
        />
        </View>

        <View style={{ marginTop: theme.spacing.medium }}>
          <Text style={{ fontWeight: "bold" }}>Instruction</Text>
          <TextInput
            style={[
              styles.input,
              {
                marginTop: theme.spacing.small,
                height: 150,
                borderColor: theme.colors.primary,
                borderRadius: theme.borderRadius.small,
                borderWidth: 1,
                padding: 10,
                textAlignVertical: "top",
              },
            ]}
            multiline={true}
            numberOfLines={5}
            placeholder="Enter recipe instruction..."
            value={newRecipe.description}
            onChangeText={(text) =>
              setNewRecipe({ ...newRecipe, description: text })
            }
          />
        </View>
      </View>
    </View>
  );
};

const addRecipeStyle = {
  foodList: {
    maxHeight: 150,
    marginVertical: theme.spacing.small,
  },
  foodOption: {
    padding: theme.spacing.small,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: theme.spacing.small,
  },
  selectedOption: {
    borderColor: theme.colors.primary,
  },
}
export default AddRecipeModal;
