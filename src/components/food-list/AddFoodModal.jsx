import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../screens/Styles';
import theme from '../../theme/index';
import Iconicons from 'react-native-vector-icons/Ionicons';

const AddFoodModal = ({
    modalVisible,
    setModalVisible,
    newFood,
    setNewFood,
    handleAddFood,
    handleImageUpload,
    setShowCategoryModal,
    setShowMeasurementModal,
}) => {
    return (
        <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: theme.spacing.medium }}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>Cancel</Text>
                        </TouchableOpacity>
                        <Text style={[styles.title2, { textAlign: 'center' }]}>Add Food</Text>
                        <TouchableOpacity onPress={handleAddFood}>
                            <Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>Add</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={[styles.input, { marginBottom: theme.spacing.medium }]}
                        placeholder="Food Name"
                        value={newFood.name}
                        onChangeText={(text) => setNewFood({ ...newFood, name: text })}
                    />

                    <TouchableOpacity 
                    onPress={() => {setModalVisible(false); setShowCategoryModal(true)}} style={[styles.input, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.medium }]}>
                        <Text>{newFood.category || "Select Category"}</Text>
                        <Iconicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {setModalVisible(false); setShowMeasurementModal(true)}} style={[styles.input, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.medium }]}>
                        <Text>{newFood.unit || "Select Measurement"}</Text>
                        <Iconicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
                    </TouchableOpacity>

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
                        onPress={handleImageUpload}>
                        <Ionicons name="camera-outline" size={24} color={theme.colors.white} />
                    </TouchableOpacity>
                    {newFood.imageUri && (
                        <Image source={{ uri: newFood.imageUri }} style={{ width: 150, height: 150, alignSelf: "center", borderRadius: 100 }} />
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default AddFoodModal;