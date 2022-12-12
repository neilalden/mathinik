import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {ROUTES} from './common/routes';
import HomeScreen from './screens/HomeScreen';
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import PlantDictionaryScreen from './screens/PlantDictionaryScreen';
import PlantRecordScreen from './screens/PlantRecordScreen';
import RegisterScreen from './screens/RegisterScreen';
import NotificationScreen from './screens/Settings/NotificationScreen';
import SettingsScreen from './screens/Settings/SettingsScreen';
const Stack = createStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ROUTES.LANDING_SCREEN}
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}>
        <Stack.Screen name={ROUTES.LANDING_SCREEN} component={LandingScreen} />
        <Stack.Screen name={ROUTES.LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen
          name={ROUTES.REGISTER_SCREEN}
          component={RegisterScreen}
        />
        <Stack.Screen name={ROUTES.HOME_SCREEN} component={HomeScreen} />
        <Stack.Screen
          name={ROUTES.PLANT_DICTIONARY_SCREEN}
          component={PlantDictionaryScreen}
        />
        <Stack.Screen
          name={ROUTES.PLANT_RECORD_SCREEN}
          component={PlantRecordScreen}
        />
        <Stack.Screen
          name={ROUTES.SETTINGS_SCREEN}
          component={SettingsScreen}
        />
        <Stack.Screen
          name={ROUTES.NOTIFICATION_SCREEN}
          component={NotificationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
