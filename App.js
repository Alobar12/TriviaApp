import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import store from './src/stores/MainStore';
import {Provider} from 'mobx-react';
import Game from './src/screens/Game';
import Options from './src/screens/Options';
import Onboarding from './src/screens/Onboarding';
import Score from './src/screens/Score';

const Stack = createNativeStackNavigator();
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="OnboardingScreen"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="GameScreen" component={Game} />
            <Stack.Screen name="OptionsScreen" component={Options} />
            <Stack.Screen name="OnboardingScreen" component={Onboarding} />
            <Stack.Screen name="ScoreScreen" component={Score} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
