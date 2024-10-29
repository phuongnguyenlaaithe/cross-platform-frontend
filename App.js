import { PaperProvider } from 'react-native-paper';
import Navigation from './src/navigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </Provider>
  );
}
