"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { MessageCircle } from "lucide-react";
import { PresetQuestion } from "@/lib/chat-config";
import {
  matchAnswerByKeywords,
  DEFAULT_FALLBACK_MESSAGE,
  WELCOME_MESSAGE,
} from "@/lib/chat-config";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { PresetQuestions } from "./PresetQuestions";
import { ChatInput } from "./ChatInput";

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
}: {
  messages: Message[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onPresetQuestion: (preset: PresetQuestion) => void;
  onClose: () => void;
}) {
  return (
    <div className="absolute bottom-20 right-0 w-[520px] h-[750px] bg-gray-900 border-2 border-blue-600 rounded-2xl flex flex-col shadow-2xl animate-in fade-in slide-in-from-bottom-2">
      <ChatHeader onClose={onClose} />
      <MessageList messages={messages} />
      <PresetQuestions onQuestionClick={onPresetQuestion} />
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
    const answer = matchAnswerByKeywords(inputValue) || DEFAULT_FALLBACK_MESSAGE;

    setTimeout(() => {
      addMessage("assistant", answer);
    }, MESSAGE_RESPONSE_DELAY);

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
      {isOpen && (
        <ChatWidgetContent
          messages={messages}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSendMessage={handleSendMessage}
          onPresetQuestion={handlePresetQuestion}
          onClose={toggleChat}
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
