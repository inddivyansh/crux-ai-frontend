import React from 'react';
import { motion } from 'framer-motion';
import { Zap, BrainCircuit, ShieldAlert } from 'lucide-react';

const challenges = [
    {
        icon: Zap,
        title: 'Real-time Performance at Scale',
        description: 'Ensuring low-latency responses from the RAG pipeline while processing large document corpora was a major hurdle. We optimized our vector search and chunking strategy to achieve sub-second retrieval times.'
    },
    {
        icon: BrainCircuit,
        title: 'Maintaining Contextual Accuracy',
        description: 'Preventing model hallucinations and ensuring the retrieved context was always relevant to the user\'s query required sophisticated prompt engineering and a multi-step verification process before generating the final answer.'
    },
    {
        icon: ShieldAlert,
        title: 'Data Security and Privacy',
        description: 'Handling sensitive documents from legal and HR domains meant implementing robust security measures. All data is encrypted at rest and in transit, with strict access controls managed by our backend.'
    }
];

const Challenges = () => (
     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-center">Challenges & Solutions</h1>
        <div className="space-y-8">
            {challenges.map((challenge, index) => (
                <motion.div 
                    key={challenge.title}
                    className="flex items-start gap-6 p-6 rounded-lg bg-white/5 dark:bg-gray-900/50 border border-gray-800/50"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                    <challenge.icon className="w-12 h-12 text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="text-xl font-bold">{challenge.title}</h3>
                        <p className="text-gray-400 mt-2">{challenge.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    </motion.div>
);

export default Challenges;
