import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, FileText, Shield, Search, TrendingUp, User, X, LogIn, UserPlus, History, ThumbsUp, ThumbsDown } from 'lucide-react';
import Chat from '../components/Chat';
import { useTranslation } from '../contexts/TranslationContext';

const Home = () => {
    const [showChat, setShowChat] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showChatHistory, setShowChatHistory] = useState(false);
    const [selectedQuery, setSelectedQuery] = useState('');
    const { t, getRandomWelcomeMessage } = useTranslation();

    // Show login modal on first visit
    useEffect(() => {
        const hasVisited = localStorage.getItem('hasVisited');
        if (!hasVisited && !isLoggedIn) {
            setTimeout(() => setShowLoginModal(true), 2000);
            localStorage.setItem('hasVisited', 'true');
        }
    }, [isLoggedIn]);

    // Check if user came from floating chat button
    useEffect(() => {
        const openChat = localStorage.getItem('openChat');
        if (openChat === 'true') {
            setShowChat(true);
            localStorage.removeItem('openChat'); // Clear the flag
        }
    }, []);

    const taskSuggestions = [
        {
            icon: FileText,
            title: t('evaluateClaim'),
            description: t('evaluateClaimDesc'),
            query: t('evaluateClaimQuery')
        },
        {
            icon: Search,
            title: t('searchPolicy'),
            description: t('searchPolicyDesc'),
            query: t('searchPolicyQuery')
        },
        {
            icon: Shield,
            title: t('checkCompliance'),
            description: t('checkComplianceDesc'),
            query: t('checkComplianceQuery')
        },
        {
            icon: TrendingUp,
            title: t('riskAssessment'),
            description: t('riskAssessmentDesc'),
            query: t('riskAssessmentQuery')
        }
    ];

    const commonQueries = [
        t('commonQuery1'),
        t('commonQuery2'),
        t('commonQuery3'),
        t('commonQuery4'),
        t('commonQuery5')
    ];

    return (
        <div className="h-full flex flex-col">
            <AnimatePresence mode="wait">
                {!showChat ? (
                    <WelcomeScreen 
                        key="welcome"
                        onStartChat={() => setShowChat(true)}
                        taskSuggestions={taskSuggestions}
                        commonQueries={commonQueries}
                        isLoggedIn={isLoggedIn}
                        onShowHistory={() => setShowChatHistory(true)}
                        selectedQuery={selectedQuery}
                        setSelectedQuery={setSelectedQuery}
                    />
                ) : (
                    <EnhancedChat 
                        key="chat"
                        onBack={() => {
                            setShowChat(false);
                            setSelectedQuery(''); // Clear the query when going back
                        }}
                        taskSuggestions={taskSuggestions}
                        commonQueries={commonQueries}
                        isLoggedIn={isLoggedIn}
                        onShowHistory={() => setShowChatHistory(true)}
                        initialQuery={selectedQuery}
                    />
                )}
            </AnimatePresence>

            {/* Login Modal */}
            <LoginModal 
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLogin={() => {
                    setIsLoggedIn(true);
                    setShowLoginModal(false);
                }}
            />

            {/* Chat History Modal */}
            <ChatHistoryModal 
                isOpen={showChatHistory}
                onClose={() => setShowChatHistory(false)}
                isLoggedIn={isLoggedIn}
                t={t}
            />
        </div>
    );
};

