import { PaperProvider } from 'react-native-paper';
import Navigation from './src/navigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { injectStore } from './src/utils/api';
import { Text } from 'react-native';

injectStore(store)
const persistor = persistStore(store)


export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>}  persistor={persistor}>
        <PaperProvider>
          <Navigation />
        </PaperProvider>
      </ PersistGate>
    </Provider>
  );
}
