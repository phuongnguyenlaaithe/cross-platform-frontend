import React from 'react';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import Navigation from './src/navigation';
import { store } from './src/redux/store';
import AuthLoader from './src/AuthLoader';

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AuthLoader>
          <Navigation />
        </AuthLoader>
      </PaperProvider>
    </Provider>
  );
};

export default App;