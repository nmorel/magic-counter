import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Animated,
  Slider,
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from '../actions/gameActions';

import {icons, Icon} from './Icon';

const menuWidth  = 300;
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

  onRemovePlayer = () => {
    this.props.actions.removePlayer();
  };

  onChangeNumberOfPlayers = (numberOfPlayers) => {
    this.props.actions.setNumberOfPlayers(numberOfPlayers);
  };

  render() {
    const {game} = this.props;

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
            <View style={[styles.menuItem]}>
              <IconAndText icon={icons.new} text="New game"/>
              <Button icon=">" text="Standard" action={() => this.onNewGame('standard')}/>
              <Button icon=">" text="Duel EDH" action={() => this.onNewGame('duelCommander')}/>
              <Button icon=">" text="EDH" action={() => this.onNewGame('commander')}/>
            </View>

            <View style={[styles.menuItem]}>
              <IconAndText icon={icons.addPlayer} text={`Players (${game.get('players').size})`}/>

              <View style={[styles.sliderContainer]}>
                <SmallButton disabled={game.get('players').size <= game.get('minPlayer')} icon={icons.remove} action={this.onRemovePlayer}/>
                <View style={[styles.slider]} >
                  <Slider minimumValue={game.get('minPlayer')} maximumValue={game.get('maxPlayer')} step={1}
                          value={game.get('players').size} style={[{flex: 1}]} onValueChange={this.onChangeNumberOfPlayers}/>
                </View>
                <SmallButton disabled={game.get('players').size >= game.get('maxPlayer')} icon={icons.add} action={this.onAddPlayer}/>
              </View>
            </View>

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
    <TouchableHighlight style={[styles.menuItem, styles.button]} onPress={action}>
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

function SmallButton({icon, disabled, action}) {
  return disabled ? (
    <View style={[styles.smallButton]}>
      <Icon style={[styles.icon, styles.disabled]} icon={icon}/>
    </View>
  ) : (
    <TouchableHighlight style={[styles.smallButton]} onPress={action}>
      <View>
        <Icon style={[styles.icon]} icon={icon}/>
      </View>
    </TouchableHighlight>
  )
}

export const Menu = connect(
  (state) => ({
    game: state.game
  }),
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
    paddingTop: 5,
  },

  menuItem: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },

  button: {
  },

  buttonInner: {
  },

  sliderContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },

  slider: {
    flex: 1,
    paddingTop: 5,
  },

  smallButton: {
    padding: 4,
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
  },

  disabled: {
    color: 'grey',
  },
});
