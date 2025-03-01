import React from "react";
import ReactDOM from "react-dom/client"; 
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import "./index.css"; 
import "./styles.css"; 

// Get the root element
const rootElement = document.getElementById("root");

// Create a root and render the app
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}