const WelcomeScreen = ({ onStartChat, taskSuggestions, commonQueries, isLoggedIn, onShowHistory, selectedQuery, setSelectedQuery }) => {
    const { getRandomWelcomeMessage, t } = useTranslation();
    
    const [currentMessage] = useState(() => getRandomWelcomeMessage());

    return (
        <motion.div 
            className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto px-4 space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Welcome Message */}
            <motion.div 
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                    {currentMessage}
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    {t('description')}
                </p>
            </motion.div>

            {/* Quick Start Input */}
            <motion.div 
                className="w-full max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="relative">
                    <div className="animate-border-flow">
                        <input
                            type="text"
                            placeholder="Ask a question..."
                            value={selectedQuery}
                            onChange={(e) => {
                                setSelectedQuery(e.target.value);
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && selectedQuery.trim()) {
                                    onStartChat();
                                }
                            }}
                            className="w-full px-6 py-4 bg-gray-800/80 border-0 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm"
                        />
                    </div>
                    <motion.button
                        whileTap={{ scale: 1.0 }}
                        onClick={() => {
                            if (selectedQuery.trim()) {
                                onStartChat();
                            }
                        }}
                        type="button"
                        disabled={!selectedQuery.trim()}
                        className={`absolute right-5 top-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer z-20 transition-all ${
                            selectedQuery.trim() 
                                ? 'bg-purple-600 text-white hover:bg-purple-700' 
                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        <MessageCircle className="w-5 h-5" />
                    </motion.button>
                </div>
            </motion.div>

            {/* Chat History Button */}
            <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <button
                    onClick={onShowHistory}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-800/40 border border-gray-700/40 rounded-lg hover:bg-gray-700/40 transition-all"
                >
                    <History className="w-5 h-5" />
                    {t('chatHistory')}
                </button>
            </motion.div>

            {/* Task Suggestions */}
            <motion.div 
                className="w-full max-w-4xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <h3 className="text-xl font-semibold mb-4 text-center">{t('quickActions')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {taskSuggestions.map((task, index) => (
                        <motion.div
                            key={index}
                            className="p-4 bg-gray-800/30 border border-gray-700/30 rounded-xl hover:bg-gray-800/50 cursor-pointer transition-all"
                            whileHover={{ scale: 1.02 }}
                            onClick={() => {
                                setSelectedQuery(task.query);
                                onStartChat();
                            }}
                        >
                            <task.icon className="w-8 h-8 text-purple-400 mb-3" />
                            <h4 className="font-medium mb-2">{task.title}</h4>
                            <p className="text-sm text-gray-400">{task.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Common Queries */}
            <motion.div 
                className="w-full max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
            >
                <h4 className="text-lg font-medium mb-3 text-center">{t('popularQuestions')}</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                    {commonQueries.map((query, index) => (
                        <motion.button
                            key={index}
                            className="px-4 py-2 bg-gray-800/40 border border-gray-700/40 rounded-full text-sm hover:bg-gray-700/40 hover:border-purple-500/30 transition-all"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                setSelectedQuery(query);
                                onStartChat();
                            }}
                        >
                            {query}
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

const EnhancedChat = ({ onBack, taskSuggestions, commonQueries, isLoggedIn, onShowHistory, initialQuery }) => {
    const { t } = useTranslation();
    
    return (
        <motion.div 
            className="flex-1 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
                <button
                    onClick={onBack}
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    ← Back to Home
                </button>
                <div className="flex gap-2">
                    <button
                        onClick={onShowHistory}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                        title={t('chatHistory')}
                    >
                        <History className="w-5 h-5" />
                    </button>
                </div>
            </div>
            
            <Chat 
                taskSuggestions={taskSuggestions} 
                commonQueries={commonQueries} 
                initialQuery={initialQuery}
            />
        </motion.div>
    );
};

const LoginModal = ({ isOpen, onClose, onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);

    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                        {isLogin ? t('welcomeBack') : t('joinCrux')}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder={t('emailPlaceholder')}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                        type="password"
                        placeholder={t('passwordPlaceholder')}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    
                    <button
                        onClick={onLogin}
                        className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                    >
                        {isLogin ? t('signIn') : t('signUp')}
                    </button>

                    <p className="text-center text-gray-400">
                        {isLogin ? t('dontHaveAccount') : t('alreadyHaveAccount')}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-purple-400 hover:text-purple-300"
                        >
                            {isLogin ? t('signUp') : t('signIn')}
                        </button>
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};

const ChatHistoryModal = ({ isOpen, onClose, isLoggedIn, t }) => {
    if (!isOpen) return null;

    const mockHistory = [
        { date: '2025-08-04', query: t('commonQuery1'), responses: 3 },
        { date: '2025-08-03', query: t('commonQuery2'), responses: 2 },
        { date: '2025-08-02', query: t('commonQuery4'), responses: 5 },
    ];

    return (
        <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                        {isLoggedIn ? t('chatHistory') : t('signInRequired')}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {isLoggedIn ? (
                    <div className="space-y-4">
                        {mockHistory.map((item, index) => (
                            <div key={index} className="p-4 bg-gray-800/50 border border-gray-700/50 rounded-lg">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="font-medium">{item.query}</p>
                                    <span className="text-sm text-gray-400">{item.date}</span>
                                </div>
                                <p className="text-sm text-gray-400">{item.responses} {t('responses')}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-400 mb-4">
                            {t('signInPrompt')}
                        </p>
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                        >
                            {t('close')}
                        </button>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default Home;
