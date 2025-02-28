import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { PersistGate } from "redux-persist/integration/react";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router basename="/flat_for_rent">
        <App />
      </Router>
    </PersistGate>
  </Provider>
);
