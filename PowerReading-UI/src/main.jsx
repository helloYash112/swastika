
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from'react-router-dom'
import { Provider } from 'react-redux'
import {store} from './store.js'
//import {configureStore} from '@reduxjs/toolkit'
import './index.css'
import App from './App.jsx'
/*
const store=configureStore({
    reducer:{}
});*/

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
<Provider store={store}>
<App></App>
</Provider>
</BrowserRouter>
);
