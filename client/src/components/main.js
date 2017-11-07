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
const source = context.createBufferSource()

const server_url = config.server_url || "http://localhost";
const server_port = config.server_port || 3009;
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
  }

  play() {
    const options = { method: 'GET' }
    console.log(url);
    fetch(url, options)
    .then(response => response.arrayBuffer())
    .then(response => {
      context.decodeAudioData(response, buffer => {
        source.buffer = buffer;
        source.connect(context.destination);
        source.start(context.currentTime);
      });
    })
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
