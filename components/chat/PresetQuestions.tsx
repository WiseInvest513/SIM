import { memo, useCallback } from "react";
import { PresetQuestion, CHAT_PRESET_QUESTIONS } from "@/lib/chat-config";

interface PresetQuestionsProps {
  onQuestionClick: (preset: PresetQuestion) => void;
}

export const PresetQuestions = memo(function PresetQuestions({
  onQuestionClick,
}: PresetQuestionsProps) {
  const handleClick = useCallback(
    (preset: PresetQuestion) => {
      onQuestionClick(preset);
    },
    [onQuestionClick]
  );

  return (
    <div className="bg-gray-800 border-t border-blue-500 px-4 py-3 max-h-56 overflow-y-auto flex-shrink-0">
      <p className="text-xs text-gray-400 mb-2.5 px-1">常见问题</p>
      <div className="space-y-2">
        {CHAT_PRESET_QUESTIONS.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(preset)}
            className="w-full text-left text-xs px-3 py-2.5 rounded-lg bg-gray-700 hover:bg-blue-600 text-gray-300 hover:text-white transition-colors border border-gray-600 hover:border-blue-500"
          >
            • {preset.question}
          </button>
        ))}
      </div>
    </div>
  );
});
