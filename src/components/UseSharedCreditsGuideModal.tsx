"use client"

import { X, ClipboardPen } from "lucide-react"
import { copyToClipboard } from "../utils/utils"

interface UseSharedCreditsGuideModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function UseSharedCreditsGuideModal({ isOpen, onClose }: UseSharedCreditsGuideModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-2 border-gray-300 max-w-4xl w-full max-h-[85vh] overflow-y-auto p-8 sm:p-10 relative rounded-none">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold hover:text-gray-600 p-1 hover:bg-gray-100 transition-colors rounded-none"
        >
          <X className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold mb-6">Bloom Faucets: Upload to Arweave Using Sponsored Credits</h1>
        <p className="mb-6 text-gray-600">
          Easily upload your data to Arweave without paying from your own wallet, using shared credits from a Bloom
          Faucet.
        </p>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-none">
          <p className="font-semibold text-red-800">
            Note: To use sponsored credits, your wallet address must be whitelisted by the sponsor.
          </p>
        </div>
        <h2 className="text-xl font-semibold mt-8 mb-4">Quick Start</h2>
        <p className="mb-4 text-gray-600">
          Here’s how to upload with Bloom Faucet credits based on how you're uploading:
        </p>
        <table className="w-full border-collapse mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-3 text-left text-sm font-semibold">Method</th>
              <th className="border border-gray-300 p-3 text-left text-sm font-semibold">How to use Faucet credits</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-3 text-gray-600">Turbo CLI</td>
              <td className="border border-gray-300 p-3 text-gray-600">
                No extra steps. CLI will auto-use any Faucet credits.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3 text-gray-600">Bloom Uploads</td>
              <td className="border border-gray-300 p-3 text-gray-600">
                Create profile to generate a new wallet, or connect a wallet with sponsored credits then simply add the
                sponsors wallet address and upload easily after the quick setup
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3 text-gray-600">Turbo SDK</td>
              <td className="border border-gray-300 p-3 text-gray-600">
                Use the <code className="bg-gray-200 px-1 rounded-none">paidBy</code> option with the sponsor’s wallet
                address. See info below
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-3 text-gray-600">HTTP API</td>
              <td className="border border-gray-300 p-3 text-gray-600">
                Set <code className="bg-gray-200 px-1 rounded-none">x-paid-by</code> header to the sponsor’s wallet
                address. See info below
              </td>
            </tr>
          </tbody>
        </table>
        <h2 className="text-xl font-semibold mt-8 mb-4">Step-by-Step Guide</h2>
        <h3 className="text-lg font-semibold mt-6 mb-3">Option 1: Using Turbo CLI</h3>
        <ol className="list-decimal pl-6 mb-4 space-y-4 text-gray-600">
          <li>
            <strong>Install Turbo CLI</strong>
            <div className="relative">
              <pre className="bg-gray-100 p-4 rounded-none overflow-x-auto">
                <code>npm install -g @ardrive/turbo-sdk</code>
              </pre>
              <button
                onClick={() => copyToClipboard("npm install -g @ardrive/turbo-sdk")}
                className="absolute top-2 right-2 text-brand-night hover:text-brand-night/80 transition-colors"
                title="Copy to clipboard"
              >
                <ClipboardPen className="w-5 h-5" />
              </button>
            </div>
          </li>
          <li>
            <strong>Get Your Arweave Wallet</strong>
            <p className="my-2">
              Download and save your wallet key file (e.g.,{" "}
              <code className="bg-gray-200 px-1 rounded-none">wallet.json</code>) securely.
            </p>
          </li>
          <li>
            <strong>Upload a File</strong>
            <div className="relative">
              <pre className="bg-gray-100 p-4 rounded-none overflow-x-auto">
                <code>turbo upload-file --file-path ./public/stock.jpeg --wallet-file ./wallet.json</code>
              </pre>
              <button
                onClick={() =>
                  copyToClipboard("turbo upload-file --file-path ./public/stock.jpeg --wallet-file ./wallet.json")
                }
                className="absolute top-2 right-2 text-brand-night hover:text-brand-night/80 transition-colors"
                title="Copy to clipboard"
              >
                <ClipboardPen className="w-5 h-5" />
              </button>
            </div>
            <p className="my-2">
              This will automatically use any available sponsored credits without needing extra setup.
            </p>
          </li>
        </ol>
        <h3 className="text-lg font-semibold mt-6 mb-3">Option 2: Using Turbo SDK (Node.js)</h3>
        <ol className="list-decimal pl-6 mb-4 space-y-4 text-gray-600">
          <li>
            <strong>Install SDK</strong>
            <div className="relative">
              <pre className="bg-gray-100 p-4 rounded-none overflow-x-auto">
                <code>npm install @ardrive/turbo-sdk</code>
              </pre>
              <button
                onClick={() => copyToClipboard("npm install @ardrive/turbo-sdk")}
                className="absolute top-2 right-2 text-brand-night hover:text-brand-night/80 transition-colors"
                title="Copy to clipboard"
              >
                <ClipboardPen className="w-5 h-5" />
              </button>
            </div>
          </li>
          <li>
            <strong>Example Upload Script</strong>
            <div className="relative">
              <pre className="bg-gray-100 p-4 rounded-none overflow-x-auto">
                <code>{`import { TurboFactory, ArweaveSigner } from "@ardrive/turbo-sdk/node";
import fs from "fs";
import path from "path";

(async () => {
const jwk = JSON.parse(fs.readFileSync("./wallet.json", "utf8"));
const signer = new ArweaveSigner(jwk);
const turbo = TurboFactory.authenticated({ signer });
const filePath = path.join(process.cwd(), "./public/stock.jpeg");
const fileSize = fs.statSync(filePath).size;
const { id } = await turbo.uploadFile({
  fileStreamFactory: () => fs.createReadStream(filePath),
  fileSizeFactory: () => fileSize,
  dataItemOpts: {
    tags: [{ name: "Content-Type", value: "image/jpeg" }],
    paidBy: "SPONSOR_WALLET_ADDRESS",
  },
});
console.log("Upload successful! ID:", id);
})();
`}</code>
              </pre>
              <button
                onClick={() =>
                  copyToClipboard(`import { TurboFactory, ArweaveSigner } from "@ardrive/turbo-sdk/node";
import fs from "fs";
import path from "path";

(async () => {
const jwk = JSON.parse(fs.readFileSync("./wallet.json", "utf8"));
const signer = new ArweaveSigner(jwk);
const turbo = TurboFactory.authenticated({ signer });
const filePath = path.join(process.cwd(), "./public/stock.jpeg");
const fileSize = fs.statSync(filePath).size;
const { id } = await turbo.uploadFile({
  fileStreamFactory: () => fs.createReadStream(filePath),
  fileSizeFactory: () => fileSize,
  dataItemOpts: {
    tags: [{ name: "Content-Type", value: "image/jpeg" }],
    paidBy: "SPONSOR_WALLET_ADDRESS",
  },
});
console.log("Upload successful! ID:", id);
})();
`)
                }
                className="absolute top-2 right-2 text-brand-night hover:text-brand-night/80 transition-colors"
                title="Copy to clipboard"
              >
                <ClipboardPen className="w-5 h-5" />
              </button>
            </div>
            <p className="my-2">
              Replace <code className="bg-gray-200 px-1 rounded-none">"SPONSOR_WALLET_ADDRESS"</code> with your
              sponsor’s actual wallet address.
            </p>
          </li>
        </ol>
        <h3 className="text-lg font-semibold mt-6 mb-3">Option 3: Using HTTP API</h3>
        <ol className="list-decimal pl-6 mb-4 space-y-4 text-gray-600">
          <li>
            <strong>Prepare Your Data Item</strong>
            <p className="my-2">
              Use <code className="bg-gray-200 px-1 rounded-none">@dha-team/arbundles</code> and Turbo’s signer to
              create and sign your data.
            </p>
            <div className="relative">
              <pre className="bg-gray-100 p-4 rounded-none overflow-x-auto">
                <code>{`import { ArweaveSigner } from "@ardrive/turbo-sdk/node";
import { createData, sign } from "@dha-team/arbundles";
import fs from "fs";
import path from "path";

const jwk = JSON.parse(fs.readFileSync("./wallet.json", "utf8"));
const signer = new ArweaveSigner(jwk);
const filePath = path.join(process.cwd(), "./public/stock.jpeg");
const data = createData(new Uint8Array(fs.readFileSync(filePath)), signer, {
tags: [{ name: "Content-Type", value: "image/jpeg" }],
});
await sign(data, signer);
`}</code>
              </pre>
              <button
                onClick={() =>
                  copyToClipboard(`import { ArweaveSigner } from "@ardrive/turbo-sdk/node";
import { createData, sign } from "@dha-team/arbundles";
import fs from "fs";
import path from "path";

const jwk = JSON.parse(fs.readFileSync("./wallet.json", "utf8"));
const signer = new ArweaveSigner(jwk);
const filePath = path.join(process.cwd(), "./public/stock.jpeg");
const data = createData(new Uint8Array(fs.readFileSync(filePath)), signer, {
tags: [{ name: "Content-Type", value: "image/jpeg" }],
});
await sign(data, signer);
`)
                }
                className="absolute top-2 right-2 text-brand-night hover:text-brand-night/80 transition-colors"
                title="Copy to clipboard"
              >
                <ClipboardPen className="w-5 h-5" />
              </button>
            </div>
          </li>
          <li>
            <strong>Make the Upload Request</strong>
            <div className="relative">
              <pre className="bg-gray-100 p-4 rounded-none overflow-x-auto">
                <code>{`const response = await fetch("https://upload.ardrive.io/v1/tx", {
method: "POST",
headers: {
  "Content-Type": "application/octet-stream",
  Accept: "application/json",
  "x-paid-by": "SPONSOR_WALLET_ADDRESS",
},
body: data.getRaw(),
});
const result = await response.json();
console.log("Upload result:", result);
`}</code>
              </pre>
              <button
                onClick={() =>
                  copyToClipboard(`const response = await fetch("https://upload.ardrive.io/v1/tx", {
method: "POST",
headers: {
  "Content-Type": "application/octet-stream",
  Accept: "application/json",
  "x-paid-by": "SPONSOR_WALLET_ADDRESS",
},
body: data.getRaw(),
});
const result = await response.json();
console.log("Upload result:", result);
`)
                }
                className="absolute top-2 right-2 text-brand-night hover:text-brand-night/80 transition-colors"
                title="Copy to clipboard"
              >
                <ClipboardPen className="w-5 h-5" />
              </button>
            </div>
            <p className="my-2">
              Adding the <code className="bg-gray-200 px-1 rounded-none">x-paid-by</code> header tells ArDrive to use
              sponsored credits.
            </p>
          </li>
        </ol>
        <h2 className="text-xl font-semibold mt-8 mb-4">Resources</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
          <li>
            <strong>Full Turbo CLI / SDK / API Docs</strong>: Check{" "}
            <a
              href="https://docs.ardrive.io/docs/turbo/turbo-sdk/"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Turbo Documentation
            </a>
          </li>
          <li>
            <strong>Email support</strong>:{" "}
            <a
              href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSMSqVsmVCqFrJFNLRZsrWQMfmVkQdrKWJfLwJkfkpmtcBzFMsBqGWGFRhXrDqLqXtsfBpTm"
              className="text-blue-600 underline hover:text-blue-800"
            >
              nityaprotocol@gmail.com
            </a>
          </li>
          <li>
            <strong>Join our Discord Community</strong> for help
          </li>
          <li>
            <strong>Beta Notice</strong>: This is a beta tool. Expect updates.
          </li>
        </ul>
      </div>
    </div>
  )
}
