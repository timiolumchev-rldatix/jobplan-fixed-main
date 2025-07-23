import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle, AlertTriangle, Calendar, MessageCircle } from 'lucide-react';
import {
  BedrockAgentRuntimeClient,
  InvokeAgentCommand
} from "@aws-sdk/client-bedrock-agent-runtime";

const DashboardStats = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I'm your job plan assistant. How can I help you today?" }
  ]);
  const [loading, setLoading] = useState(false);
  // Removed agentType state

  const bedrockClient = new BedrockAgentRuntimeClient({
  region: "eu-west-2",
  credentials: {
    accessKeyId: "AKIAUK7YCOIIWWNVYUHY",
    secretAccessKey:  "T04E5Ki/+j7tZIHmj2MSMvfvMKFa+vunvbiO2hKH",
  }
});

  // Replace with your actual Bedrock agent endpoint and headers
  async function getBedrockResponse(userInput) {
    try {
      const command = new InvokeAgentCommand({
        inputText: userInput,
        agentId: "5XYJYWWAQ4",
        agentAliasId: "O5QZP6CXJP",
        sessionId: crypto.randomUUID()
      });
 
      const response = await bedrockClient.send(command);
      let fullResponse = "";
 
      for await (const chunk of response.completion) {
        const textChunk = new TextDecoder("utf-8").decode(chunk.chunk?.bytes);
        fullResponse += textChunk;
      }
      return fullResponse || 'Sorry, no response from agent.';
    } catch (err) {
      return 'Error contacting agent.';
    }
  }

  async function getAnotherAgentResponse(userInput) {
    try {
      const command = new InvokeAgentCommand({
        inputText: userInput,
        agentId: "4RBHCDFK0C", // Replace with your agent ID
        agentAliasId: "RHMDCZY2Z2", // Replace with your agent alias ID
        sessionId: crypto.randomUUID()
      });

      const response = await bedrockClient.send(command);
      let fullResponse = "";

      for await (const chunk of response.completion) {
        const textChunk = new TextDecoder("utf-8").decode(chunk.chunk?.bytes);
        fullResponse += textChunk;
      }
      return fullResponse || 'Sorry, no response from agent.';
    } catch (err) {
      return 'Error contacting agent.';
    }
  }

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  const stats = [
    {
      title: 'Total Sessions This Week',
      value: '12',
      subtitle: '2 DCC, 10 SPA',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Compliance Status',
      value: '94%',
      subtitle: 'Appraisal due in 3 months',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Upcoming Deadlines',
      value: '3',
      subtitle: 'CPD submission due',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Leave Remaining',
      value: '18',
      subtitle: 'Study leave days',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

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
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Chatbot Bubble */}
      <div className="fixed inset-0 right-0 z-50 flex items-end justify-end">
        {!chatOpen ? (
          <button
            className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center absolute bottom-6 right-6"
            onClick={() => setChatOpen(true)}
            aria-label="Open Chatbot"
          >
            <MessageCircle className="h-6 w-6" />
          </button>
        ) : (
          <div className="h-full w-[28rem] bg-white rounded-l-xl shadow-2xl p-6 flex flex-col animate-fade-in" style={{ maxWidth: '90vw' }}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                {/* Animated Bot SVG */}
                <span className="relative flex h-6 w-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-bounce">
                    <circle cx="12" cy="12" r="10" fill="#3B82F6" />
                    <ellipse cx="12" cy="15" rx="5" ry="2" fill="#2563EB" />
                    <circle cx="9" cy="11" r="1.5" fill="white" />
                    <circle cx="15" cy="11" r="1.5" fill="white" />
                    <rect x="10" y="16" width="4" height="1" rx="0.5" fill="white" />
                  </svg>
                </span>
                <span className="font-semibold text-blue-600">Chatbot</span>
                {loading && (
                  <span className="flex items-center gap-2 ml-2">
                    <span className="flex items-center bg-gray-200 rounded-full px-3 py-1">
                      <span className="dot bg-gray-500 rounded-full w-2 h-2 mx-0.5 animate-dot1" />
                      <span className="dot bg-gray-500 rounded-full w-2 h-2 mx-0.5 animate-dot2" />
                      <span className="dot bg-gray-500 rounded-full w-2 h-2 mx-0.5 animate-dot3" />
                    </span>
                    <span className="text-xs text-gray-500 ml-1">Thinking...</span>
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
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-3 py-2 rounded-lg text-sm max-w-[70%] ${msg.sender === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-700'}`}>
                      {msg.sender === 'bot' ? (
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
              onSubmit={async e => {
                e.preventDefault();
                if (!inputValue.trim()) return;
                const userMsg = { sender: 'user', text: inputValue };
                setMessages(prev => [...prev, userMsg]);
                setInputValue(''); // Clear input immediately
                setLoading(true);
                const botReply = await getBedrockResponse(userMsg.text);
                setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
                setLoading(false);
              }}
            >
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Type your question..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-blue-700 transition-colors"
                disabled={loading}
              >
                {loading ? '...' : 'Send'}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardStats;
