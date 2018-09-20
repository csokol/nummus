import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../../../main/js/application/components/App';
import LocalStorageMock from "../LocalStorageMock";

const localStorageMock = new LocalStorageMock();
global.localStorage = localStorageMock;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

