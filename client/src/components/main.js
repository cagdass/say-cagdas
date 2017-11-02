import React, { Component, PropTypes } from 'react';
import { AppBar, MenuItem, IconMenu, IconButton, TextField, RaisedButton, DropDownMenu } from 'material-ui';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';

class Main extends Component {
  constructor (props, context) {
    super(props, context);
  };

  render () {
    return (
      <div>Hello world</div>
    );
  };
}

Main.contextTypes = {
  router: PropTypes.object
};

export default Main;
