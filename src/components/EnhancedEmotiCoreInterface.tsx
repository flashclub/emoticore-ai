"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { MessageCircle, Send, Smile } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { parseNextPropertyStream, formatMessageText } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
const USE_STREAM_API = true;

// 更新消息类型定义
type Emotion = {
  color: string;
  intensity: number;
};

type Message = {
  sender: "user" | "emoticon";
  text: string;
  emotions?: Emotion[];
  action?: string;
  timestamp: string;
};

const EmotiCore = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "emoticon",
      text: "Hello, I'm EmotiCore, an emotional AI assistant.",
      emotions: [{ color: "blue", intensity: 100 }],
      action: "The energy core pulses with thoughtful blue light",
      timestamp: new Date().toISOString(),
    },
  ]);
  // 修改为多情感状态
  const [currentEmotions, setCurrentEmotions] = useState<Emotion[]>([
    { color: "blue", intensity: 100 },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState("");
  const bufferRef = useRef<string>("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const [parsedData, setParsedData] = React.useState<any>({});

  // 更新情感颜色映射
  const emotionColors: Record<string, { color: string; meaning: string }> = {
    blue: { color: "bg-blue-400", meaning: "Calm/Thoughtful" },
    pink: { color: "bg-pink-400", meaning: "Caring/Warm" },
    gold: { color: "bg-yellow-400", meaning: "Joy/Creative" },
    purple: { color: "bg-purple-400", meaning: "Curious/Mysterious" },
    green: { color: "bg-green-400", meaning: "Healing/Balance" },
    red: { color: "bg-red-400", meaning: "Passionate/Excited" },
    white: { color: "bg-gray-100", meaning: "Pure/Clear" },
  };

  const processChunk = useCallback((chunk: string) => {
    try {
      // 将 chunk 按换行符分割，处理可能的多行数据
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (!line.trim()) continue;

        const jsonData = JSON.parse(line);
        const argument = jsonData.choices?.[0]?.delta?.function_call?.arguments;

        if (argument) {
          bufferRef.current += argument;
          // console.log("bufferRef.current: ", bufferRef.current);
          const currentBuffer = bufferRef.current;

          let lastValidIndex = 0;

          // 尝试解析累积的 JSON 字符串
          try {
            parseNextPropertyStream(
              lastValidIndex,
              currentBuffer,
              setParsedData
            );
            while (true) {
              // console.log("currentBuffer: ", currentBuffer);
              const nextIndex = parseNextPropertyStream(
                lastValidIndex,
                currentBuffer,
                setParsedData
              );
              if (nextIndex === null) break;
              lastValidIndex = nextIndex;
            }

            bufferRef.current = currentBuffer.slice(lastValidIndex);
            // setParsedData(parsedJson);
          } catch (e) {
            // 如果解析失败，说明还不是完整的 JSON，继续累积
          }
        }
      }
    } catch (error) {
      console.error("Error processing chunk:", error);
    }
  }, []);

  // 添加自动滚动效果
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]); // 当消息更新时触发

  const runStream = useCallback(
    (response: Response) => {
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      const read = async () => {
        const { done, value } = await reader.read();
        if (done) {
          console.log("Stream complete:", parsedData);
          setIsLoading(false);
          return;
        }

        const chunk = decoder.decode(value, { stream: true });
        // console.log("chunk: ", chunk);
        processChunk(chunk);
        read();
      };

      read().catch((error: unknown) => {
        console.error("Stream error:", error);
        setIsLoading(false);
      });
    },
    [processChunk]
  );

  // 更新 parsedData 效果
  useEffect(() => {
    if (
      (parsedData.response &&
        parsedData.response !== messages[messages.length - 1]?.text) ||
      (parsedData.action &&
        parsedData.action !== messages[messages.length - 1]?.action)
    ) {
      setMessages((prev: Message[]) => {
        if (prev.length > 0 && prev[prev.length - 1].sender === "emoticon") {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1] = {
            sender: "emoticon",
            text: parsedData.response,
            emotions: parsedData.emotions,
            action: parsedData.action,
            timestamp: new Date().toISOString(),
          };
          return updatedMessages;
        }
        return [
          ...prev,
          {
            sender: "emoticon",
            text: parsedData.response,
            emotions: parsedData.emotions,
            action: parsedData.action,
            timestamp: new Date().toISOString(),
          },
        ];
      });
    }
    if (parsedData.emotions) {
      setIsLoading(false);
      setCurrentEmotions(parsedData.emotions);
    }
  }, [parsedData, messages]);

  // AI回复生成函数
  const generateAIResponse2 = async (userMessage: string) => {
    setIsTyping(true);
    setIsLoading(true);
    try {
      // 这里应该替换为实际的AI接口调用
      // AI会分析用户消息并返回：
      // 1. 检测到的用户情感状态
      // 2. AI的情感响应
      // 3. 对应的动作描述
      // 4. 回复内容
      const aiResponse = await fetch("/api/emoticon/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          messageHistory: messages.map((msg) => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text,
          })),
        }),
      });
      setParsedData({});
      runStream(aiResponse);

      return aiResponse;
    } catch (error) {
      console.error("Error generating AI response:", error);
      return {
        userEmotion: "confused",
        emotion: "blue",
        action: "能量球闪烁着困惑的光芒",
        response: "抱歉，我的情感处理器似乎出现了一些波动...",
      };
    } finally {
      setIsTyping(false);
    }
  };

  // 处理消息发送
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    setParsedData({});

    // 添加用户消息（此时不设置情感状态，等待AI分析）
    const userMessage = {
      sender: "user",
      text: inputText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev: any) => [...prev, userMessage]);
    setInputText("");
    if (USE_STREAM_API) {
      // 获取AI响应
      await generateAIResponse2(inputText);
      return;
    }
  };

  // 更新情感指示器组件
  const EmotionIndicator = () => (
    <div className="absolute top-0 left-0 m-4 p-2 bg-white rounded-lg shadow-md">
      <div className="text-sm text-gray-600">EmotiCore Emotions:</div>
      {currentEmotions.map((emotion, index) => (
        <div key={index} className="mt-1">
          <div className="flex justify-between text-xs text-gray-500">
            <span>{emotionColors[emotion.color].meaning}</span>
            <span>{emotion.intensity}%</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full">
            <div
              className={`h-2 rounded-full ${
                emotionColors[emotion.color].color
              }`}
              style={{ width: `${emotion.intensity}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );

  // 更新核心显示区域
  const CoreDisplay = () => (
    <div className="relative w-32 h-32 rounded-full flex items-center justify-center">
      {/* 核心光球 - 使用渐变混合多种情感颜色 */}
      <div
        className={`w-16 h-16 rounded-full animate-pulse`}
        style={{
          background: `conic-gradient(${currentEmotions
            .map(
              (emotion) =>
                `${emotionColors[emotion.color].color.replace("bg-", "")} ${
                  emotion.intensity
                }%`
            )
            .join(", ")})`,
        }}
      >
        <div className="w-full h-full rounded-full bg-opacity-50 backdrop-blur-sm"></div>
      </div>

      {/* 涟漪效果 - 使用主要情感颜色 */}
      {currentEmotions.length > 0 && (
        <>
          <div
            className={`absolute w-full h-full ${
              emotionColors[currentEmotions[0].color].color
            } opacity-20 rounded-full animate-ripple`}
          ></div>
          <div
            className={`absolute w-full h-full ${
              emotionColors[currentEmotions[0].color].color
            } opacity-20 rounded-full animate-ripple delay-1000`}
          ></div>
        </>
      )}
    </div>
  );

  // 更新消息显示
  const MessageDisplay = ({ msg }: { msg: Message }) => {
    // 构建渐变色类名
    const getGradientClasses = (emotions?: Emotion[]) => {
      if (!emotions || emotions.length === 0) return "bg-gray-100";

      if (emotions.length === 1) {
        return `${emotionColors[emotions[0].color].color}`;
      }

      // 为多个情感构建渐变
      const gradientColors = emotions
        .map((emotion, index) => {
          const position = Math.floor((index / (emotions.length - 1)) * 100);
          return `${emotionColors[emotion.color].color.replace(
            "bg-",
            ""
          )} ${position}%`;
        })
        .join(", ");

      return `bg-gradient-to-r from-${emotions[0].color}-200 to-${
        emotions[emotions.length - 1].color
      }-200`;
    };

    return (
      <div
        className={`flex ${
          msg.sender === "user" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`rounded-lg max-w-[80%] ${
            msg.sender === "user"
              ? "bg-gray-100"
              : `${getGradientClasses(msg.emotions)} bg-opacity-20 p-4`
          }`}
        >
          {msg.sender === "emoticon" && msg.action && (
            <div className="text-sm text-gray-500 italic mb-1">
              <ReactMarkdown>{"*" + msg.action + "*"}</ReactMarkdown>
            </div>
          )}
          <ReactMarkdown
            className={`${
              msg.sender === "user" ? "bg-white rounded-lg p-4" : ""
            }`}
          >
            {msg.text && formatMessageText(msg.text)}
          </ReactMarkdown>
        </div>
      </div>
    );
  };

  // 打字动画组件
  const TypingIndicator = () => (
    <div className="flex space-x-2 p-3 bg-gray-100 rounded-lg">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
      <div
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.4s" }}
      ></div>
    </div>
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // 修改 useEffect,添加 isTyping 依赖
  useEffect(() => {
    if (!isTyping && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTyping]); // 当 isTyping 状态改变时重新设置焦点

  return (
    <div className="flex flex-col h-screen bg-gray-200 p-4">
      <EmotionIndicator />
      <div className="flex justify-center mb-6">
        <CoreDisplay />
      </div>
      {/* 对话区域 */}
      <ScrollArea
        className="flex-1 mb-4 p-4 bg-gray-100 rounded-lg"
        ref={scrollAreaRef}
      >
        <div className="space-y-4">
          {messages.map((msg: any, index: number) => (
            <MessageDisplay key={index} msg={msg} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <TypingIndicator />
            </div>
          )}
        </div>
      </ScrollArea>

      {/* 输入区域 */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && !isTyping && handleSendMessage()
          }
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Chat with EmotiCore..."
          disabled={isTyping}
          ref={inputRef}
        />
        <button
          onClick={handleSendMessage}
          className={`p-3 ${
            isTyping ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded-lg`}
          disabled={isTyping}
        >
          <Send className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default EmotiCore;
