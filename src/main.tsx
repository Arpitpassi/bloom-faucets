// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./globals.css";
import { ArweaveWalletKit } from "@arweave-wallet-kit/react";
import { UserProvider } from "./hooks/useUser.tsx";
import AoSyncStrategy from "@vela-ventures/aosync-strategy";
import WanderStrategy from "@arweave-wallet-kit/wander-strategy";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ArweaveWalletKit
      config={{
        permissions: [
          "ACCESS_ADDRESS",
          "ACCESS_PUBLIC_KEY",
          "SIGN_TRANSACTION",
          "DISPATCH",
          "SIGNATURE",
        ],
        ensurePermissions: true,
        appInfo: {
          name: "faucets.beta",
        },
        strategies: [
          new AoSyncStrategy(),
          new WanderStrategy(),
        ],
      }}
    >
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </ArweaveWalletKit>
  </React.StrictMode>
);