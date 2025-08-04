import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User as UserIcon, Loader2, Bot, Paperclip, X, ThumbsUp, ThumbsDown, Lightbulb } from 'lucide-react';
import Textarea from './ui/Textarea';
import { useTheme } from '../hooks/useTheme';

// --- BACKEND INTEGRATION POINT ---
const fetchGpt4Response = async (messageHistory) => {
    console.log("Sending to GPT-4 backend:", messageHistory);
    // This is where you'll call your actual backend API.
    // const response = await fetch('YOUR_BACKEND_URL/chat', { ... });
    await new Promise(resolve => setTimeout(resolve, 1500));
    const lastUserMessage = messageHistory[messageHistory.length - 1].content;
    return `This is a mock GPT-4 response to: "${lastUserMessage}". I can help you analyze documents, evaluate claims, search policies, and provide insights based on your uploaded documents.`;
};

const Chat = ({ taskSuggestions = [], commonQueries = [], initialQuery = '' }) => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello! I am CRuX AI. How can I assist you today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [attachedFiles, setAttachedFiles] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showTaskSwitcher, setShowTaskSwitcher] = useState(false);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const hasProcessedInitialQuery = useRef(false);
    const processedQuery = useRef('');

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    useEffect(scrollToBottom, [messages]);

    // Reset when initialQuery changes
    useEffect(() => {
        if (initialQuery !== processedQuery.current) {
            hasProcessedInitialQuery.current = false;
            processedQuery.current = initialQuery;
        }
    }, [initialQuery]);

    // Auto-send initial query if provided (only once per query)
    useEffect(() => {
        if (initialQuery && initialQuery.trim() && !hasProcessedInitialQuery.current && !isLoading) {
            hasProcessedInitialQuery.current = true;
            
            // Add user message immediately
            const userMessage = { role: 'user', content: initialQuery };
            setMessages(prev => [...prev, userMessage]);
            setIsLoading(true);
            
            // Get AI response
            const newMessageHistory = [
                { role: 'assistant', content: "Hello! I am CRuX AI. How can I assist you today?" },
                userMessage
            ];
            
            fetchGpt4Response(newMessageHistory)
                .then(aiResponseText => {
                    setMessages(prev => [...prev, { 
                        role: 'assistant', 
                        content: aiResponseText,
                        id: Date.now()
                    }]);
                })
                .catch(() => {
                    setMessages(prev => [...prev, { 
                        role: 'assistant', 
                        content: "Sorry, an error occurred.", 
                        isError: true 
                    }]);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [initialQuery, isLoading]);

    // Show task switcher when user types
    useEffect(() => {
        if (input.trim().length > 10) {
            setShowTaskSwitcher(true);
        } else {
            setShowTaskSwitcher(false);
        }
    }, [input]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;
        
        // Prevent duplicate consecutive messages
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.role === 'user' && lastMessage.content === input.trim()) {
            return;
        }
        
        let messageContent = input;
        if (attachedFiles.length > 0) {
            messageContent += `\n\nAttached files: ${attachedFiles.map(f => f.name).join(', ')}`;
        }
        
        const newMessageHistory = [...messages, { role: 'user', content: messageContent, files: attachedFiles }];
        setMessages(newMessageHistory);
        setInput('');
        setAttachedFiles([]);
        setIsLoading(true);
        setShowTaskSwitcher(false);
        
        try {
            const aiResponseText = await fetchGpt4Response(newMessageHistory);
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: aiResponseText,
                id: Date.now() // For feedback tracking
            }]);
        } catch (error) {
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: "Sorry, an error occurred.", 
                isError: true 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileAttachment = (event) => {
        const files = Array.from(event.target.files);
        const validFiles = files.filter(file => {
            const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
            return validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024; // 10MB limit
        });
        setAttachedFiles(prev => [...prev, ...validFiles]);
    };

    const removeFile = (index) => {
        setAttachedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);
        setShowSuggestions(false);
    };

    const handleTaskSelection = (task) => {
        setInput(task.query);
        setShowTaskSwitcher(false);
    };

    const handleFeedback = (messageId, isPositive) => {
        setMessages(prev => prev.map(msg => 
            msg.id === messageId 
                ? { ...msg, feedback: isPositive ? 'positive' : 'negative' }
                : msg
        ));
        // Here you would typically send feedback to your backend
        console.log(`Feedback for message ${messageId}: ${isPositive ? 'positive' : 'negative'}`);
    };

    const filteredSuggestions = commonQueries.filter(query => 
        query.toLowerCase().includes(input.toLowerCase()) && input.trim().length > 0
    );

    return (
        <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto h-full relative">
            <div className="flex-1 overflow-y-auto space-y-6 py-4 sm:py-8 px-2 sm:px-4">
                <AnimatePresence>
                    {messages.map((msg, index) => (
                        <motion.div key={index} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <ChatMessage 
                                message={msg} 
                                onFeedback={msg.role === 'assistant' && msg.id ? (isPositive) => handleFeedback(msg.id, isPositive) : null}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
                {isLoading && <LoadingBubble />}
                <div ref={messagesEndRef} />
            </div>

            {/* Task Switcher */}
            <AnimatePresence>
                {showTaskSwitcher && taskSuggestions.length > 0 && (
                    <motion.div
                        className="absolute bottom-32 left-4 right-4 bg-gray-900/95 border border-gray-700/50 rounded-lg p-4 backdrop-blur-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Lightbulb className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm font-medium">Suggested actions for your query:</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {taskSuggestions.slice(0, 4).map((task, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleTaskSelection(task)}
                                    className="flex items-center gap-2 p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-md text-sm transition-colors"
                                >
                                    <task.icon className="w-4 h-4 text-purple-400" />
                                    {task.title}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Query Suggestions */}
            <AnimatePresence>
                {showSuggestions && filteredSuggestions.length > 0 && (
                    <motion.div
                        className="absolute bottom-32 left-4 right-4 bg-gray-900/95 border border-gray-700/50 rounded-lg p-2 backdrop-blur-sm max-h-32 overflow-y-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
                            <button
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="w-full text-left p-2 hover:bg-gray-700/50 rounded text-sm transition-colors"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Input Area */}
            <div className="p-2 sm:p-4 space-y-2">
                {/* Attached Files */}
                {attachedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {attachedFiles.map((file, index) => (
                            <div key={index} className="flex items-center gap-2 bg-gray-800/50 border border-gray-700/50 rounded-lg px-3 py-1">
                                <Paperclip className="w-4 h-4 text-gray-400" />
                                <span className="text-sm">{file.name}</span>
                                <button
                                    onClick={() => removeFile(index)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="relative">
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        placeholder="Ask a question..."
                        className="w-full pl-4 pr-20 py-3 text-sm sm:text-base"
                        rows="1"
                    />
                    
                    {/* File Upload Button */}
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute right-12 sm:right-16 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer z-10"
                        title="Attach files (PDF, Word, Text)"
                        type="button"
                    >
                        <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    {/* Send Button */}
                    <button 
                        onClick={handleSend} 
                        disabled={isLoading || !input.trim()} 
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-purple-600 text-white disabled:bg-gray-600 hover:bg-purple-700 transition-colors cursor-pointer z-10 flex items-center justify-center"
                        type="button"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                        ) : (
                            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                    </button>

                    {/* Hidden File Input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileAttachment}
                        className="hidden"
                    />
                </div>
            </div>
        </div>
    );
};

const ChatMessage = ({ message, onFeedback }) => {
    const isAssistant = message.role === 'assistant';
    return (
        <div className={`flex items-start gap-2 sm:gap-4 ${!isAssistant && 'flex-row-reverse'}`}>
            <div className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${isAssistant ? 'bg-purple-500/30' : 'bg-gray-600/40'}`}>
                {isAssistant ? <Bot className="w-3 h-3 sm:w-5 sm:h-5 text-purple-400" /> : <UserIcon className="w-3 h-3 sm:w-5 sm:h-5 text-gray-300" />}
            </div>
            <div className={`px-3 py-2 sm:px-5 sm:py-3 rounded-lg max-w-[85%] sm:max-w-lg border text-sm sm:text-base ${isAssistant ? 'bg-gray-800/80 border-gray-700/50 text-gray-100' : 'bg-purple-600/30 border-purple-500/50 text-gray-100'}`}>
                <p className="whitespace-pre-wrap break-words">{message.content}</p>
                
                {/* Feedback buttons for assistant messages */}
                {isAssistant && onFeedback && (
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-700/30">
                        <span className="text-xs text-gray-400">Was this helpful?</span>
                        <button
                            onClick={() => onFeedback(true)}
                            className={`p-1 rounded transition-colors ${
                                message.feedback === 'positive' 
                                    ? 'text-green-400 bg-green-400/20' 
                                    : 'text-gray-400 hover:text-green-400'
                            }`}
                        >
                            <ThumbsUp className="w-3 h-3" />
                        </button>
                        <button
                            onClick={() => onFeedback(false)}
                            className={`p-1 rounded transition-colors ${
                                message.feedback === 'negative' 
                                    ? 'text-red-400 bg-red-400/20' 
                                    : 'text-gray-400 hover:text-red-400'
                            }`}
                        >
                            <ThumbsDown className="w-3 h-3" />
                        </button>
                    </div>
                )}
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
