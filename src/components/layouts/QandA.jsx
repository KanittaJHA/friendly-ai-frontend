import React, { useState, useEffect, useRef } from "react";
import QandANavbar from "../navbar/QandANavbar";
import {
  RiArrowDownSLine,
  RiAddLine,
  RiSendPlaneLine,
  RiMic2AiLine,
  RiMovie2AiLine,
  RiImageCircleAiLine,
  RiNewsLine,
  RiPieChartLine,
} from "react-icons/ri";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import images from "../../assets/images/images";

const actionButtons = [
  { icon: <RiMovie2AiLine />, label: "Recommend a movie" },
  { icon: <RiImageCircleAiLine />, label: "Generate image" },
  { icon: <RiNewsLine />, label: "Write a post" },
  { icon: <RiPieChartLine />, label: "Data analysis" },
];

const QandA = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text) => {
    if (isLoading) return;

    const userText = text || input;
    if (!userText.trim()) return;

    setStarted(true);
    setInput("");
    const userMessage = { role: "user", content: userText };

    const loadingMessage = {
      role: "ai",
      content: "AI is thinking...",
      isLoading: true,
    };
    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setIsLoading(true);

    try {
      let res;

      if (!conversationId) {
        res = await axiosInstance.post(
          API_PATHS.CONVERSATIONS.CREATE_CONVERSATION,
          {
            messages: [{ content: userText }],
          }
        );
        setConversationId(res.data.data.conversationId);
      } else {
        res = await axiosInstance.post(
          API_PATHS.CONVERSATIONS.SEND_MESSAGE(conversationId),
          {
            content: userText,
          }
        );
      }

      let aiResponse;
      if (res.data?.data?.response) {
        aiResponse = res.data.data.response;
      } else if (res.data?.data?.messages) {
        const msgs = res.data.data.messages;
        aiResponse = msgs.find((m) => m.role === "ai")?.content;
      }
      aiResponse =
        aiResponse ||
        res.data?.response ||
        res.data?.message ||
        "Sorry, no response received";

      setMessages((prev) =>
        prev.map((msg) =>
          msg.isLoading
            ? { ...msg, content: aiResponse, isLoading: false }
            : msg
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);

      const message =
        error.response?.status === 401
          ? "Session expired. Please login again."
          : "Message sending failed. Please try again.";

      setMessages((prev) =>
        prev.map((msg) =>
          msg.isLoading ? { ...msg, content: message, isLoading: false } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const handleActionButtonClick = (buttonLabel) => {
    handleSend(buttonLabel);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <QandANavbar />

      <div className="p-5 h-full w-full flex flex-col items-center">
        <button className="flex items-center justify-center gap-2 text-white text-[10px] rounded-[50px] px-3 py-1 cursor-pointer bg-gradient-to-r from-primary to-secondary">
          <p>Friendly 0.1</p>
          <RiArrowDownSLine className="text-sm font-medium" />
        </button>

        <div className="flex flex-col h-full w-[70%] items-center justify-between">
          {!started && (
            <div className="flex flex-col h-full items-center justify-center">
              <div className="flex flex-col text-center items-center justify-center mb-10">
                <p>Good morning</p>
                <h2 className="text-6xl">You're on a wave of productivity!</h2>
              </div>

              <div className="flex items-center justify-center w-full mt-4">
                <div className="flex items-center justify-center gap-3">
                  {actionButtons.map((btn, i) => (
                    <span
                      key={i}
                      className="flex items-center justify-center gap-2 bg-white text-gray-600 px-3 py-1.5 rounded-[50px] cursor-pointer hover:bg-gray-50"
                      onClick={() => handleActionButtonClick(btn.label)}
                    >
                      {btn.icon}
                      <p className="text-xs">{btn.label}</p>
                    </span>
                  ))}
                </div>
                <p className="ml-10 text-gray-500 text-xs cursor-pointer">
                  More
                </p>
              </div>
            </div>
          )}

          {started && (
            <div className="flex-1 w-full mb-4">
              <div
                ref={scrollRef}
                className="h-[400px] overflow-y-auto py-4 mb-6 space-y-4 scrollbar-hide chat-box"
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] px-4 py-2 rounded-lg flex items-center ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-primary to-secondary text-white"
                          : "bg-transparent text-gray-800"
                      }`}
                    >
                      {message.isLoading && (
                        <img
                          src={images.ICON_COLOR}
                          className="w-6 h-6 animate-spin mr-2"
                          alt="AI is thinking"
                        />
                      )}
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="fixed bottom-0 w-full p-5 flex justify-center">
            <div className="flex items-center gap-2 w-[56%]">
              <div className="relative w-full">
                <div className="bg-black p-[2px] absolute left-4 top-1/2 -translate-y-1/2 rounded-full cursor-pointer">
                  <RiAddLine className="text-white" />
                </div>

                <input
                  type="text"
                  placeholder="Ask anything"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={`w-full border-[1.5px] rounded-full py-4 pl-12 pr-10 text-xs outline-none transition-colors ${
                    isLoading
                      ? "border-gray-300 bg-gray-50"
                      : "border-gray-400 bg-gradient-to-r from-secondary to-background focus:border-gray-600"
                  }`}
                />
                <RiSendPlaneLine
                  className={`absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[18px] ${
                    isLoading ? "text-gray-400" : "text-black hover:text-black"
                  }`}
                  onClick={() => handleSend()}
                />
              </div>

              <div className="flex items-center justify-center text-white text-[10px] rounded-[50px] p-[13px] cursor-pointer bg-gradient-to-r from-primary to-secondary">
                <RiMic2AiLine className="text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QandA;
