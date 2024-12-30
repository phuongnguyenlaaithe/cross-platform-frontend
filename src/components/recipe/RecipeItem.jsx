import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../../screens/Styles";
import theme from "../../theme/index";

const RecipeItem = ({ recipe, handleDeleteRecipe }) => {
  if (!recipe) return null;

  const ingredients = recipe.foods || [];

  return (
    <View
      style={[
        styles.card,
        {
          flexDirection: "row",
          alignItems: "center",
          padding: theme.spacing.large,
          marginBottom: theme.spacing.medium,
          marginVertical: 5,
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        {/* Tên công thức */}
        <Text
          style={[
            styles.textPrimary,
            { fontWeight: "bold", fontSize: 20, textAlign: "center" },
          ]}
        >
          {recipe.name || "Unknown Recipe"}
        </Text>

        {/* Hình ảnh */}
        {recipe.htmlContent && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginVertical: theme.spacing.small,
            }}
          >
            <Image
              source={{ uri: recipe.htmlContent }}
              style={{
                width: "100%",
                height: 150,
                borderRadius: theme.borderRadius.small,
              }}
            />
          </View>
        )}

        {/* Nguyên liệu */}
        <Text style={{ fontWeight: "bold", marginTop: 10 }}>Ingredients</Text>
        {ingredients.map((food) => (
          <View
            style={{
              marginVertical: 5,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
            key={food.id}
          >
            {food.imageURL && (
              <Image
                source={{ uri: food.imageURL }}
                style={{
                  width: 30,
                  height: 30,
                  marginRight: theme.spacing.small,
                  borderRadius: 100,
                }}
              />
            )}
            <Text style={styles.foodName}>{food.name}</Text>
          </View>
        ))}

        {/* Hướng dẫn */}
        <Text style={{ fontWeight: "bold", marginTop: 10 }}>Instruction</Text>
        <ScrollView
          style={{
            marginTop: theme.spacing.small,
            borderWidth: 1,
            borderColor: theme.colors.primary,
            borderRadius: theme.borderRadius.small,
            padding: 10,
            backgroundColor: theme.colors.backgroundSecondary,
          }}
          contentContainerStyle={{ paddingVertical: 5 }}
        >
          <Text style={{ fontSize: 16, lineHeight: 24 }}>
            {recipe.description || "No instructions available."}
          </Text>
        </ScrollView>

        {/* Nút xóa */}
        <TouchableOpacity
          style={{
            marginTop: 10,
            alignSelf: "center",
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => handleDeleteRecipe(recipe.id)}
        >
          <Icon name="delete" size={24} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecipeItem;
