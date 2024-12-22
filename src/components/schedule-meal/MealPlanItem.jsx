import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import theme from "../../theme";
import { deleteMealPlanAPI } from "../../redux/apiRequests/mealPlanRequest";
import { useDispatch, useSelector } from "react-redux";

const MealPlanItem = ({ item }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.login.currentUser?.accessToken);

  const getStatusStyle = () => {
    if (item.status === "DONE") {
      return styles.doneStatus;
    } else if (item.status === "NOT_PASS_YET") {
      return styles.notPassYetStatus;
    }
    return {};
  };

  const onDelete = async (id) => {
    await deleteMealPlanAPI(accessToken, dispatch, id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.contentContainer}>
          <View style={{ display: "flex", flexDirection: "row", marginRight: 10 }}>
          <Text style={styles.mealName}>{item.name}</Text>
          <View style={[styles.statusContainer, getStatusStyle()]}>
            <Text style={[styles.mealStatus, getStatusStyle()]}>
              {item.status === "DONE" ? "Done" : "Not pass"}
            </Text>
          </View>
          </View>
          <Text style={styles.foodTitle}>Foods:</Text>
          {item.foods.map((food) => (
            <View style={styles.foodItem} key={food.id}>
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
        </View>
        <TouchableOpacity
          style={styles.deleteIconContainer}
          onPress={() => onDelete(item.id)}
        >
          <Icon name="delete" size={24} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  row: {
    flexDirection: "row", // Layout ngang
    alignItems: "center", // Căn giữa theo chiều dọc
  },
  contentContainer: {
    flex: 1, // Chiếm tối đa không gian có thể
  },
  mealName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  statusContainer: {
    alignSelf: "flex-start",
    marginLeft: 10,
    borderWidth: 2,
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  mealStatus: {
    fontSize: 14,
    textAlign: "center",
  },
  doneStatus: {
    borderColor: "#BEE3E3",
    color: "#BEE3E3",
    fontWeight: "bold",
  },
  notPassYetStatus: {
    borderColor: "orange",
    color: "orange",
  },
  foodTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  foodItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  foodName: {
    marginLeft: 10,
    fontSize: 14,
    marginRight: 10,
  },
  deleteIconContainer: {
    justifyContent: "center", // Căn giữa icon theo chiều dọc
    alignItems: "center",
    padding: 10,
  },
});

export default MealPlanItem;
