import React from 'react';
import Navigation from './src/Navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import stores from './src/services/redux/store';
import {PermissionsAndroid} from 'react-native';

const App = () => {
  const {store, persistor} = stores();
  React.useEffect(() => {
    (async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Math-Galing Storage Permission',
            message:
              'Math-Galing needs access to your storage ' +
              'so you can upload files from your storage',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
      } catch (error) {}
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Math-Galing Storage Permission',
            message:
              'Math-Galing needs access to your storage ' +
              'so you can save files to your storage',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
      } catch (error) {}
    })();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
