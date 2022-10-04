import React from "react";
import "../styles/globals.css";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import adminReducer from "../state/admin";
import programReducer from "../state/program";
import { Toaster } from "react-hot-toast";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    program: programReducer,
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Toaster />
    </Provider>
  );
}

export default MyApp;
