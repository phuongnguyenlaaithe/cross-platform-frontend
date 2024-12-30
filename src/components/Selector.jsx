import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import theme from '../theme';

const Selector = ({ data, onSelect }) => {
  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        onValueChange={(itemValue) => {
          onSelect(itemValue);
        }}
      >
        {data.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value.toString()} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.primary,
    borderWidth: 1,
    padding: 2,
    borderRadius: 10,
    height: 40,
    width: 200,
  },

  picker: {
    height: 50,
    width: 200,
  },
});

export default Selector;
