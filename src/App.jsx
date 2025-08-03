import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import ProblemStatement from './pages/ProblemStatement';
import Challenges from './pages/Challenges';
import Suggestions from './pages/Suggestions';
import Profile from './pages/Profile';
import AdminView from './components/AdminView';

// --- Helper Functions & Placeholders ---

// This function simulates checking the user's role from a backend.
const checkUserRole = async () => {
    // COMMENTED OUT FOR NOW - NO BACKEND YET
    // In a real app, you'd verify a JWT token here.
    // We'll simulate a toggle for demonstration.
    // return new Promise(resolve => {
    //     const role = Math.floor(Date.now() / 15000) % 2 === 0 ? 'admin' : 'user';
    //     console.log(`Current role (simulated): ${role}`);
    //     resolve(role);
    // });
    
    // DEFAULT TO USER FOR NOW
    return new Promise(resolve => {
        console.log('Current role: user (default - no backend)');
        resolve('user');
    });
};

const App = () => {
    const [page, setPage] = useState('home');
    const [role, setRole] = useState('user');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const determineRole = async () => {
            setIsLoading(true);
            const userRole = await checkUserRole();
            setRole(userRole);
            setIsLoading(false);
        };
        determineRole();
        // COMMENTED OUT - NO NEED TO KEEP CHECKING ROLE WITHOUT BACKEND
        // const intervalId = setInterval(determineRole, 15000);
        // return () => clearInterval(intervalId);
    }, []);

    const renderPage = () => {
        if (isLoading) {
            return <div className="flex-1 flex items-center justify-center text-gray-400">Loading...</div>;
        }
        if (role === 'admin') {
            return <AdminView />;
        }
        switch (page) {
            case 'home': return <Home />;
            case 'about': return <About />;
            case 'problem': return <ProblemStatement />;
            case 'challenges': return <Challenges />;
            case 'suggestions': return <Suggestions />;
            case 'profile': return <Profile />;
            default: return <Home />;
        }
    };

    return (
        <Layout role={role} setPage={setPage} activePage={page}>
            <AnimatePresence mode="wait">
                {renderPage()}
            </AnimatePresence>
        </Layout>
    );
};

export default App;
