import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import moment from "moment";

const WeeklyCalendar = ({ currentDate, setCurrentDate }) => {
  moment.updateLocale("en", {
    week: {
      dow: 1, // Đặt Thứ Hai là ngày đầu tuần
    },
  });

  // Lấy các ngày trong tuần
  const getWeekDays = () => {
    const startOfWeek = currentDate.clone().startOf("week")
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(startOfWeek.clone().add(i, "days"));
    }
    return days;
  };

  // Thay đổi tuần (trước hoặc sau)
  const changeWeek = (direction) => {
    setCurrentDate((prevDate) =>
      direction === "prev"
        ? prevDate.clone().subtract(1, "week")
        : prevDate.clone().add(1, "week")
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeWeek("prev")}>
          <Icon name="keyboard-arrow-left" size={30} color="#333" />
        </TouchableOpacity>
        <Text style={styles.monthText}>{currentDate.format("MMMM YYYY")}</Text>
        <TouchableOpacity onPress={() => changeWeek("next")}>
          <Icon name="keyboard-arrow-right" size={30} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Hiển thị ngày trong tuần */}
      <View style={styles.weekContainer}>
        <View style={styles.dayLabels}>
          {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day, index) => (
            <Text key={index} style={styles.dayLabel}>
              {day}
            </Text>
          ))}
        </View>
        <View style={styles.days}>
          {getWeekDays().map((day, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setCurrentDate(day)} // Cập nhật ngày được chọn
            >
              <Text
                style={[
                  styles.dayNumber,
                  day.isSame(currentDate, "day") && styles.selectedDay, // Ngày được chọn
                  day.isSame(moment(), "day") && styles.currentDay, // Ngày hiện tại
                ]}
              >
                {day.date()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: 300,
  },
  arrow: {
    fontSize: 18,
    color: "#333",
  },
  monthText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  weekContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  dayLabels: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  days: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dayNumber: {
    fontSize: 16,
    color: "#333",
    width: 30,
    height: 30,
    textAlign: "center",
    lineHeight: 30,
  },
  selectedDay: {
    color: "#fff",
    backgroundColor: "#FF9800", // Màu cho ngày được chọn
    borderRadius: 15,
    width: 30,
    height: 30,
    textAlign: "center",
    lineHeight: 30,
  },
  currentDay: {
    color: "#fff",
    backgroundColor: "#6200ea",
    borderRadius: 15,
    width: 30,
    height: 30,
    textAlign: "center",
    lineHeight: 30,
  },
});

export default WeeklyCalendar;
