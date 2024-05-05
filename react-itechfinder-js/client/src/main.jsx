import moment from 'moment-timezone';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const style = `background-color: rgb(30 64 175); color: rgb(253 224 71); font-style: italic; border: 5px solid rgb(253 224 71); font-size: 2em; padding: 10px 10px;`;
const warning = `Stop! This is a browser feature intended for developers. If someone told you to copy-paste something here to enable an iTechFinder feature or "hack" someone's account, it is a scam and will give them access to your iTechFinder account.`;

console.log(`%c${warning}`, style);
//redux toolkit import
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store.js';
moment.tz.setDefault('Asia/Manila');
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App />
    </PersistGate>
  </Provider>
);
