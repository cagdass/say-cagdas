import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

import config from "../../config.js";

const server_url = config.server_url;
const server_port = config.server_port;
const url = server_url + ":" + server_port;

var AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext()

const mainDivStyle = {
  display: 'flex',
  marginTop: '20em',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column'
};

class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      uid: Math.floor(Math.random() * 2147483648),
    }
  }

  play(e) {
    let { uid } = this.state;
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "uid": uid
      })
    };
    console.log(url);
    fetch(url, options)
    .then(response => response.arrayBuffer())
    .then(response => {

      let source = context.createBufferSource()
      context.decodeAudioData(response, buffer => {
        source.buffer = buffer;
        source.connect(context.destination);
        source.start(context.currentTime);
      });
    })
    .catch(error => {
      console.error(error);
    });
  }

  render() {
    return (
        <div className="Track"
          style={mainDivStyle}>
          <br />
          <br />
          <div>
            {this.props.id}
          </div>
          <div>
            {this.props.title}
          </div>
            <button
                style={{padding: 10, fontSize: 24, fontFamily: 'comic sans ms'}}
                onClick={this.play.bind(this)}>
                Say Çağdaş
            </button>
        </div>

    );
  }
}

Main.contextTypes = {
  router: PropTypes.object
};

export default Main;
