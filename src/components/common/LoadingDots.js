import React, { Component, PropTypes } from 'react';

class LoadingDots extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = { frame: 1 };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        frame: this.state.frame + 1
      });
    }, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let dots = this.state.frame % (this.props.dots + 1);
    let text = '';
    /* eslint-disable no-plusplus */
    while (dots > 0) {
      text += '.';
      dots--;
    }

    return (
      <span>{text}</span>
    );
  }
}

LoadingDots.propTypes = { 
  interval: PropTypes.number,
  dots: PropTypes.number
};

LoadingDots.defaultProps = {
  interval: 250,
  dots: 3
};

export default LoadingDots;