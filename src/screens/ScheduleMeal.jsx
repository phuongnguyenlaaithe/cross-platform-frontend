import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AppHeader } from "../components";
import WeeklyCalendar from "../components/schedule-meal/WeeklyCalendar";
import moment from "moment";
import theme from "../theme";
import styles from "./Styles";
import { useSelector, useDispatch } from "react-redux";
import AddMealScheduleModal from "../components/schedule-meal/AddMealScheduleModal";
import { getAllMealPlanAPI } from "../redux/apiRequests/mealPlanRequest";
import MealPlanItem from "../components/schedule-meal/MealPlanItem";
import { getAllFoods } from "../redux/apiRequests/foodRequest";

const ScheduleMeal = ({ navigation }) => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [modalVisible, setModalVisible] = useState(false);
  const mealPlanItems = useSelector((state) => state.mealPlan.allMealPlan);
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser?.accessToken
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken) {
      getAllMealPlanAPI(accessToken, dispatch);
      getAllFoods(accessToken, dispatch);
    }
  }, [accessToken, dispatch]);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  console.log(
    mealPlanItems.filter((item) =>
      moment(item.timestamp).isSame(currentDate, "day")
    )
  );
    console.log(currentDate);
  console.log(mealPlanItems[1].timestamp);
  return (
    <View style={styles.root}>
      <AppHeader navigation={navigation} showBackButton={true} />
      <View style={styles.container}>
        <Text style={[styles.title2, { marginBottom: theme.spacing.medium }]}>
          Schedule Meal
        </Text>
        <WeeklyCalendar
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        <FlatList
          data={mealPlanItems.filter((item) => moment(item.timestamp).isSame(currentDate, "day"))}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MealPlanItem item={item} />
          )}
          style={{ marginTop: 10 }}
        />
        <TouchableOpacity
          style={roundButtonStyle.button}
          onPress={() => handleOpenModal()}
        >
          <Text style={roundButtonStyle.text}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <AddMealScheduleModal
          currentDate={currentDate}
          onClose={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

const roundButtonStyle = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: theme.colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  text: {
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default ScheduleMeal;
