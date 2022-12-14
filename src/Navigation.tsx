import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {ROUTES} from './common/routes';
import LandingScreen from './screens/LandingScreen';
import GradesScreen from './screens/GradesScreen';
import HomeScreen from './screens/HomeScreen';
import LeaderboardsScreen from './screens/LeaderboardsScreen';
import PeopleScreen from './screens/PeopleScreen';
import RegisterScreen from './screens/RegisterScreen';
import CreateTodoScreen from './screens/TodoScreens/CreateTodoScreen';
import AddQuestionScreen from './screens/TodoScreens/AddQuestionScreen';
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
        <Stack.Screen name={ROUTES.GRADES_SCREEN} component={GradesScreen} />
        <Stack.Screen name={ROUTES.HOME_SCREEN} component={HomeScreen} />
        <Stack.Screen
          name={ROUTES.LEADERBOARDS_SCREEN}
          component={LeaderboardsScreen}
        />
        <Stack.Screen name={ROUTES.PEOPLE_SCREEN} component={PeopleScreen} />
        <Stack.Screen
          name={ROUTES.REGISTER_SCREEN}
          component={RegisterScreen}
        />
        <Stack.Screen
          name={ROUTES.ADD_QUESTION_SCREEN}
          component={AddQuestionScreen}
        />
        <Stack.Screen
          name={ROUTES.CREATE_TODO_SCREEN}
          component={CreateTodoScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
