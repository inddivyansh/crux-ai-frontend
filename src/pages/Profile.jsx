import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Building } from 'lucide-react';
import Button from '../components/ui/Button';

// Dummy data - replace with data from your backend
const userData = {
    name: 'End User',
    email: 'user@example.com',
    organization: 'Example Corp'
};

const Profile = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">User Profile</h1>
        <div className="p-8 rounded-lg bg-white/5 dark:bg-gray-900/50 border border-gray-800/50 space-y-6">
            <div className="flex items-center gap-4">
                <User className="w-6 h-6 text-purple-400" />
                <div>
                    <p className="text-sm text-gray-400">Name</p>
                    <p className="font-semibold">{userData.name}</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-purple-400" />
                <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-semibold">{userData.email}</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Building className="w-6 h-6 text-purple-400" />
                <div>
                    <p className="text-sm text-gray-400">Organization</p>
                    <p className="font-semibold">{userData.organization}</p>
                </div>
            </div>
            <div className="pt-4">
                <Button variant="danger" onClick={() => alert('Logout logic goes here')}>Logout</Button>
            </div>
        </div>
    </motion.div>
);

export default Profile;

