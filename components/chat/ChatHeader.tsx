import { memo } from "react";
import { X } from "lucide-react";

interface ChatHeaderProps {
  onClose: () => void;
}

export const ChatHeader = memo(function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="bg-blue-600 border-b border-blue-500 px-5 py-4 rounded-t-xl flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <h3 className="text-white font-semibold text-base">
            在线客服 · WiseSIM
          </h3>
        </div>
      </div>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-200 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
});
