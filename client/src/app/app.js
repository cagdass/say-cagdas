import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from "react-router";
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from "../routes.js";
import Main from "../components/main";

injectTapEventPlugin();

render(<Router routes={routes} history={browserHistory}/>, document.getElementById("app"));
