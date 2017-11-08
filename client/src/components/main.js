import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { AppBar, MenuItem, IconMenu, IconButton, TextField, DropDownMenu } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import {deepOrange500} from 'material-ui/styles/colors';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { getMuiTheme, lightBaseTheme, MuiThemeProvider } from 'material-ui/styles';
import Background, { appendMuiBackground, dark, light } from 'material-ui-background';

import config from "../../config.js";

var AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext()

const server_url = config.server_url || "http://cgds.me";
const server_port = config.server_port || 3010;
const url = server_url + ":" + server_port;
const color = light;

const buttonStyle = {
  margin: 12,
};

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

  play() {
    let { uid } = this.state;
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: uid
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
      <MuiThemeProvider>
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
          <RaisedButton
            style={buttonStyle}
            label="Say Çağdaş"
            onClick={this.play.bind(this)} />
        </div>
      </MuiThemeProvider>
    );
  }
}

Main.contextTypes = {
  router: PropTypes.object
};

export default Main;
