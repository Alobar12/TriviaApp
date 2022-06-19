import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {HEIGHT, WIDTH} from '../helpers/consts';
import LinearGradient from 'react-native-linear-gradient';

export default class Score extends Component {
  constructor(props) {
    super(props);
  }
  goToHome = () => {
    this.props.navigation.navigate('Home');
  };
  score = text => {
    const {params} = this.props.route;
    return (
      <View style={styles.score}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.text}>{params} / 100</Text>
      </View>
    );
  };
  render() {
    const {params} = this.props.route;
    return (
      <LinearGradient colors={['#304352', '#d7d2cc']} style={styles.container}>
        <View style={styles.container_}>
          <View style={styles.scoreTextContainer}>
            <Text style={styles.scoreText}>Score</Text>
          </View>
        </View>
        <View style={styles.text_}>
          {params > 60
            ? this.score('Good Score')
            : this.score('You Can Better')}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.goToHome}>
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1},
  text: {fontFamily: 'Quicksand-Bold', fontSize: 30, color: '#fff'},
  buttonText: {fontFamily: 'Quicksand-Bold', fontSize: 20, color: '#fff'},
  score: {
    width: WIDTH - 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    borderRadius: 5,
  },
  container_: {alignItems: 'center'},
  scoreTextContainer: {
    width: WIDTH - 20,
    borderRadius: 5,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#304352',
    marginTop: 100,
    borderWidth: 0.8,
    borderColor: '#fff',
  },
  scoreText: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 35,
    color: '#fff',
  },
  text_: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: HEIGHT / 3,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderRadius: 5,
    marginRight: 10,
  },
  button: {
    width: WIDTH / 2,
    height: 40,
    backgroundColor: '#304352',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
