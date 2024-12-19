import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal } from 'react-native';
import theme from '../theme/index';
import styles from '../screens/Styles';

const SelectionModal = ({ visible, onClose, data, onSelect, title }) => {
    return (
        <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.title2}>{title}</Text>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => onSelect(item)}
                                style={{
                                    padding: theme.spacing.medium,
                                    borderBottomWidth: 1,
                                    borderBottomColor: theme.colors.bgDark
                                }}>
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity
                        onPress={onClose}
                        style={{ marginTop: theme.spacing.medium, alignItems: "center", }}>
                        <Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default SelectionModal;