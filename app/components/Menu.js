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

import {icons, Icon} from './Icon';

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
            <View style={[styles.button]}>
              <IconAndText icon={icons.new} text="New game"/>
              <Button icon=">" text="Standard" action={() => this.onNewGame('standard')}/>
              <Button icon=">" text="Duel EDH" action={() => this.onNewGame('duelCommander')}/>
              <Button icon=">" text="EDH" action={() => this.onNewGame('commander')}/>
            </View>

            <Button icon={icons.addPlayer} text="Add a player" action={this.onAddPlayer}/>

            <Button icon={icons.reset} text="Reset" action={this.onReset}/>
          </Animated.View>
        )}

        <TouchableHighlight
          style={[styles.menuButton, {backgroundColor: this.state.visible ? '#fff': '#000', borderColor: this.state.visible ? '#000' : 'grey'}]}
          onPress={this.toggleMenu} underlayColor="rgba(0, 0, 0, 0)">
          <View>
            <Icon icon={icons.menu} style={[styles.menuIcon]} />
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

function Button({text, icon, action}) {
  return (
    <TouchableHighlight style={[styles.button]} onPress={action}>
      <View style={[styles.buttonInner]}>
        <IconAndText icon={icon} text={text}/>
      </View>
    </TouchableHighlight>
  )
}

function IconAndText({icon, text, style}) {
  return (
    <View style={[styles.iconAndText]}>
      {icon && <Icon icon={icon} style={[styles.icon, style]}/>}
      {text && <Text style={[styles.text, style]}>{text}</Text>}
    </View>
  );
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

  menuIcon: {
    color: 'grey',
    fontSize: 32,
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
    marginRight: 10,
  },

  buttonInner: {
  },

  iconAndText: {
    flexDirection: 'row',
  },

  icon: {
    fontSize: 24,
    color: '#000',
    marginTop: 2,
    marginRight: 5,
  },

  text: {
    fontSize: 20,
    color: '#000',
  }
});
