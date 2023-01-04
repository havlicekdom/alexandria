import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'context/ThemeContext';
import { store, persistor } from 'store/store';
import { injectStore } from 'utils/api';
import 'normalize.css/normalize.css';
import App from './components/App';

injectStore(store);

const PGate = PersistGate as any;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PGate loading={null} persistor={persistor}>
        <Router>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Router>
      </PGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
