import { memo } from "react";
import { PresetQuestion } from "@/lib/chat-config";

interface QuestionSelectorProps {
  questions: PresetQuestion[];
  onSelect: (question: PresetQuestion) => void;
}

export const QuestionSelector = memo(function QuestionSelector({
  questions,
  onSelect,
}: QuestionSelectorProps) {
  if (!questions || questions.length === 0) return null;

  // 显示选择框
  return (
    <div className="bg-gray-800 border-t border-blue-500 px-4 py-3 flex-shrink-0">
      <p className="text-xs text-gray-400 mb-2.5">你可能在问：</p>
      <div className="space-y-2">
        {questions.map((q, idx) => (
          <button
            key={`${q.question}-${idx}`}
            onClick={() => {
              onSelect(q);
            }}
            className="w-full text-left text-xs px-3 py-2.5 rounded-lg bg-gray-700 hover:bg-blue-600 text-gray-300 hover:text-white transition-colors border border-gray-600 hover:border-blue-500"
          >
            • {q.question}
          </button>
        ))}
      </div>
    </div>
  );
});
