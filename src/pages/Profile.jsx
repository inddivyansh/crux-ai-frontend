import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Building } from 'lucide-react';
import Button from '../components/ui/Button';
import { useTranslation } from '../contexts/TranslationContext';

// Dummy data - replace with data from your backend
const userData = {
    name: 'End User',
    email: 'user@example.com',
    organization: 'Example Corp'
};

const Profile = () => {
    const { t } = useTranslation();

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">{t('profileTitle')}</h1>
            <div className="p-8 rounded-lg bg-white/5 dark:bg-gray-900/50 border border-gray-800/50 space-y-6">
                <div className="flex items-center gap-4">
                    <User className="w-6 h-6 text-purple-400" />
                    <div>
                        <p className="text-sm text-gray-400">{t('nameLabel')}</p>
                        <p className="font-semibold">{userData.name}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-purple-400" />
                    <div>
                        <p className="text-sm text-gray-400">{t('emailLabel')}</p>
                        <p className="font-semibold">{userData.email}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Building className="w-6 h-6 text-purple-400" />
                    <div>
                        <p className="text-sm text-gray-400">{t('organizationLabel')}</p>
                        <p className="font-semibold">{userData.organization}</p>
                    </div>
                </div>
                <div className="pt-4">
                    <Button variant="danger" onClick={() => alert('Logout logic goes here')}>{t('logoutButton')}</Button>
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;

