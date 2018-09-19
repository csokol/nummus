import React from 'react';
import ReactDOM from 'react-dom';
import './main/css/index.css';
import App from './main/js/application/components/App';
import UUIDGenerator from './main/js/domain/UUIDGenerator';
import registerServiceWorker from './main/js/registerServiceWorker';

ReactDOM.render(<App idGenerator={new UUIDGenerator()} />, document.getElementById('root'));
registerServiceWorker();
