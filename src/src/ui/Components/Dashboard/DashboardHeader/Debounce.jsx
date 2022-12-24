import React, {Component, ComponentType} from 'react';
import _debounce from 'lodash.debounce';
import {DebounceSettings} from 'lodash';

class DebounceSCU extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.shouldComponentUpdate;
  }

  render() {
    return this.props.children;
  }
}

class Debounce extends React.Component {
  constructor(props) {
    super(props);
    this.initialComponent = this.props.initialComponent;
    this.state = {
      shouldComponentUpdate: false,
    };
  }

  componentDidMount() {
    this.initialComponent = undefined;
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      // Parent did render. E.g. input change
      clearTimeout(this.timer);
      this.timer = setTimeout(
        () => {
          clearTimeout(this.timer);
          this.setState({
            shouldComponentUpdate: true,
          });
        },
        this.props.ms === undefined ? 250 : this.props.ms
      );
    } else {
      // Parent didn't render, but Debounce did through setState()
      if (this.state.shouldComponentUpdate === true) {
        // Prevent endless loops
        this.setState({
          shouldComponentUpdate: false, // Reset state
        });
      } else {
        // Do nothing * (see 3.)
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <DebounceSCU shouldComponentUpdate={this.state.shouldComponentUpdate}>
        {this.initialComponent === undefined
          ? this.props.children
          : this.initialComponent}
      </DebounceSCU>
    );
  }
}

export default Debounce;
