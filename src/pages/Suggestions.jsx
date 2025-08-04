import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';
import { useTranslation } from '../contexts/TranslationContext';

const Suggestions = () => {
    const [submitted, setSubmitted] = useState(false);
    const { t } = useTranslation();
    // In a real app, check if user is logged in to pre-fill fields
    const isUserLoggedIn = false; 

    const handleSubmit = (e) => {
        e.preventDefault();
        // --- BACKEND INTEGRATION POINT ---
        // const formData = new FormData(e.target);
        // const data = Object.fromEntries(formData.entries());
        // fetch('YOUR_BACKEND_URL/suggestions', { method: 'POST', body: JSON.stringify(data) });
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                <h2 className="text-2xl font-bold text-green-400">{t('suggestionsSubmitted')}</h2>
                <p className="text-gray-400 mt-2">{t('suggestionsSubmittedDesc')}</p>
            </motion.div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-100">{t('suggestionsTitle')}</h1>
            <p className="text-lg text-gray-400 text-center mb-8">{t('suggestionsDescription')}</p>
            <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8 rounded-lg bg-gray-800/50 border border-gray-700/50">
                {!isUserLoggedIn && (
                    <>
                        <Input name="email" type="email" placeholder={t('emailPlaceholder')} required />
                        <Input name="organization" type="text" placeholder={t('organizationPlaceholder')} />
                        <Input name="contact" type="text" placeholder={t('contactPlaceholder')} />
                    </>
                )}
                <Textarea name="suggestion" placeholder={t('suggestionPlaceholder')} rows="5" required />
                <Button type="submit" className="w-full">{t('submitButton')}</Button>
            </form>
        </motion.div>
    );
};

export default Suggestions;
