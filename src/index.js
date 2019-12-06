import React from 'react';
import ReactDOM from "react-dom";
import BoardManager from './components/BoardManager';
import 'materialize-css/dist/css/materialize.min.css'

const wrapper = document.getElementById('app-root');
ReactDOM.render(<BoardManager />, wrapper);
