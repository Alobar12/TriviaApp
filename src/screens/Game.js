import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import Carousel from 'react-native-snap-carousel';
import {HEIGHT, WIDTH} from '../helpers/consts';
import store from '../stores/MainStore';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      isTrue: false,
      isFalse: false,
      total: 0,
      isFinite: false,
    };
    this.carousel = null;
  }

  replaceHtmlEntities(str) {
    var translate_re = /&(nbsp|amp|quot|lt|gt|rsquo);/g,
      translate = {
        nbsp: String.fromCharCode(160),
        amp: '&',
        quot: '"',
        lt: '<',
        gt: '>',
        rsquo: String.fromCharCode(39),
      },
      translator = function ($0, $1) {
        return translate[$1];
      };
    let _str = str.replace('&#039;', '`');

    return _str.replace(translate_re, translator);
  }

  answerCorrect = (answer, correct) => {
    if (this.state.activeIndex === 9) {
      setTimeout(() => {
        this.setState({isFinite: false});
        this.props.navigation.navigate('ScoreScreen', this.state.total);
      }, 3000);
      this.setState({isFinite: true});
    } else if (answer === correct) {
      setTimeout(() => {
        this.setState({isTrue: false});
        this.carousel && this.carousel.snapToNext();
      }, 2000);
      this.setState({isTrue: true});
      this.setState({total: this.state.total + 10});
    } else {
      setTimeout(() => {
        this.setState({isFalse: false});
        this.carousel && this.carousel.snapToNext();
      }, 2000);
      this.setState({isFalse: true});
    }
  };
  correctTrue = () => {
    const {isTrue} = this.state;
    const animation_ = isTrue ? 'fadeInUp' : 'fadeOutDown';
    return (
      <Animatable.View animation={animation_} style={styles.true}>
        <Animatable.View
          style={styles.container}
          animation={'pulse'}
          iterationCount={'infinite'}>
          <LottieView
            source={require('../assets/loader/74694-confetti.json')}
            autoPlay
            loop
          />
        </Animatable.View>
      </Animatable.View>
    );
  };
  correctFalse = () => {
    const {isFalse} = this.state;
    return (
      <View style={styles.false}>
        <View style={styles.container}>
          <LottieView
            source={require('../assets/loader/18053-no-error-cancelled.json')}
            autoPlay
          />
        </View>
      </View>
    );
  };
  correctFinite = () => {
    return (
      <View style={styles.finite}>
        <View style={styles.container}>
          <LottieView
            source={require('../assets/loader/67230-trophy-winner.json')}
            autoPlay
            loop
          />
        </View>
      </View>
    );
  };
  _renderItem = ({item, index}) => {
    const correct = item.correct_answer;
    return (
      <LinearGradient colors={['#304352', '#d7d2cc']} style={styles.renderItem}>
        <View>
          <View style={styles.active}>
            <Text style={styles.activeIndex}>
              Question {this.state.activeIndex + 1}/10
            </Text>
            <Text style={styles.activeIndex}>
              {item.difficulty.toUpperCase()}
            </Text>
          </View>
          <View style={styles.question}>
            <Text style={styles.questionText}>
              {this.replaceHtmlEntities(item.question)}
            </Text>
          </View>
          {item.incorrect_answers.map((answer, i) => (
            <TouchableOpacity
              style={styles.answer}
              onPress={() => {
                this.answerCorrect(answer, correct);
              }}
              key={i}>
              <Text style={styles.answerText}>{answer}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
    );
  };

  render() {
    const {isTrue, isFalse, isFinite} = this.state;
    // if (isTrue) {
    //   return this.correctTrue();
    // }

    return (
      <View style={styles.container}>
        <Carousel
          scrollEnabled={false}
          layout={'default'}
          ref={ref => (this.carousel = ref)}
          data={store.questions}
          sliderWidth={WIDTH}
          itemWidth={HEIGHT}
          renderItem={this._renderItem}
          onBeforeSnapToItem={activeIndex => {
            this.setState({activeIndex});
          }}
        />
        {isTrue && this.correctTrue()}
        {isFalse && this.correctFalse()}
        {isFinite && this.correctFinite()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1},
  true: {
    backgroundColor: 'rgba(0,0,0,.35)',
    position: 'absolute',
    top: 0,
    width: WIDTH,
    height: HEIGHT,
  },
  false: {
    backgroundColor: 'rgba(0,0,0,.35)',
    position: 'absolute',
    top: 0,
    width: WIDTH,
    height: HEIGHT,
  },
  answerText: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Quicksand-Bold',
  },
  answer: {
    width: WIDTH - 20,
    marginLeft: 10,
    borderRadius: 5,
    height: 50,
    marginBottom: 10,
    backgroundColor: '#d7d2cc',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9,
  },
  questionText: {
    fontSize: 20,
    color: '#fff',
    margin: 5,
    fontFamily: 'Quicksand-Bold',
  },
  question: {
    alignItems: 'center',
    marginLeft: 10,
    width: WIDTH - 20,
    backgroundColor: '#304352',
    height: 150,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 20,
    marginTop: 80,
    justifyContent: 'center',
  },
  activeIndex: {fontFamily: 'Quicksand-Bold', fontSize: 20},
  active: {
    width: WIDTH - 20,
    backgroundColor: '#DBDBDB',
    marginLeft: 10,
    height: 70,
    marginTop: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderItem: {flex: 1},
  finite: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    width: WIDTH,
    height: HEIGHT,
  },
});
