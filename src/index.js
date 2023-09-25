 import React from 'react';
import { ColorModeScript } from '@chakra-ui/react';

import ReactDOM from 'react-dom/client';
import './index.css';
 import { ChakraProvider, theme } from '@chakra-ui/react';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import ChatProvider from './Context/ChatProvider';
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <ChatProvider>
     <ChakraProvider theme={theme}>
        <ColorModeScript />
        <App />
      </ChakraProvider>
  </ChatProvider>
    </BrowserRouter>
);
 
 