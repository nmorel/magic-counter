import React, {Component} from 'react';
import {StyleSheet, Text, View, NativeModules} from 'react-native';

const UIManager = NativeModules.UIManager;

export class FitText extends Component {
  state = {
    size: 20,
    complete: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.text.length !== this.props.text.length) {
      console.log('reset');
      this.setState({
        size: 20,
        complete: false,
      });
    }
  }

  componentDidUpdate() {
    if (!this.state.complete) {
      console.log('didupdate setsize');
      this.setSize();
    }
  }

  setSize = () => {
    if (this.sizing) {
      console.log('setSize en cour');
      return;
    }
    this.sizing = true;
    this.size = this.state.size;
    setTimeout(this.doSetSize);
  };

  doSetSize = (delta = 100) => {
    if (delta > 1000 || delta < 0) {
      this.setState({complete: true});
      this.sizing = false;
    }

    console.log('doSetSize', delta);
    this.refs.field.measure((x, y, width, height, px, py) => {
      console.log({width, height, viewHeight: this.viewHeight, viewWidth: this.viewWidth, size: this.size});
      if (this.viewHeight < height || this.viewWidth < width) {
        if (this.size <= 10) {
          this.setState({size: this.size, complete: true}, () => (this.sizing = false));
        } else {
          if (delta <= 10) {
            this.setState({size: (this.size -= delta), complete: true}, () => (this.sizing = false));
          } else {
            this.updateNativeSize(-(delta + delta / 2));
            // this.setState({size: (this.state.size -= delta + delta / 2)});
          }
          this.doSetSize(delta / 2);
        }
      } else {
        if (!this.state.complete) {
          this.updateNativeSize(delta);
          // this.setState({size: (this.state.size += delta)});
          this.doSetSize(delta);
        }
      }
    });
  };

  size;
  updateNativeSize = delta => {
    this.size += delta;
    this.refs.field.setNativeProps({style: {fontSize: this.size}});
  };

  onLayout = ev => {
    const {width, height} = ev.nativeEvent.layout;
    if (width !== this.viewWidth || height !== this.viewHeight) {
      this.viewWidth = width;
      this.viewHeight = height;
      console.log('lala', this.viewWidth, this.viewHeight);
      this.setSize();
    }
  };

  render() {
    this.state.complete && console.log('fontSize', this.state.size);
    return (
      <View onLayout={this.onLayout} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text
          {...this.props}
          ref="field"
          style={[
            this.props.style,
            {
              fontSize: this.state.size,
              width: this.props.width,
              ...(this.state.complete ? {} : {color: 'transparent'}),
            },
          ]}
        >
          {this.props.text}
        </Text>
      </View>
    );
  }
}
