import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import store from '../stores/MainStore';
import {WIDTH} from '../helpers/consts';
import * as Animatable from 'react-native-animatable';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    await store.getCategories();
  }
  goToGame = () => {
    this.props.navigation.navigate('OptionsScreen');
  };

  render() {
    return (
      <LinearGradient style={styles.container} colors={['#304352', '#d7d2cc']}>
        <Animatable.View animation={'fadeInLeft'} style={styles.animatable}>
          <Text style={styles.title}>Know Answer</Text>
        </Animatable.View>
        <TouchableOpacity style={styles.button} onPress={this.goToGame}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'space-between'},
  button: {
    width: WIDTH - 30,
    backgroundColor: '#304352',
    height: 60,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
  buttonText: {fontSize: 20, color: '#fff', fontFamily: 'Quicksand-Bold'},
  animatable: {
    marginTop: 50,
    width: WIDTH - 20,
    backgroundColor: '#d7d2cc',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  title: {fontFamily: 'Quicksand-Bold', fontSize: 40, color: '#fff'},
});
