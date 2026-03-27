"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { MessageCircle } from "lucide-react";
import { PresetQuestion } from "@/lib/chat-config";
import {
  matchAnswerByKeywords,
  findMatchingQuestions,
  DEFAULT_FALLBACK_MESSAGE,
  WELCOME_MESSAGE,
} from "@/lib/chat-config";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { PresetQuestions } from "./PresetQuestions";
import { ChatInput } from "./ChatInput";
import { ContactForm } from "./ContactForm";
import { QuestionSelector } from "./QuestionSelector";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const NOTIFICATION_DELAY = 3000;
const MESSAGE_RESPONSE_DELAY = 500;

const ChatWidgetContent = memo(function ChatWidgetContent({
  messages,
  inputValue,
  onInputChange,
  onSendMessage,
  onPresetQuestion,
  onClose,
  onShowContactForm,
  showPresets,
  onTogglePresets,
  matchingQuestions,
  onSelectQuestion,
  onClearMatching,
}: {
  messages: Message[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onPresetQuestion: (preset: PresetQuestion) => void;
  onClose: () => void;
  onShowContactForm: () => void;
  showPresets: boolean;
  onTogglePresets: () => void;
  matchingQuestions: PresetQuestion[];
  onSelectQuestion: (question: PresetQuestion) => void;
  onClearMatching: () => void;
}) {
  return (
    <div className="absolute bottom-20 right-0 w-[520px] bg-gray-900 border-2 border-blue-600 rounded-2xl flex flex-col shadow-2xl animate-in fade-in slide-in-from-bottom-2" style={{ height: matchingQuestions.length > 0 ? `${650 + matchingQuestions.length * 45}px` : showPresets ? "750px" : "600px" }}>
      <ChatHeader onClose={onClose} />
      <MessageList messages={messages} />

      {matchingQuestions.length > 0 ? (
        <QuestionSelector
          questions={matchingQuestions}
          onSelect={(q) => {
            onSelectQuestion(q);
            onClearMatching();
          }}
        />
      ) : (
        <>
          {showPresets && (
            <PresetQuestions onQuestionClick={onPresetQuestion} />
          )}

          <div className="bg-gray-800 border-t border-blue-500 px-4 py-2 flex-shrink-0 flex gap-2">
            <button
              onClick={onTogglePresets}
              className="flex-1 text-left text-xs px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors border border-gray-600"
            >
              常见问题 {showPresets ? "▲" : "▼"}
            </button>
            <button
              onClick={onShowContactForm}
              className="flex-1 text-left text-xs px-3 py-2 rounded-lg bg-gray-700 hover:bg-blue-600 text-gray-300 hover:text-white transition-colors border border-gray-600 hover:border-blue-500"
            >
              💌 <span className="underline">发邮件</span>
            </button>
          </div>
        </>
      )}

      <ChatInput
        value={inputValue}
        onValueChange={onInputChange}
        onSend={onSendMessage}
      />
    </div>
  );
});

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [matchingQuestions, setMatchingQuestions] = useState<PresetQuestion[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: WELCOME_MESSAGE,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, NOTIFICATION_DELAY);
    return () => clearTimeout(timer);
  }, []);

  // 实时匹配问题
  useEffect(() => {
    if (inputValue.trim()) {
      const matching = findMatchingQuestions(inputValue);
      setMatchingQuestions(matching);
    } else {
      setMatchingQuestions([]);
    }
  }, [inputValue]);

  const addMessage = useCallback((role: "user" | "assistant", content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      role,
      content,
    };
    setMessages((prev) => [...prev, message]);
  }, []);

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim()) return;

    addMessage("user", inputValue);

    // 查找匹配的问题
    const matching = findMatchingQuestions(inputValue);

    if (matching.length === 1) {
      // 单个匹配，直接返回答案
      const answer = matching[0].answer;
      setTimeout(() => {
        addMessage("assistant", answer);
      }, MESSAGE_RESPONSE_DELAY);
    } else if (matching.length > 1) {
      // 多个匹配，显示选择框让用户选择
      // 不清空 matchingQuestions，让用户选择
      setInputValue("");
      setShowNotification(false);
      return;
    } else {
      // 无匹配，返回默认消息
      setTimeout(() => {
        addMessage("assistant", DEFAULT_FALLBACK_MESSAGE);
      }, MESSAGE_RESPONSE_DELAY);
    }

    setInputValue("");
    setShowNotification(false);
  }, [inputValue, addMessage]);

  const handlePresetQuestion = useCallback(
    (preset: PresetQuestion) => {
      addMessage("user", preset.question);
      setTimeout(() => {
        addMessage("assistant", preset.answer);
      }, MESSAGE_RESPONSE_DELAY);
      setShowNotification(false);
    },
    [addMessage]
  );

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
    setShowNotification((prev) => (prev ? false : prev));
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} />
      )}

      {isOpen && (
        <ChatWidgetContent
          messages={messages}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSendMessage={handleSendMessage}
          onPresetQuestion={handlePresetQuestion}
          onClose={toggleChat}
          onShowContactForm={() => {
            setShowContactForm(true);
            setIsOpen(false);
          }}
          showPresets={showPresets}
          onTogglePresets={() => setShowPresets(!showPresets)}
          matchingQuestions={matchingQuestions}
          onSelectQuestion={handlePresetQuestion}
          onClearMatching={() => setMatchingQuestions([])}
        />
      )}

      <button
        onClick={toggleChat}
        className="relative w-14 h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
      >
        <MessageCircle className="w-6 h-6" />
        {showNotification && !isOpen && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>
    </div>
  );
}
