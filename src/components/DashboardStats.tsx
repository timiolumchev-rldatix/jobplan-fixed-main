import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  MessageCircle,
} from "lucide-react";
import {
  BedrockAgentRuntimeClient,
  InvokeAgentCommand,
} from "@aws-sdk/client-bedrock-agent-runtime";
import AnimatedChatBotButton from "./animated-chatbot-button/AnimatedChatBotButton";
import ChatIcon from "./ChatIcon";
import { set } from "date-fns";

import type { Dispatch, SetStateAction } from "react";
interface DashboardStatsProps {
  setJobPlans?: Dispatch<SetStateAction<any[]>>;
}

const DashboardStats = ({ setJobPlans }: DashboardStatsProps) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm your job plan assistant. How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  // Removed agentType state

  const bedrockClient = new BedrockAgentRuntimeClient({
    region: "eu-west-2",
    credentials: {
      accessKeyId: "AKIAUK7YCOIIWWNVYUHY",
      secretAccessKey: "T04E5Ki/+j7tZIHmj2MSMvfvMKFa+vunvbiO2hKH",
    },
  });

  // Replace with your actual Bedrock agent endpoint and headers
  const [isActionActive, setIsActionActive] = useState(false);
  async function getBedrockResponse(userInput) {
    try {
      const command = new InvokeAgentCommand({
        inputText: userInput,
        agentId: "5XYJYWWAQ4",
        agentAliasId: "O5QZP6CXJP",
        sessionId: crypto.randomUUID(),
      });

      const response = await bedrockClient.send(command);
      let fullResponse = "";

      for await (const chunk of response.completion) {
        const textChunk = new TextDecoder("utf-8").decode(chunk.chunk?.bytes);
        fullResponse += textChunk;
      }
      return fullResponse || "Sorry, no response from agent.";
    } catch (err) {
      return "Error contacting agent.";
    }
  }

  const [sentimentType, setSentimentType] = useState("Neutral");

  const checkUserMessageSentiment = async (userInput) => {
    const postData = {
      text: userInput,
    };
    console.log("postData", postData);

    try {
      const response = await fetch(
        "https://cp5zcej6rk.execute-api.eu-west-2.amazonaws.com/prod/sentiment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("result", result);
      setSentimentType(result.sentiment);
    } catch (error) {
      console.error("Error:", error.message);
    }
    console.log("sentimentReply", sentimentType);
  };

  // const [iconColor, setIconColor] = useState("#3b82f6");
  // const setChatIcon = useCallback(() => {
  //   switch (sentimentType) {
  //     case "Positive":
  //       setIconColor("#55e41cff");
  //       break;
  //     case "Negative":
  //       setIconColor("#f87171");
  //       break;
  //     case "Neutral":
  //       setIconColor("#3b82f6");
  //       break;
  //     case "Unclear":
  //       setIconColor("#7a7c80ff");
  //       break;
  //     default:
  //       setIconColor("#3b82f6");
  //   }
  // }, [sentimentType]);

  // useEffect(() => {
  //   console.log("sentimentReply", sentimentType);
  //   setChatIcon();
  // }, [sentimentType, setChatIcon]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const stats = [
    {
      title: "Total Sessions This Week",
      value: "12",
      subtitle: "2 DCC, 10 SPA",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Compliance Status",
      value: "94%",
      subtitle: "Appraisal due in 3 months",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Upcoming Deadlines",
      value: "3",
      subtitle: "CPD submission due",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Leave Remaining",
      value: "18",
      subtitle: "Study leave days",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  // jobPlans state is now lifted to parent

  const checkForJobPlanAction = async () => {
    try {
      const response = await fetch(
        "https://cp5zcej6rk.execute-api.eu-west-2.amazonaws.com/prod/add-job",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("result", result);
      // Add the new job plan to the state array
      setJobPlans((prev) => [...prev, result.jobPlan]);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Chatbot Bubble */}
      <div className="fixed inset-0 right-0 z-50 flex items-end justify-end">
        {!chatOpen ? (
          <button
            className="justify-center absolute bottom-10 right-6 i-btn"
            onClick={() => setChatOpen(true)}
            aria-label="Open Chatbot"
          >
            <AnimatedChatBotButton />
          </button>

        ) : (
          <div
            className="h-full w-[28rem] bg-white rounded-l-xl shadow-2xl p-6 flex flex-col animate-fade-in"
            style={{ maxWidth: "90vw" }}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                {/* Animated Bot SVG */}
                <span className="relative flex h-6 w-8">
                  <div className="animate-bounce">
                    <ChatIcon sentimentType={sentimentType} />
                  </div>
                </span>
                <span className="font-semibold text-blue-600">Chatbot</span>
                {loading && (
                  <span className="flex items-center gap-2 ml-2">
                    <span className="flex items-center bg-gray-200 rounded-full px-3 py-1">
                      <span className="dot bg-gray-500 rounded-full w-2 h-2 mx-0.5 animate-dot1" />
                      <span className="dot bg-gray-500 rounded-full w-2 h-2 mx-0.5 animate-dot2" />
                      <span className="dot bg-gray-500 rounded-full w-2 h-2 mx-0.5 animate-dot3" />
                    </span>
                    <span className="text-xs text-gray-500 ml-1">
                      Thinking...
                    </span>
                  </span>
                )}
              </div>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setChatOpen(false)}
                aria-label="Close Chatbot"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto mb-4">
              <div className="flex flex-col gap-2">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                  >
                    <div
                      className={`px-3 py-2 rounded-lg text-sm max-w-[70%] ${msg.sender === "user"
                          ? "bg-blue-100 text-blue-900"
                          : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {msg.sender === "bot" ? (
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      ) : (
                        msg.text
                      )}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>
            <form
              className="flex gap-2 pt-2 border-t border-gray-200"
              style={{ flexDirection: "column" }}
              onSubmit={async (e) => {
                e.preventDefault();

                if (!inputValue.trim()) return;

                const userMsg = { sender: "user", text: inputValue };

                setLoading(true);
                setMessages((prev) => [...prev, userMsg]);
                setInputValue("");

                if (isActionActive) {
                  checkForJobPlanAction();
                  setMessages((prev) => [
                    ...prev,
                    { sender: "bot", text: "Job plan added successfully!" },
                  ]);
                } else {
                  const botReply = await getBedrockResponse(userMsg.text);
                  checkUserMessageSentiment(userMsg.text);
                  setMessages((prev) => [
                    ...prev,
                    { sender: "bot", text: botReply },
                  ]);
                  // setChatIcon();
                }

                setLoading(false);
              }}
            >
              <div className="flex gap-2">
                <label>AI Actions</label>
                <input
                  type="checkbox"
                  checked={isActionActive}
                  onChange={() => setIsActionActive(!isActionActive)}
                  placeholder=""
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Type your question..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-blue-700 transition-colors"
                  disabled={loading}
                >
                  {loading ? "..." : "Send"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardStats;
