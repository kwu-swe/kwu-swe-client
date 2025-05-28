import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </CookiesProvider>
  </React.StrictMode>
);
