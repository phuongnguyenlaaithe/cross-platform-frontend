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
  getAllMeasurement,
  addNewMeasurement,
  deleteMeasurement,
} from "../redux/apiRequests/measurementRequest";
import styles from "./Styles";
import theme from "../theme/index";
import {
  AppHeader,
  AddMeasurementModal,
  RoundButton,
  BottomTabViewAdmin,
  MeasurementItem,
} from "../components";

const MeasurementList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [newMeasurement, setNewMeasurement] = useState({
    name: "",
  });

  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.adminAuth.adminLogin.currentAdmin?.accessToken
  );
  const measurements = useSelector((state) => state.measurement.allMeasurement);
  const isFetching = useSelector((state) => state.measurement.isFetching);

  useEffect(() => {
    if (accessToken) {
      getAllMeasurement(accessToken, dispatch);
    }
  }, [accessToken, dispatch]);

  const filteredMeasurements = measurements.filter((measurement) =>
    measurement.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMeasurement = async () => {
    if (newMeasurement.name) {
      const data = {
        name: newMeasurement.name,
      };

      await addNewMeasurement(accessToken, dispatch, data);

      setNewMeasurement({ name: "" });
      setModalVisible(false);
    } else {
      alert("Please fill in the measurement name.");
    }
  };

  const handleDeleteMeasurement = async (id) => {
    await deleteMeasurement(accessToken, dispatch, id);
  };

  return (
    <View style={styles.root}>
      <AppHeader navigation={navigation} showBackButton={true} />
      <View style={styles.container}>
        <Text style={[styles.title2, { marginBottom: theme.spacing.medium }]}>
          Measurements
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

        {/* Measurement List */}
        {isFetching ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={filteredMeasurements}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: theme.spacing.large }}
            renderItem={({ item }) => (
              <MeasurementItem item={item} handleDeleteMeasurement={handleDeleteMeasurement} />
            )}
          />
        )}
      </View>

      {/* Add Measurement Button */}
      <RoundButton onPress={() => setModalVisible(true)} />

      {/* Add Measurement Modal */}
      <AddMeasurementModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newMeasurement={newMeasurement}
        setNewMeasurement={setNewMeasurement}
        handleAddMeasurement={handleAddMeasurement}
      />

      <BottomTabViewAdmin />
    </View>
  );
};

export default MeasurementList;