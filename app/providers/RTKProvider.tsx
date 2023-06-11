"use client";

import { Provider } from "react-redux";
import { store } from "../services/store";

const RTKProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default RTKProvider;
