import { memo, useCallback } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onValueChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
}

export const ChatInput = memo(function ChatInput({
  value,
  onValueChange,
  onSend,
  placeholder = "输入您的问题...",
}: ChatInputProps) {
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSend();
      }
    },
    [onSend]
  );

  return (
    <div className="bg-gray-800 border-t border-blue-500 px-4 py-3 rounded-b-xl flex gap-2 flex-shrink-0">
      <input
        type="text"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
      />
      <button
        onClick={onSend}
        className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-3 py-2.5 transition-colors flex-shrink-0"
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
});
