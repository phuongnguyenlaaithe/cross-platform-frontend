import React, { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import styles from "./Styles";
import DonutChart from "../components/report/DonutChart";
import { AppHeader, SelectionModal } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { getAllFridgeItems } from "../redux/apiRequests/fridgeItemRequest";
import theme from "../theme";

const Report = ({ navigation }) => {
  const [period, setPeriod] = useState(7);
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.accessToken
  );
  const fridgeItems = useSelector((state) => state.fridgeItem.allFridgeItems);
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken) {
      getAllFridgeItems(accessToken, dispatch);
    }
  }, [accessToken, dispatch]);

  const isWithinPeriod = (createdAt, days) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const periodStart = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    return createdDate >= periodStart && createdDate <= now;
  };

  useEffect(() => {
    const filteredItems = fridgeItems.filter((item) =>
      isWithinPeriod(item.createdAt, period)
    );

    const categoryMap = new Map();
    filteredItems.forEach((item) => {
      const categoryId = item.food.category.id;
      const categoryName = item.food.category.name;

      if (categoryMap.has(categoryId)) {
        categoryMap.get(categoryId).count += 1;
      } else {
        categoryMap.set(categoryId, {
          id: categoryId,
          name: categoryName,
          count: 1,
        });
      }
    });

    const foodMap = new Map();
    filteredItems.forEach((item) => {
      const foodId = item.food.id;
      const foodName = item.food.name;
      const foodKey = `${foodId}-${item.food.unitId}`;
      if (foodMap.has(foodKey)) {
        foodMap.get(foodKey).quantity += item?.quantity;
      } else {
        foodMap.set(foodKey, {
          id: foodId,
          name: foodName,
          quantity: item.quantity,
          unit: item.food.unit.name,
        });
      }
    });
    const tableData = Array.from(foodMap.values());
    setTableData(tableData);

    const chartData = Array.from(categoryMap.values());
    setData(chartData);
  }, [fridgeItems, period]);

  const periodValue = [
    { id: "1", name: "Last 7 days", value: 7 },
    { id: "2", name: "Last 30 days", value: 30 },
  ];

  const handleSelectPeriod = (item) => {
    setPeriod(item.value);
    setModalVisible(false);
  };

  if (data.length === 0 || tableData.length === 0) {
    return null;
  }

  return (
    <View style={styles.root}>
      <AppHeader navigation={navigation} showBackButton={true} />
      <View style={[styles.container]}>
        <Text style={styles.title1}>Report</Text>
        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity style={reportStyles.button} onPress={() => setModalVisible(true)}>
            <Text style={reportStyles.buttonText}>Select Period</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 3 }}>
          <DonutChart data={data} />
        </View>

        <View style={{ flex: 2, marginTop: 20 }}>
          <Text style={reportStyles.tableTitle}>Food Inventory</Text>
          <FlatList
            data={tableData}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => (
              <View style={reportStyles.tableRow}>
                <Text style={reportStyles.tableCell}>{item.name}</Text>
                <Text style={reportStyles.tableCell}>{item.quantity.toString() + item.unit}</Text>
              </View>
            )}
          />
        </View>
      </View>

      <SelectionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        data={periodValue}
        onSelect={handleSelectPeriod}
        title="Select Period"
      />
    </View>
  );
};

const reportStyles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderLeftWidth: 1, // Viền trái
    borderLeftColor: '#ddd', // Màu viền trái
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    padding: 5, // Khoảng cách trong ô
    borderRightWidth: 1, // Viền phải cho các ô
    borderRightColor: '#ddd', // Màu viền phải
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.small,
    alignItems: 'center',
    marginTop: theme.spacing.medium,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Report;