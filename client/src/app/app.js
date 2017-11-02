import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from "react-router";
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from "../routes.js";
import Main from "../components/main";

injectTapEventPlugin();

render(<Router routes={routes} history={hashHistory}/>, document.getElementById("app"));
