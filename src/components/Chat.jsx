import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User as UserIcon, Loader2, Bot } from 'lucide-react';
import Textarea from './ui/Textarea';
import { useTheme } from '../hooks/useTheme';

// --- BACKEND INTEGRATION POINT ---
const fetchGpt4Response = async (messageHistory) => {
    console.log("Sending to GPT-4 backend:", messageHistory);
    // This is where you'll call your actual backend API.
    // const response = await fetch('YOUR_BACKEND_URL/chat', { ... });
    await new Promise(resolve => setTimeout(resolve, 1500));
    const lastUserMessage = messageHistory[messageHistory.length - 1].content;
    return `This is a mock GPT-4 response to: "${lastUserMessage}".`;
};

const Chat = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello! I am CRuX AI. How can I assist you today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;
        const newMessageHistory = [...messages, { role: 'user', content: input }];
        setMessages(newMessageHistory);
        setInput('');
        setIsLoading(true);
        try {
            const aiResponseText = await fetchGpt4Response(newMessageHistory);
            setMessages(prev => [...prev, { role: 'assistant', content: aiResponseText }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, an error occurred.", isError: true }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto h-full">
            <div className="flex-1 overflow-y-auto space-y-6 py-4 sm:py-8 px-2 sm:px-4">
                <AnimatePresence>
                    {messages.map((msg, index) => (
                        <motion.div key={index} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <ChatMessage message={msg} />
                        </motion.div>
                    ))}
                </AnimatePresence>
                {isLoading && <LoadingBubble />}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-2 sm:p-4">
                 <div className="relative">
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                        placeholder="Ask a question..."
                        className="w-full pl-4 pr-14 py-3 text-sm sm:text-base"
                        rows="1"
                    />
                    <button onClick={handleSend} disabled={isLoading || !input.trim()} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-purple-600 text-white disabled:bg-gray-600 hover:bg-purple-700 transition-all">
                        {isLoading ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> : <Send className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

const ChatMessage = ({ message }) => {
    const isAssistant = message.role === 'assistant';
    return (
        <div className={`flex items-start gap-2 sm:gap-4 ${!isAssistant && 'flex-row-reverse'}`}>
            <div className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${isAssistant ? 'bg-purple-500/30' : 'bg-gray-600/40'}`}>
                {isAssistant ? <Bot className="w-3 h-3 sm:w-5 sm:h-5 text-purple-400" /> : <UserIcon className="w-3 h-3 sm:w-5 sm:h-5 text-gray-300" />}
            </div>
            <div className={`px-3 py-2 sm:px-5 sm:py-3 rounded-lg max-w-[85%] sm:max-w-lg border text-sm sm:text-base ${isAssistant ? 'bg-gray-800/80 border-gray-700/50 text-gray-100' : 'bg-purple-600/30 border-purple-500/50 text-gray-100'}`}>
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
            </div>
        </div>
    );
};

const LoadingBubble = () => {
    return (
        <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2 sm:gap-4">
            <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-purple-500/30">
                <Bot className="w-3 h-3 sm:w-5 sm:h-5 text-purple-400" />
            </div>
            <div className="px-3 py-2 sm:px-5 sm:py-3 rounded-lg flex items-center gap-2 border bg-gray-800/80 border-gray-700/50">
                <motion.div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity }} />
                <motion.div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, delay: 0.1, repeat: Infinity }} />
                <motion.div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, delay: 0.2, repeat: Infinity }} />
            </div>
        </motion.div>
    );
};

export default Chat;
