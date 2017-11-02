import React, { Component, PropTypes } from 'react';

class Main extens Component {
  constructor (props, context) {
    super(props, context);
  };
}

Main.contextTypes = {
  router: PropTypes.object
};

export default Main;
