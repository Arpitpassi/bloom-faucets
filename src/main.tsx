
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./globals.css";
import { ArweaveWalletKit } from "arweave-wallet-kit";
import { UserProvider } from "./hooks/useUser.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ArweaveWalletKit
    config={{
      permissions: [
        "ACCESS_ADDRESS",
        "SIGN_TRANSACTION",
        "ACCESS_PUBLIC_KEY",
        "SIGNATURE",
      ],
      ensurePermissions: true,
      appInfo: {
        name: "TurboUploadApp",
      },
    }}
  >
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </ArweaveWalletKit>
);