import React from 'react';
import ReactDOM from 'react-dom';
import './main/css/index.css';
import App from './main/js/App';
import registerServiceWorker from './main/js/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
