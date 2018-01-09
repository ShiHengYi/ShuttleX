import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from './routes';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router children={routes}/>, document.getElementById('root'));

registerServiceWorker();

