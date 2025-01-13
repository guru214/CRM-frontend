import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Adjust the path if necessary

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<App />);


// import React from 'react';
// import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import './index.css';
// import { Provider } from 'react-redux';
// import store,{persistor} from './redux/store';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { PersistGate } from 'redux-persist/integration/react';

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <App />
//       </PersistGate>
//       </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
// // Log performance metrics
// reportWebVitals(console.log);
