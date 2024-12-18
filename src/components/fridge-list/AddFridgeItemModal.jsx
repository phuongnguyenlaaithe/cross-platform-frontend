import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import styles from '../../screens/Styles';
import theme from '../../theme/index';
import DateTimePicker from '@react-native-community/datetimepicker';
import Iconicons from 'react-native-vector-icons/Ionicons';

const AddFridgeItemModal = ({
    foods,
    units,  
    modalVisible,
    setModalVisible,
    newFridgeItem,
    setNewFridgeItem,
    handleAddFridgeItem,
    setShowFoodModal,
}) => {
    const food = newFridgeItem.foodId ? foods.find(food => food.id === newFridgeItem.foodId) : null;
    const unit = food ? units.find(unit => unit.id === food.unitId) : null;

    const onStartDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || new Date(newFridgeItem.startDate);
        if (new Date(newFridgeItem.expiredDate) < currentDate) {
            Alert.alert("Invalid Date", "Start date cannot be after expired date.");
        } else {
            setNewFridgeItem({ ...newFridgeItem, startDate: currentDate.toISOString() });
        }
    };

    const onExpiredDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || new Date(newFridgeItem.expiredDate);
        if (currentDate < new Date(newFridgeItem.startDate)) {
            Alert.alert("Invalid Date", "Expired date cannot be before start date.");
        } else {
            setNewFridgeItem({ ...newFridgeItem, expiredDate: currentDate.toISOString() });
        }
    };

    return (
        <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: theme.spacing.medium }}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>Cancel</Text>
                        </TouchableOpacity>
                        <Text style={[styles.title2, { textAlign: 'center' }]}>Add Fridge Item</Text>
                        <TouchableOpacity onPress={handleAddFridgeItem}>
                            <Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>Add</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={() => { setModalVisible(false); setShowFoodModal(true) }}
                        style={[styles.input, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.medium }]}>
                        <Text>{newFridgeItem.foodId ? `${newFridgeItem.foodName}` : "Select Food"}</Text>
                        <Iconicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.medium }}>
                        <TextInput
                            style={{ 
                                backgroundColor: theme.colors.white,
                                paddingHorizontal: theme.spacing.medium,
                                paddingVertical: theme.spacing.small,
                                borderRadius: theme.borderRadius.full,
                                width: "30%",
                                ...theme.shadows.button,
                                height: 40, }}
                            placeholder="Quantity"
                            value={newFridgeItem.quantity ? newFridgeItem.quantity.toString() : ""}
                            onChangeText={(text) => setNewFridgeItem({ ...newFridgeItem, quantity: parseInt(text) })}
                            keyboardType="numeric"
                            editable={!!newFridgeItem.foodId}
                        />
                        {unit && (
                            <Text style={{
                                backgroundColor: theme.colors.bgLight,
                                paddingHorizontal: theme.spacing.medium,
                                paddingVertical: theme.spacing.small,
                                borderRadius: theme.borderRadius.full,
                                ...theme.shadows.button,
                                marginLeft: theme.spacing.medium,
                                height: 40,
                            }}>{unit.name}</Text>)}
                    </View>

                    <TextInput
                        style={[styles.input, { marginBottom: theme.spacing.medium }]}
                        placeholder="Note"
                        value={newFridgeItem.note}
                        onChangeText={(text) => setNewFridgeItem({ ...newFridgeItem, note: text })}
                    />

                    <View style={{ flexDirection: "row", alignItems: "center", marginLeft: theme.spacing.small, marginBottom: theme.spacing.medium }}>
                        <Text>Start Date: </Text>
                        <DateTimePicker
                            value={newFridgeItem.startDate ? new Date(newFridgeItem.startDate) : new Date()}
                            mode="date"
                            display="default"
                            onChange={onStartDateChange}
                        />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginLeft: theme.spacing.small, marginBottom: theme.spacing.medium }}>
                        <Text>Expired Date: </Text>
                        <DateTimePicker
                            value={newFridgeItem.expiredDate ? new Date(newFridgeItem.expiredDate) : new Date()}
                            mode="date"
                            display="default"
                            onChange={onExpiredDateChange}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default AddFridgeItemModal;