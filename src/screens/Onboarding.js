import {StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import LottieView from 'lottie-react-native';

export default class OnBoarding extends Component {
  constructor(props) {
    super(props);
  }
  goToHomePage = () => {
    setTimeout(() => {
      this.props.navigation.navigate('Home');
    }, 1000);
  };
  componentDidMount() {
    this.goToHomePage();
  }
  render() {
    return (
      <View style={styles.container}>
        <LottieView
          source={require('../assets/loader/lf20_yuosrbyd.json')}
          autoPlay
          loop
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {flex: 1},
});
