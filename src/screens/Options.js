import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import store from '../stores/MainStore';
import {Picker} from '@react-native-picker/picker';
import {HEIGHT, WIDTH} from '../helpers/consts';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

export default class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {type: '', difficulty: 'easy', category: '', isLoading: false};
  }
  goToGame = async () => {
    this.setState({isLoading: true});
    const {type, difficulty, category} = this.state;
    await store.getGame(category, difficulty, type);
    setTimeout(() => {
      this.setState({isLoading: false});
      this.props.navigation.navigate('GameScreen');
    }, 1000);
  };

  renderTitle = (text, marginTop = 0) => {
    return (
      <View style={{alignItems: 'center', marginTop}}>
        <Text style={styles.titleText}>{text}</Text>
      </View>
    );
  };

  renderDifficultButton = (text, value) => {
    return (
      <TouchableOpacity
        style={
          this.state.difficulty === value
            ? styles.difficultyButtonActive
            : styles.difficultyButton
        }
        onPress={() => {
          this.setState({difficulty: value});
        }}>
        <Text>{text}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <LottieView
            style={styles.lottie}
            source={require('../assets/loader/72411-simple-grey-spinner.json')}
            autoPlay
            loop
          />
        </View>
      );
    }
    return (
      <LinearGradient colors={['#304352', '#d7d2cc']} style={{flex: 1}}>
        <View style={{}}>
          <View style={styles.difficultyContainer}>
            {this.renderTitle('Difficulty')}
            <View style={styles.difficulty}>
              {this.renderDifficultButton('Easy', 'easy')}
              {this.renderDifficultButton('Medium', 'medium')}
              {this.renderDifficultButton('Hard', 'hard')}
            </View>
          </View>
          <View style={styles.category}>
            {this.renderTitle('Category', 20)}
            <Picker
              style={styles.topPicker}
              selectedValue={this.state.category}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({category: itemValue});
                console.log(this.state.category);
              }}>
              <Picker.Item label="any" value="" />
              {store.categories.map(item => (
                <Picker.Item key={item.id} label={item.name} value={item.id} />
              ))}
            </Picker>
          </View>
          {this.renderTitle('Type')}
          <Picker
            style={styles.bottomPicker}
            selectedValue={this.state.category}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({category: itemValue});
              console.log(this.state.category);
            }}>
            <Picker.Item label="Multiple Choice" value="multiple" />
            <Picker.Item label="True / False" value="boolean" />
          </Picker>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.goToGame}>
            <Text style={styles.buttonText}>Start Game</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  difficultyButton: {
    width: (WIDTH - 30) / 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.7,
    borderColor: '#eef2f3',
  },
  difficultyButtonActive: {
    width: (WIDTH - 30) / 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.7,
    borderColor: '#eef2f3',
    backgroundColor: '#F2F2F2',
  },
  button: {
    width: WIDTH - 20,
    backgroundColor: '#304352',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonContainer: {
    flex: 1,
    width: WIDTH,
    alignItems: 'center',
    marginTop: HEIGHT / 4,
    justifyContent: 'flex-end',
    marginBottom: 50,
  },
  buttonText: {color: '#fff', fontSize: 20, fontFamily: 'Quicksand-Bold'},
  titleText: {
    fontSize: 22,
    color: '#d7d2cc',
    fontFamily: 'Quicksand-Bold',
  },
  lottie: {backgroundColor: '#304352'},
  loadingContainer: {flex: 1},
  bottomPicker: {
    backgroundColor: '#DBDBDB',
    marginTop: 10,
    marginHorizontal: 10,
  },
  topPicker: {
    backgroundColor: '#DBDBDB',
    marginTop: 10,
    marginHorizontal: 10,
  },
  difficulty: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: WIDTH,
    marginTop: 10,
    height: 50,
  },
  category: {marginBottom: 20},
  difficultyContainer: {marginTop: 100},
});
