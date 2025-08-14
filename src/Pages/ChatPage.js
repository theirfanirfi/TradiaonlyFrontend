"use client";

import { useState, useEffect, useRef } from "react";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ChatSidebar from "../components/ChatSideBar";
import IndustriesSubmenu from "../components/IndustriesSubMenu";
import IndustryPromptsSubmenu from "../components/IndustryPromptsSubmenu";
import TradiaToolsSubmenu from "../components/TradiaToolsSubmenu";
import ChatArea from "../components/ChatArea";
import industriesData from "../data/industriesData";
import getDesignTokens from "../utils/getDesignTokens";
import { Drawer } from "@mui/material";
import { sendMessage } from "../services/chatService";

function ChatPage() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("themeMode") === "dark";
    }
    return false;
  });
  const [message, setMessage] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [currentChatHistory, setCurrentChatHistory] = useState([]);
  const lastMessageRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [showIndustriesSubmenu, setShowIndustriesSubmenu] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [aiResponse, setAiResponse] = useState(null);
  const [showTradiaToolsSubmenu, setShowTradiaToolsSubmenu] = useState(false);

  const { chatId } = useParams();
  const navigate = useNavigate();
  const theme = createTheme(getDesignTokens(darkMode ? "dark" : "light"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const chatHistory = {
    "romania-weather": {
      id: "romania-weather",
      title: "Romania weather in September",
      date: "2 days ago",
      messages: [
        {
          id: 1,
          type: "user",
          content: "Hello! How's it going? What can I help you with today?",
          timestamp: "2 days ago",
        },
        {
          id: 2,
          type: "ai",
          content: {
            answer:
              "In Romania, September weather often feels like the beginning of autumn, but with a mix of lingering summer warmth. Here's what you can generally expect: \n\n• Temperature: Daytime highs are usually between 20-27°C (68-80°F) early in the month, gradually cooling to 15-20°C (59-68°F) by the end of September. Nights start to cool down, especially in the later part of the month.\n\n• Rainfall: September tends to be one of the drier months, although occasional rain showers are typical.\n\n• Regions: In the mountainous areas, temperatures can be noticeably cooler, while coastal areas on the Black Sea may stay a bit warmer through the month.\n\nOverall, September is considered a pleasant month for travel, as you can enjoy mild, comfortable weather without the peak summer heat.",
            confidence: 92,
            reason:
              "Based on historical weather data trends and regional climate patterns.",
            source: "https://www.weather-romania.gov/sep-2023-report.pdf",
            verified: true,
          },
          timestamp: "2 days ago",
        },
      ],
    },
    "healthy-recipes": {
      id: "healthy-recipes",
      title: "Healthy dinner recipes",
      date: "3 days ago",
      messages: [
        {
          id: 1,
          type: "user",
          content: "Can you suggest some healthy dinner recipes?",
          timestamp: "3 days ago",
        },
        {
          id: 2,
          type: "ai",
          content: {
            answer:
              "Here are some delicious and healthy dinner recipes:\n\n1. **Grilled Salmon with Quinoa**\n   - Fresh salmon fillet with herbs\n   - Quinoa pilaf with vegetables\n   - Steamed broccoli\n\n2. **Mediterranean Chicken Bowl**\n   - Grilled chicken breast\n   - Mixed greens and cherry tomatoes\n   - Hummus and olive oil dressing\n\n3. **Vegetarian Stir-fry**\n   - Mixed vegetables (bell peppers, snap peas, carrots)\n   - Tofu or tempeh\n   - Brown rice\n\nWould you like the detailed recipe for any of these?",
            confidence: 85,
            reason:
              "Based on general nutritional guidelines and common healthy recipes.",
            source: "LLM-internal (no document match found in RAG)",
            verified: false,
          },
          timestamp: "3 days ago",
        },
      ],
    },
    "low-confidence-test": {
      id: "low-confidence-test",
      title: "Low Confidence Test",
      date: "just now",
      messages: [
        {
          id: 1,
          type: "user",
          content: "What's the weather like on Mars?",
          timestamp: new Date().toLocaleString(),
        },
        {
          id: 2,
          type: "ai",
          content: {
            answer:
              "I'm not entirely sure, but Mars might have varying weather patterns. It could be cold and dusty, perhaps?",
            confidence: 45,
            reason: "Based on limited planetary data in model memory.",
            source: "LLM-internal (no document match found in RAG)",
            verified: false,
          },
          timestamp: new Date().toLocaleString(),
        },
      ],
    },
    "import-risk-analysis": {
      id: "import-risk-analysis",
      title: "Import Risk Analysis - Timber Products",
      date: "1 hour ago",
      messages: [
        {
          id: 1,
          type: "user",
          content: "Please analyze my import documentation for potential risks",
          timestamp: "1 hour ago",
        },
        {
          id: 2,
          type: "ai",
          content: {
            answer:
              "⚠️ Analysis Complete: Timber structure detected in your shipment. This may require quarantine treatment or DAFF declaration. Additionally, I found the following:\n\n• Missing phytosanitary certificate\n• Incoterm DAP may not be suitable for timber products\n• Consider DDP terms for better compliance\n• Estimated processing time: 5-7 additional days",
            confidence: 94,
            reason:
              "Based on DAFF regulations and import risk assessment protocols.",
            source:
              "Australian Department of Agriculture - Import Risk Guidelines 2024",
            verified: true,
          },
          timestamp: "1 hour ago",
        },
      ],
    },
  };

  const SYSTEM_PROMPT = `
You are a government-grade AI assistant specialized in trade compliance and regulations.

For every user query that is compliance or regulation related 
- Provide a clear, direct answer.
- Always include a confidence score (0–100%) indicating how confident you are in your response.
- Justify the confidence score briefly.
- Always cite the source(s) used — if available from RAG or embedded context.
- If data is unclear or missing, lower the confidence and explain why.

For Tradia AI Tool queries, focus on:
- Import/Export risk analysis
- Document compliance checking
- Trade regulation explanations
- Incoterm clarifications

Return output in JSON format with keys: answer, confidence, reason, and source.
`;

  const handleThemeToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    sessionStorage.setItem("themeMode", newMode ? "dark" : "light");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSendMessage = async () => {
    if (!message.trim() && attachedFiles.length === 0) return;
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: message,
      timestamp: new Date().toISOString(),
    };

    setCurrentChatHistory((prev) => [...prev, userMessage]);
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("prompt", message);
      attachedFiles.forEach((file) => formData.append("files", file));

      if (chatId) {
        formData.append("conversation_id", chatId);
      }

      setMessage("");
      setAttachedFiles([]);

      const response = await sendMessage(formData);

      const responseMessage =
        response.assistant_response || "No response from AI.";

      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: responseMessage,
        form: response.filled_pdf_form_url || null,
        timestamp: new Date().toISOString(),
      };

      setCurrentChatHistory((prev) => [...prev, aiMessage]);
      console.log("Message sent successfully:", response);
      if (response.conversation_id && !chatId) {
        // If it's a new chat, navigate to that chatId route
        navigate(`/chat/${response.conversation_id}`);
      }
    } catch (error) {
      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content:
          error?.response?.data?.message ||
          "Error sending message. Please try again.",
        timestamp: new Date().toISOString(),
      };
      setCurrentChatHistory((prev) => [...prev, aiMessage]);
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSendMessage = () => {
  //   if (message.trim()) {
  //     const prompt = `${SYSTEM_PROMPT}\nUser question: "${message}"\nProvide your structured response:`;

  //     const isTradiaQuery =
  //       message.toLowerCase().includes("import") ||
  //       message.toLowerCase().includes("export") ||
  //       message.toLowerCase().includes("trade") ||
  //       message.toLowerCase().includes("customs") ||
  //       message.toLowerCase().includes("dap") ||
  //       message.toLowerCase().includes("incoterm");

  //     const isRagMatch = Math.random() > 0.3;

  //     let simulatedResponse;

  //     if (isTradiaQuery) {
  //       simulatedResponse = {
  //         answer: `Based on current trade regulations: "${message}". ${
  //           message.toLowerCase().includes("dap")
  //             ? "DAP (Delivered at Place) means the seller delivers goods to a named place, usually in the buyer's country. The seller bears all risks and costs until goods are delivered to the agreed location. However, import duties, taxes, and customs clearance are the buyer's responsibility."
  //             : "I've analyzed your trade-related query and provided relevant compliance information."
  //         }`,
  //         confidence: Math.floor(Math.random() * 20) + 80,
  //         reason: isRagMatch
  //           ? "Based on current Australian trade regulations and compliance databases."
  //           : "Based on general trade knowledge, recommend verifying with current regulations.",
  //         source: isRagMatch
  //           ? "Australian Border Force - Trade Compliance Manual 2024"
  //           : "LLM-internal (no document match found in RAG)",
  //         verified: isRagMatch,
  //       };
  //     } else {
  //       simulatedResponse = {
  //         answer: `This is a simulated response to: "${message}".`,
  //         confidence: Math.floor(Math.random() * 101),
  //         reason: isRagMatch
  //           ? "Based on simulated RAG data."
  //           : "Based on pretrained model memory due to lack of RAG data or unclear information.",
  //         source: isRagMatch
  //           ? `https://example.com/${Math.random().toString(36).substr(2, 9)}`
  //           : "LLM-internal (no document match found in RAG)",
  //         verified: isRagMatch,
  //       };
  //     }

  //     setAiResponse(simulatedResponse);

  //     const currentChat = chatHistory[chatId] || {
  //       id: chatId || message.toLowerCase().replace(/\s/g, "-"),
  //       title: message,
  //       date: "just now",
  //       messages: [],
  //     };
  //     currentChat.messages.push({
  //       id: currentChat.messages.length + 1,
  //       type: "user",
  //       content: message,
  //       timestamp: new Date().toLocaleString(),
  //     });
  //     currentChat.messages.push({
  //       id: currentChat.messages.length + 1,
  //       type: "ai",
  //       content: simulatedResponse,
  //       timestamp: new Date().toLocaleString(),
  //     });
  //     if (!chatId) {
  //       chatHistory[currentChat.id] = currentChat;
  //       navigate(`/chat/${currentChat.id}`);
  //     }
  //     setMessage("");
  //   }
  // };

  const handleIndustrySelect = (industry) => {
    setSelectedIndustry(selectedIndustry === industry ? null : industry);
    setShowIndustriesSubmenu(false);
  };

  const handlePromptSelect = (prompt) => {
    setMessage(prompt);
    setShowIndustriesSubmenu(false);
    setSelectedIndustry(null);
  };

  const handleCloseTradiaTools = () => {
    setShowTradiaToolsSubmenu(false);
  };

  useEffect(() => {
    if (chatId) {
      setSelectedIndustry(null);
      setShowIndustriesSubmenu(false);
      setShowTradiaToolsSubmenu(false);
    }
  }, [chatId]);

  useEffect(() => {
    if (lastMessageRef?.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentChatHistory, chatId]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <ChatSidebar
          theme={theme}
          mobileOpen={mobileOpen}
          onClose={handleDrawerToggle}
          isMobile={isMobile}
          chatHistory={chatHistory}
          chatId={chatId}
          showIndustriesSubmenu={showIndustriesSubmenu}
          setShowIndustriesSubmenu={setShowIndustriesSubmenu}
          selectedIndustry={selectedIndustry}
          setSelectedIndustry={setSelectedIndustry}
          setMessage={setMessage}
          navigate={navigate}
          showTradiaToolsSubmenu={showTradiaToolsSubmenu}
          setShowTradiaToolsSubmenu={setShowTradiaToolsSubmenu}
        />
        {showTradiaToolsSubmenu &&
          (isMobile ? (
            <Drawer
              anchor="left"
              open={showTradiaToolsSubmenu}
              onClose={handleCloseTradiaTools}
              PaperProps={{
                sx: {
                  width: "100vw",
                  maxWidth: "100%",
                  backgroundColor: theme.palette.background.default,
                },
              }}
            >
              <TradiaToolsSubmenu
                theme={theme}
                onClose={handleCloseTradiaTools}
                onBack={() => setShowTradiaToolsSubmenu(false)}
                setMessage={setMessage}
              />
            </Drawer>
          ) : (
            <TradiaToolsSubmenu
              theme={theme}
              onClose={handleCloseTradiaTools}
              onBack={() => setShowTradiaToolsSubmenu(false)}
              setMessage={setMessage}
            />
          ))}

        {showIndustriesSubmenu && !selectedIndustry && !isMobile && (
          <IndustriesSubmenu
            theme={theme}
            industries={Object.keys(industriesData)}
            selectedIndustry={selectedIndustry}
            onIndustrySelect={handleIndustrySelect}
            onClose={() => {
              setShowIndustriesSubmenu(false);
              setSelectedIndustry(null);
            }}
          />
        )}
        {selectedIndustry && !isMobile && (
          <IndustryPromptsSubmenu
            theme={theme}
            industry={selectedIndustry}
            prompts={industriesData[selectedIndustry]}
            onPromptSelect={handlePromptSelect}
            onBack={() => setSelectedIndustry(null)}
          />
        )}
        <ChatArea
          theme={theme}
          isMobile={isMobile}
          chatId={chatId}
          chatHistory={currentChatHistory}
          message={message}
          setMessage={setMessage}
          attachedFiles={attachedFiles}
          setAttachedFiles={setAttachedFiles}
          fileInputRef={fileInputRef}
          handleSendMessage={handleSendMessage}
          handleDrawerToggle={handleDrawerToggle}
          handleThemeToggle={handleThemeToggle}
          navigate={navigate}
          aiResponse={aiResponse}
          lastMessageRef={lastMessageRef}
          isLoading={isLoading}
        />
      </Box>
    </ThemeProvider>
  );
}

export default ChatPage;
