import { useState, useCallback } from "react"
import { X } from "lucide-react"

export interface Toast {
  id: string
  title: string
  message: string
  type: "success" | "error" | "warning" | "info"
}

export interface ToastProps {
  toasts: Toast[]
  onRemove: (id: string) => void
  className?: string
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (type: Toast["type"], title: string, message: string) => {
      const id = Math.random().toString(36).substr(2, 9)
      setToasts((prev) => [...prev, { id, title, message, type }])
      setTimeout(() => removeToast(id), 3000)
    },
    [removeToast]
  )

  const showSuccess = (title: string, message: string) =>
    showToast("success", title, message)
  const showError = (title: string, message: string) =>
    showToast("error", title, message)
  const showWarning = (title: string, message: string) =>
    showToast("warning", title, message)
  const showInfo = (title: string, message: string) =>
    showToast("info", title, message)

  return { toasts, removeToast, showSuccess, showError, showWarning, showInfo }
}

export function ToastContainer({ toasts, onRemove, className }: ToastProps) {
  return (
    <div className={`fixed top-4 right-4 space-y-2 ${className}`}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`relative p-4 rounded-xl border-2 shadow-sm ${
            toast.type === "success"
              ? "bg-green-100 border-green-300 text-green-800"
              : toast.type === "error"
              ? "bg-red-100 border-red-300 text-red-800"
              : toast.type === "warning"
              ? "bg-yellow-100 border-yellow-300 text-yellow-800"
              : "bg-blue-100 border-blue-300 text-blue-800"
          }`}
        >
          <div className="pr-8">
            <h3 className="font-semibold">{toast.title}</h3>
            <p className="text-sm">{toast.message}</p>
          </div>
          <button
            onClick={() => onRemove(toast.id)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}