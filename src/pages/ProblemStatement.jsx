import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Settings, Search, Code, Brain, Database } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

const ProblemStatement = () => {
    const { t } = useTranslation();

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-6xl mx-auto space-y-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-100 mb-8">{t('problemTitle')}</h1>
            <p className="text-lg text-gray-400 text-center max-w-3xl mx-auto mb-8">{t('problemDescription')}</p>
        
        {/* Q.1 Problem Statement */}
        <motion.div 
            className="p-6 sm:p-8 rounded-lg bg-gray-800/50 border border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-black text-white px-3 py-1 rounded font-bold text-sm">Q.1</div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-100">{t('problemStatementTitle')}</h2>
            </div>
            
            <p className="text-base sm:text-lg leading-relaxed text-gray-200 mb-6">
                <span className="font-semibold">{t('designLLMSystem')}</span>
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Requirements */}
                <div className="bg-blue-950/30 border-l-4 border-blue-400 p-4 rounded">
                    <h3 className="font-semibold text-blue-300 mb-3">{t('inputRequirements')}</h3>
                    <ul className="space-y-2 text-gray-300">
                        <li>{t('processPDFs')}</li>
                        <li>{t('handlePolicy')}</li>
                        <li>{t('parseQueries')}</li>
                    </ul>
                </div>

                {/* Technical Specifications */}
                <div className="bg-purple-950/30 border-l-4 border-purple-400 p-4 rounded">
                    <h3 className="font-semibold text-purple-300 mb-3">{t('technicalSpecifications')}</h3>
                    <ul className="space-y-2 text-gray-300">
                        <li>{t('useEmbeddings')}</li>
                        <li>{t('implementClause')}</li>
                        <li>{t('provideExplainable')}</li>
                        <li>{t('outputJSON')}</li>
                    </ul>
                </div>
            </div>

            {/* Sample Query */}
            <div className="mt-6 bg-gray-700/30 p-4 rounded border border-gray-600">
                <h3 className="font-semibold text-gray-200 mb-2">{t('sampleQuery')}</h3>
                <p className="text-gray-300 italic font-mono text-sm">
                    {t('sampleQueryText')}
                </p>
            </div>
        </motion.div>

        {/* Q.2 System Architecture */}
        <motion.div 
            className="p-6 sm:p-8 rounded-lg bg-gray-800/50 border border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-black text-white px-3 py-1 rounded font-bold text-sm">Q.2</div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-100">{t('systemArchitectureTitle')}</h2>
            </div>

            <p className="text-base sm:text-lg text-gray-200 mb-6">
                <span className="font-semibold">2.1)</span> {t('systemArchitectureDesc')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                    { 
                        number: "1", 
                        titleKey: "inputDocuments", 
                        descKey: "pdfBlobURL", 
                        icon: FileText,
                        bgColor: "bg-blue-950/20",
                        borderColor: "border-blue-500/30",
                        circleColor: "bg-blue-500/20",
                        iconColor: "text-blue-400"
                    },
                    { 
                        number: "2", 
                        titleKey: "llmParser", 
                        descKey: "extractQuery", 
                        icon: Brain,
                        bgColor: "bg-purple-950/20",
                        borderColor: "border-purple-500/30",
                        circleColor: "bg-purple-500/20",
                        iconColor: "text-purple-400"
                    },
                    { 
                        number: "3", 
                        titleKey: "embeddingSearch", 
                        descKey: "faissRetrieval", 
                        icon: Search,
                        bgColor: "bg-green-950/20",
                        borderColor: "border-green-500/30",
                        circleColor: "bg-green-500/20",
                        iconColor: "text-green-400"
                    },
                    { 
                        number: "4", 
                        titleKey: "clauseMatching", 
                        descKey: "semanticSimilarity", 
                        icon: Settings,
                        bgColor: "bg-orange-950/20",
                        borderColor: "border-orange-500/30",
                        circleColor: "bg-orange-500/20",
                        iconColor: "text-orange-400"
                    },
                    { 
                        number: "5", 
                        titleKey: "logicEvaluation", 
                        descKey: "decisionProcessing", 
                        icon: Database,
                        bgColor: "bg-red-950/20",
                        borderColor: "border-red-500/30",
                        circleColor: "bg-red-500/20",
                        iconColor: "text-red-400"
                    },
                    { 
                        number: "6", 
                        titleKey: "jsonOutput", 
                        descKey: "structuredResponse", 
                        icon: Code,
                        bgColor: "bg-cyan-950/20",
                        borderColor: "border-cyan-500/30",
                        circleColor: "bg-cyan-500/20",
                        iconColor: "text-cyan-400"
                    }
                ].map((component, index) => (
                    <motion.div
                        key={component.number}
                        className={`p-4 rounded-lg ${component.bgColor} border ${component.borderColor} text-center`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                        <div className={`w-12 h-12 rounded-full ${component.circleColor} flex items-center justify-center mx-auto mb-3`}>
                            <span className="text-white font-bold">{component.number}</span>
                        </div>
                        <component.icon className={`w-6 h-6 ${component.iconColor} mx-auto mb-2`} />
                        <h3 className="font-semibold text-gray-100 mb-1">{t(component.titleKey)}</h3>
                        <p className="text-sm text-gray-400">{t(component.descKey)}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>

        {/* Q.4 API Documentation */}
        <motion.div 
            className="p-6 sm:p-8 rounded-lg bg-gray-800/50 border border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-black text-white px-3 py-1 rounded font-bold text-sm">Q.4</div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-100">{t('apiDocumentationTitle')}</h2>
            </div>

            <div className="space-y-6">
                {/* Base URL */}
                <div className="bg-gray-700/30 p-4 rounded border border-gray-600">
                    <h3 className="font-semibold text-gray-200 mb-2">{t('baseURLTitle')}</h3>
                    <div className="bg-black p-3 rounded font-mono text-sm">
                        <span className="text-green-400">http://localhost:8000/api/v1</span>
                    </div>
                </div>

                {/* Authentication */}
                <div className="bg-gray-700/30 p-4 rounded border border-gray-600">
                    <h3 className="font-semibold text-gray-200 mb-2">{t('authenticationTitle')}</h3>
                    <div className="bg-black p-3 rounded font-mono text-xs">
                        <span className="text-green-400">Authorization: Bearer 52e10e56bc55ec56dd26783ea2cef3196cf8f7c6354a5b39d872559874bd29a5</span>
                    </div>
                    <p className="text-green-400 text-sm mt-2">{t('teamTokenLoaded')}</p>
                </div>

                {/* API Endpoints */}
                <div className="bg-gray-700/30 p-4 rounded border border-gray-600">
                    <h3 className="font-semibold text-gray-200 mb-4">{t('apiEndpointsTitle')}</h3>
                    <div className="bg-gray-800/50 p-3 rounded border border-gray-600">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">POST</span>
                            <span className="text-gray-300">/hackrx/run</span>
                        </div>
                        <p className="text-gray-400 text-sm">{t('runSubmissions')}</p>
                    </div>
                </div>

                {/* Sample Request */}
                <div className="bg-gray-700/30 p-4 rounded border border-gray-600">
                    <h3 className="font-semibold text-gray-200 mb-2">{t('sampleUploadRequest')}</h3>
                    <div className="bg-black p-3 rounded font-mono text-xs overflow-x-auto">
                        <div className="text-green-400">POST /hackrx/run</div>
                        <div className="text-blue-400">Content-Type: application/json</div>
                        <div className="text-blue-400">Accept: application/json</div>
                        <div className="text-yellow-400">Authorization: Bearer 52e10e56bc55ec56dd26783ea2cef3196cf8f7c6354a5b39d872559874bd29a5</div>
                    </div>
                </div>

                {/* Sample Response */}
                <div className="bg-gray-700/30 p-4 rounded border border-gray-600">
                    <h3 className="font-semibold text-gray-200 mb-2">{t('sampleResponse')}</h3>
                    <div className="bg-black p-3 rounded font-mono text-xs overflow-x-auto max-h-64 overflow-y-auto">
                        <div className="text-gray-300">{`{
  "answers": [
    "A grace period of thirty days is provided for premium payment after the due date to renew or continue the policy.",
    "There is a waiting period of thirty-six (36) months of continuous coverage from the first policy inception.",
    "Yes, the policy covers maternity expenses, including childbirth and lawful medical termination of pregnancy.",
    "The policy has a specific waiting period of two (2) years for cataract surgery.",
    "Yes, the policy indemnifies the medical expenses for the organ donor's hospitalization for the purpose of organ donation.",
    "A No Claim Discount of 5% is offered for the base premium is offered on renewal for a one-year policy term if no claim is made.",
    "Yes, the policy reimburses expenses for health check-ups at the end of every block of two continuous policy years.",
    "A hospital is defined as an institution with at least 10 inpatient beds (in towns with a population below 40,000).",
    "The policy covers medical expenses for inpatient treatment under Ayurveda, Yoga, Naturopathy, Unani, Siddha, and Homeopathy.",
    "Yes, for Plan A, the daily room rent is capped at 1% of the Sum Insured, and ICU charges are capped at 2% of the Sum Insured."
  ]
}`}</div>
                    </div>
                </div>
            </div>
        </motion.div>
    </motion.div>
    );
};

export default ProblemStatement;
