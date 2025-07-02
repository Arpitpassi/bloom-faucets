// src/components/TurboUploadModal.tsx
import { useState } from "react";
import { ArconnectSigner, TurboFactory } from "@ardrive/turbo-sdk/web";
import { useUser } from "../hooks/useUser.tsx";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function TurboUploadModal({ onClose }: { onClose: () => void }) {
  const { connected } = useUser();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setUploadStatus("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select a file first");
      return;
    }

    if (!connected || !window.arweaveWallet) {
      setUploadStatus("Please connect your wallet first");
      return;
    }

    try {
      setUploadStatus("Uploading...");
      const signer = new ArconnectSigner(window.arweaveWallet);
      const turbo = TurboFactory.authenticated({
        signer,
        token: "arweave",
      });

      await turbo.uploadFile({
        fileStreamFactory: () => selectedFile.stream(),
        fileSizeFactory: () => selectedFile.size,
        events: {
          onUploadProgress: ({ totalBytes, processedBytes }) => {
            const percentage = Math.round((processedBytes / totalBytes) * 100);
            setUploadStatus(`Upload progress: ${percentage}%`);
          },
          onUploadSuccess: () => setUploadStatus("Upload successful!"),
          onUploadError: (error) => {
            console.error("Upload error:", error);
            setUploadStatus(`Upload error: ${String(error)}`);
          },
        },
      });
    } catch (error) {
      console.error("Upload failed:", error);
      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message.toLowerCase();
      } else if (typeof error === "string") {
        errorMessage = error.toLowerCase();
      }
      if (errorMessage.includes("permission") || errorMessage.includes("denied")) {
        setUploadStatus("Permission denied. Please reconnect your wallet and grant all requested permissions.");
      } else {
        setUploadStatus(`Upload failed: ${errorMessage}`);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload File</h2>
        <div className="space-y-4">
          <Input
            type="file"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
          <Button
            onClick={handleUpload}
            className="w-full bg-black text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Upload File
          </Button>
          {uploadStatus && (
            <p
              className={`text-sm ${
                uploadStatus.includes("error") || uploadStatus.includes("failed")
                  ? "text-red-500"
                  : uploadStatus.includes("successful")
                    ? "text-green-500"
                    : "text-gray-700"
              }`}
            >
              {uploadStatus}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}