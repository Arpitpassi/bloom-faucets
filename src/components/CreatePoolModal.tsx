import { X } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

interface CreatePoolModalProps {
  isOpen: boolean
  onClose: () => void
  onCreatePool: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function CreatePoolModal({ isOpen, onClose, onCreatePool }: CreatePoolModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-brand-snow-drift border-2 border-gray-200 shadow-xl max-w-xl w-full max-h-[80vh] overflow-y-auto p-8 rounded-xl">
        <Button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </Button>
        <h3 className="text-xl font-semibold mb-6 text-gray-900">CREATE NEW FAUCET</h3>
        <form onSubmit={onCreatePool} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">FAUCET NAME</label>
            <Input
              name="poolName"
              type="text"
              className="w-full p-3 border-2 border-gray-300 bg-white text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-xl"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">START TIME</label>
              <Input
                name="startTime"
                type="datetime-local"
                className="w-full p-3 border-2 border-gray-300 bg-white text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">END TIME</label>
              <Input
                name="endTime"
                type="datetime-local"
                className="w-full p-3 border-2 border-gray-300 bg-white text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-xl"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              MAX CREDITS PER WALLET (USAGE CAP)
            </label>
            <Input
              name="usageCap"
              type="number"
              step="0.000001"
              min="0"
              pattern="^\d*(\.\d{0,6})?$"
              className="w-full p-3 border-2 border-gray-300 bg-white text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-xl"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">WHITELISTED ADDRESSES</label>
            <Textarea
              name="addresses"
              rows={4}
              placeholder="Enter one Arweave address per line"
              className="w-full p-3 border-2 border-gray-300 bg-white text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent rounded-xl"
            />
          </div>
          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1 bg-white text-brand-night border-2 border-brand-night p-3 rounded-xl text-sm font-medium hover:bg-brand-night hover:text-white transition-colors"
            >
              Create Faucet
            </Button>
            <Button
              type="button"
              onClick={onClose}
              className="bg-white text-gray-700 border-2 border-gray-300 p-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}