import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, CheckCircle, Clock, AlertTriangle, Database, SlidersHorizontal, ToggleLeft, ToggleRight, Loader2 } from 'lucide-react';

// --- BACKEND INTEGRATION POINT ---
const fetchAdminData = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
        overallAccuracy: 94.7,
        avgResponseTime: 1.8,
        totalQueries: 1245,
        systemStatus: 'Operational',
        ragPipeline: 'Active',
        maintenanceMode: false
    };
};

const AdminView = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const loadData = async () => setData(await fetchAdminData());
        loadData();
    }, []);

    if (!data) return <div className="flex-1 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-purple-400" /></div>;

    const stats = [
        { title: 'Overall Accuracy', value: `${data.overallAccuracy}%`, icon: CheckCircle, color: 'text-green-400' },
        { title: 'Avg. Response Time', value: `${data.avgResponseTime}s`, icon: Clock, color: 'text-blue-400' },
        { title: 'Total Queries Today', value: data.totalQueries, icon: BarChart2, color: 'text-yellow-400' },
        { title: 'System Status', value: data.systemStatus, icon: data.systemStatus === 'Operational' ? CheckCircle : AlertTriangle, color: data.systemStatus === 'Operational' ? 'text-green-400' : 'text-red-400' },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div key={stat.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                        <StatCard {...stat} />
                    </motion.div>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ConfigCard title="API Configuration" icon={SlidersHorizontal}>
                    {/* Placeholder for API config form */}
                    <p className="text-sm text-gray-400">Manage API keys, base URLs, and model parameters here.</p>
                </ConfigCard>
                <ConfigCard title="Feature Toggles" icon={Database}>
                     <FeatureToggle label="Maintenance Mode" enabled={data.maintenanceMode} />
                     <FeatureToggle label="RAG Pipeline" enabled={data.ragPipeline === 'Active'} />
                </ConfigCard>
            </div>
        </motion.div>
    );
};

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-gray-900/50 border border-gray-800/50 p-6 rounded-lg">
        <div className="flex items-center justify-between"><p className="text-sm font-medium text-gray-400">{title}</p><Icon className={`w-6 h-6 ${color}`} /></div>
        <p className={`mt-2 text-3xl font-semibold ${color}`}>{value}</p>
    </div>
);

const ConfigCard = ({ title, icon: Icon, children }) => (
    <div className="bg-gray-900/50 border border-gray-800/50 p-6 rounded-lg">
        <div className="flex items-center gap-3 mb-4"><Icon className="w-6 h-6 text-purple-400" /><h3 className="text-xl font-bold">{title}</h3></div>
        <div className="space-y-4">{children}</div>
    </div>
);

const FeatureToggle = ({ label, enabled }) => (
    <div className="flex items-center justify-between text-sm">
        <span className="text-gray-300">{label}</span>
        <button className="flex items-center gap-2">
            {enabled ? <ToggleRight className="w-10 h-10 text-green-400" /> : <ToggleLeft className="w-10 h-10 text-gray-500" />}
        </button>
    </div>
);

export default AdminView;


