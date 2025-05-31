"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, MessageCircle } from "lucide-react";
import Head from "next/head";
import { QAItem, qaData } from "../componets/qa-data";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isQuestionSelection?: boolean;
  questions?: QAItem[];
}

interface SuggestionButton {
  id: string;
  text: string;
  icon: string;
  color: string;
}

export default function CopilotChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [suggestions, setSuggestions] = useState<QAItem[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
    // Generate suggestions only on the client side after initial render
    setSuggestions(getSuggestions());
  }, []);

  // Get 6 suggestions from qaData
  const getSuggestions = (): QAItem[] => {
    const shuffled = [...qaData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  };

  const findMatchingQuestions = (userMessage: string): QAItem[] => {
    const lowerMessage = userMessage.toLowerCase();
    const matchedQuestions: QAItem[] = [];

    qaData.forEach((qa) => {
      const hasKeywordMatch = qa.keywords.some((keyword) =>
        lowerMessage.includes(keyword.toLowerCase())
      );
      if (hasKeywordMatch) {
        matchedQuestions.push(qa);
      }
    });

    return matchedQuestions;
  };

  const handleSendMessage = async (message?: string) => {
    const messageText = message || inputValue;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setShowSuggestions(false);
    setIsTyping(true);

    // Find matching questions
    const matchingQuestions = findMatchingQuestions(messageText);

    setTimeout(() => {
      if (matchingQuestions.length > 1) {
        // Multiple matches - show question selection
        const selectionMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I found several questions that might match what you're looking for. Which one would you like me to answer?",
          isUser: false,
          timestamp: new Date(),
          isQuestionSelection: true,
          questions: matchingQuestions,
        };
        setMessages((prev) => [...prev, selectionMessage]);
      } else if (matchingQuestions.length === 1) {
        // Single match - provide answer directly
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: matchingQuestions[0].answer,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
      } else {
        // No matches - default response
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "I'd be happy to help you with that! For specific questions, please contact our support team or check our help center. You can also try asking about our pricing, integrations, business hours, or how to get started.",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
      }
      setIsTyping(false);
    }, 1200);
  };

  const handleQuestionSelection = (selectedQuestion: QAItem) => {
    const answerMessage: Message = {
      id: Date.now().toString(),
      text: selectedQuestion.answer,
      isUser: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, answerMessage]);
  };

  const handleSuggestionClick = (question: string) => {
    setInputValue(question);
    setShowSuggestions(false);
    handleSendMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestionButtons: SuggestionButton[] = [
    {
      id: qaData[0].id,
      text: qaData[0].question,
      icon: "🕒",
      color: "border-green-600 text-green-400 hover:bg-green-600/10",
    },
    {
      id: qaData[1].id,
      text: qaData[1].question,
      icon: "💰",
      color: "border-blue-600 text-blue-400 hover:bg-blue-600/10",
    },
    {
      id: qaData[2].id,
      text: qaData[2].question,
      icon: "🚀",
      color: "border-purple-600 text-purple-400 hover:bg-purple-600/10",
    },
    {
      id: qaData[3].id,
      text: qaData[3].question,
      icon: "🔌",
      color: "border-orange-600 text-orange-400 hover:bg-orange-600/10",
    },
    {
      id: qaData[4].id,
      text: qaData[4].question,
      icon: "✨",
      color: "border-cyan-600 text-cyan-400 hover:bg-cyan-600/10",
    },
    {
      id: qaData[5].id,
      text: qaData[5].question,
      icon: "🤖",
      color: "border-yellow-600 text-yellow-400 hover:bg-yellow-600/10",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-950 text-white flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-800 p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-gray-900" />
            </div>
            <span className="font-semibold">Des chatbot</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            {messages.length === 0 && showSuggestions && (
              <div className="text-center space-y-8">
                {/* Bot Avatar */}
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-8">
                  <MessageCircle className="w-8 h-8 text-gray-400" />
                </div>

                {/* Suggestion Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                  {suggestionButtons.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      className={`p-4 rounded-lg border ${suggestion.color} transition-all duration-200 text-left hover:scale-105`}
                      onClick={() => handleSuggestionClick(suggestion.text)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{suggestion.icon}</span>
                        <span className="text-sm font-medium">
                          {suggestion.text}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Sample Questions */}
                <div className="mt-12">
                  <h3 className="text-lg font-semibold mb-6 text-gray-300">
                    Or try asking about:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                    {suggestions.map((qa) => (
                      <button
                        key={qa.id}
                        className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors text-left text-sm text-gray-300 hover:text-white"
                        onClick={() => handleSuggestionClick(qa.question)}
                      >
                        {qa.question}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Chat Messages */}
            {messages.map((message) => (
              <div key={message.id} className="mb-6">
                <div
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-3xl ${
                      message.isUser
                        ? "bg-blue-600 text-white rounded-2xl rounded-br-md p-4"
                        : "bg-gray-800 text-gray-100 rounded-2xl rounded-bl-md p-4"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>

                    {/* Question Selection */}
                    {message.isQuestionSelection && message.questions && (
                      <div className="mt-4 space-y-2">
                        {message.questions.map((question) => (
                          <button
                            key={question.id}
                            className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm border border-gray-600 hover:border-gray-500"
                            onClick={() => handleQuestionSelection(question)}
                          >
                            {question.question}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start mb-6">
                <div className="bg-gray-800 rounded-2xl rounded-bl-md p-4">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-gray-800">
            <div className="relative">
              <div className="flex items-center gap-3 bg-gray-800 rounded-xl border border-gray-700 focus-within:border-blue-500 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="How can I help you?"
                  className="p-3 flex-1 bg-transparent text-white placeholder-gray-400 py-4 focus:outline-none"
                />
                <div className="flex items-center gap-2 pr-3">
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 text-white p-2 rounded-lg transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
