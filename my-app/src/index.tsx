import React from "react";
import ReactDOM from "react-dom/client"; // Import from "react-dom/client" for React 18+
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import "./styles.css"; // Import global styles

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

