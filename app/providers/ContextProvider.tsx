"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";

interface ProviderProps {
  children: React.ReactNode;
}

const ReduxProvider: React.FC<ProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
