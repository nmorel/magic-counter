import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Animated,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../actions/gameActions';

const menuWidth  = 200;
const glassColor = 'rgba(0, 0, 0, 0.3)';

class MenuComponent extends Component {

  state = {
    visible: false,
    visibility: new Animated.Value(0),
  };

  toggleMenu = () => {
    if (this.state.visible) {
      this.hideMenu();
    } else {
      this.showMenu();
    }
  };

  showMenu = () => {
    this.setState({
      visible: true
    });
    Animated.timing(this.state.visibility, {
      toValue: 1,
      duration: 200
    }).start();
  };

  hideMenu = () => {
    Animated.timing(this.state.visibility, {
      toValue: 0,
      duration: 200
    }).start(() => {
      this.setState({
        visible: false
      });
    });
  };

  onNewGame = (type) => {
    this.props.actions.newGame(type);
  };

  onReset = () => {
    this.props.actions.resetGame();
  };

  onAddPlayer = () => {
    this.props.actions.addPlayer();
  };

  render() {
    const menuStyle = {
      transform: [
        {
          translateX: this.state.visibility.interpolate({
            inputRange: [0, 1],
            outputRange: [menuWidth, 0]
          })
        }
      ]
    };

    return (
      <View style={styles.container}>
        {this.state.visible && (
          <TouchableHighlight style={[styles.glassPanel]} onPress={this.hideMenu} underlayColor={glassColor}>
            <View />
          </TouchableHighlight>
        )}

        {this.state.visible && (
          <Animated.View style={[styles.menuContainer, menuStyle]}>
            <Button text="New standard" action={() => this.onNewGame('standard')}/>
            <Button text="New duel EDH" action={() => this.onNewGame('duelCommander')}/>
            <Button text="New EDH" action={() => this.onNewGame('commander')}/>
            <Button text="Add player" action={this.onAddPlayer}/>
            <Button text="Reset" action={this.onReset}/>
          </Animated.View>
        )}

        <TouchableHighlight
          style={[styles.menuButton, {backgroundColor: this.state.visible ? '#fff': '#000', borderColor: this.state.visible ? '#000' : 'grey'}]}
          onPress={this.toggleMenu} underlayColor="rgba(0, 0, 0, 0)">
          <View>
            <View style={[styles.bar, {backgroundColor: this.state.visible ? '#000' : 'grey'}]}/>
            <View style={[styles.bar, {marginTop: 0, marginBottom: 0, backgroundColor: this.state.visible ? '#000' : 'grey'}]}/>
            <View style={[styles.bar, {backgroundColor: this.state.visible ? '#000' : 'grey'}]}/>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

function Button({text, action}) {
  return (
    <TouchableHighlight style={[styles.button]} onPress={action}>
      <Text style={[styles.text]}>{text}</Text>
    </TouchableHighlight>
  )
}

export const Menu = connect(
  undefined,
  (dispatch) => ({
    actions: bindActionCreators(gameActions, dispatch)
  })
)(MenuComponent);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  glassPanel: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: glassColor
  },

  menuButton: {
    position: 'absolute',
    top: 0,
    right: 5,
    margin: 5,
    padding: 3,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
    borderStyle: 'solid',
  },

  bar: {
    width: 24,
    height: 4,
    margin: 4,
    backgroundColor: 'grey',
  },

  menuContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: menuWidth,
    backgroundColor: '#fff',
    paddingTop: 50,
  },

  button: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10
  },

  text: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  }
});
