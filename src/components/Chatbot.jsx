import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSaviyoAiResponse } from "../data/chatbotKnowledge";
import {
  FiMessageSquare,
  FiX,
  FiSend,
  FiTrash2,
  FiExternalLink,
} from "react-icons/fi";
import { BsStars, BsRobot } from "react-icons/bs";

const STARTER_PROMPTS = [
  "How old is Saviyo?",
  "Where is Saviyo from?",
  "What is your tech stack?",
  "Tell me about D3innovatives",
  "What projects have you built?",
  "How can I contact/hire Saviyo?",
];

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "ai",
      text: "Hi there! 👋 I'm **Saviyo's AI Assistant**.\n\nI'm specifically trained to share details about Saviyo George—including his **MERN stack skills, work experience at D3innovatives, projects, and contact info**.\n\nWhat would you like to know?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  const handleSend = (textToSend = inputText) => {
    const text = (typeof textToSend === "string" ? textToSend : inputText).trim();
    if (!text || isTyping) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI thinking time for realistic interaction
    setTimeout(() => {
      const responseText = getSaviyoAiResponse(text);
      const aiMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 450);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        sender: "ai",
        text: "Chat cleared! How else can I help you learn about Saviyo?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  // Basic markdown-like link & bold parser for clean bubbles
  const renderFormattedText = (content) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      // Parse markdown links [text](url)
      const linkRegex = /\[(.*?)\]\((.*?)\)/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = linkRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(
          <a
            key={match.index}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-main)] underline font-medium hover:opacity-75 inline-flex items-center gap-1"
          >
            {match[1]} <FiExternalLink className="inline text-[10px]" />
          </a>
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      // Parse bold **text**
      const renderedParts = parts.map((part, pIdx) => {
        if (typeof part === "string") {
          const boldParts = part.split(/\*\*(.*?)\*\*/g);
          return boldParts.map((bPart, bIdx) =>
            bIdx % 2 === 1 ? (
              <strong key={bIdx} className="text-[var(--text-main)] font-semibold">
                {bPart}
              </strong>
            ) : (
              bPart
            )
          );
        }
        return part;
      });

      return (
        <span key={idx} className="block leading-relaxed min-h-[1.2em]">
          {renderedParts}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              onClick={() => setIsOpen(true)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="relative flex items-center gap-2.5 bg-[var(--bg-surface)] text-[var(--text-main)] border border-[var(--border-subtle)] hover:border-[var(--text-main)] shadow-2xl px-4 py-3 rounded-full cursor-pointer transition-colors duration-300 group"
              aria-label="Open Saviyo AI Chat"
            >
              <div className="relative">
                <BsStars className="text-base text-[var(--text-main)] animate-pulse" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping" />
              </div>
              <span className="text-xs uppercase tracking-widest font-medium hidden sm:inline-block">
                Ask Saviyo AI
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[400px] h-[540px] max-h-[85vh] bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Chat Header */}
            <div className="px-5 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-base)]/60">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-main)]">
                  <BsStars className="text-sm" />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-bold text-[var(--text-main)]">
                    Saviyo AI
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] text-[var(--text-dim)] uppercase tracking-wider">
                      Trained on Saviyo
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[var(--text-muted)]">
                <button
                  onClick={handleClearChat}
                  title="Clear Chat"
                  className="p-1.5 rounded-lg hover:text-[var(--text-main)] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer"
                >
                  <FiTrash2 className="text-sm" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Chat"
                  className="p-1.5 rounded-lg hover:text-[var(--text-main)] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer"
                >
                  <FiX className="text-base" />
                </button>
              </div>
            </div>

            {/* Message History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[var(--text-main)] text-[var(--bg-base)] font-medium rounded-br-sm"
                        : "bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border-subtle)] rounded-bl-sm"
                    }`}
                  >
                    {renderFormattedText(msg.text)}
                  </div>
                  <span className="text-[9px] text-[var(--text-dim)] mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start">
                  <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-2xl rounded-bl-sm px-4 py-3 text-[var(--text-dim)] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[var(--text-dim)] rounded-full animate-bounce" />
                    <span
                      className="w-1.5 h-1.5 bg-[var(--text-dim)] rounded-full animate-bounce"
                      style={{ animationDelay: "0.15s" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-[var(--text-dim)] rounded-full animate-bounce"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-4 py-2 border-t border-[var(--border-subtle)]/50 flex gap-2 overflow-x-auto no-scrollbar">
              {STARTER_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  disabled={isTyping}
                  className="whitespace-nowrap text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full bg-[var(--bg-base)] border border-[var(--border-subtle)] hover:border-[var(--text-main)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-base)]/40 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Saviyo's skills, work, projects..."
                className="flex-1 bg-[var(--bg-elevated)] text-[var(--text-main)] placeholder-[var(--text-dim)] text-xs rounded-xl px-3.5 py-2.5 outline-none border border-transparent focus:border-[var(--border-hover)] transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputText.trim() || isTyping}
                className="w-9 h-9 rounded-xl bg-[var(--text-main)] text-[var(--bg-base)] flex items-center justify-center hover:opacity-85 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex-shrink-0"
              >
                <FiSend className="text-sm" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Chatbot;
