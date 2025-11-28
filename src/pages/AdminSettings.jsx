import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Save, Plus, Trash2, Edit2, Check, X } from 'lucide-react';

const AdminSettings = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('clinic');
    const [settings, setSettings] = useState({});
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [newService, setNewService] = useState({ name: '', description: '', is_active: 1 });

    useEffect(() => {
        const isAuth = localStorage.getItem('adminAuth');
        if (!isAuth) {
            navigate('/admin');
            return;
        }

        fetchData();
    }, [navigate]);

    const fetchData = async () => {
        try {
            const [settingsRes, servicesRes] = await Promise.all([
                fetch('/api/settings'),
                fetch('/api/services')
            ]);

            const settingsData = await settingsRes.json();
            const servicesData = await servicesRes.json();

            setSettings(settingsData);
            setServices(servicesData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSettingChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSaveSettings = async () => {
        setIsSaving(true);
        try {
            await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });
            alert('Settings saved successfully!');
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('Failed to save settings');
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddService = async () => {
        if (!newService.name.trim()) {
            alert('Service name is required');
            return;
        }

        try {
            const response = await fetch('/api/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newService)
            });

            if (response.ok) {
                setNewService({ name: '', description: '', is_active: 1 });
                fetchData();
            }
        } catch (error) {
            console.error('Error adding service:', error);
        }
    };

    const handleUpdateService = async (id, data) => {
        try {
            await fetch(`/api/services/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            setEditingService(null);
            fetchData();
        } catch (error) {
            console.error('Error updating service:', error);
        }
    };

    const handleDeleteService = async (id) => {
        if (!window.confirm('Are you sure you want to delete this service?')) {
            return;
        }

        try {
            await fetch(`/api/services/${id}`, { method: 'DELETE' });
            fetchData();
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        navigate('/admin');
    };

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-blue-900">Settings</h1>
                        <p className="text-sm text-gray-600">Manage your clinic information</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate('/admin/dashboard')}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-md mb-6">
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('clinic')}
                            className={`px-6 py-4 font-medium transition-colors ${activeTab === 'clinic'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                                }`}
                        >
                            Clinic Information
                        </button>
                        <button
                            onClick={() => setActiveTab('services')}
                            className={`px-6 py-4 font-medium transition-colors ${activeTab === 'services'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                                }`}
                        >
                            Services Management
                        </button>
                        <button
                            onClick={() => setActiveTab('hours')}
                            className={`px-6 py-4 font-medium transition-colors ${activeTab === 'hours'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                                }`}
                        >
                            Opening Hours
                        </button>
                    </div>
                </div>

                {/* Clinic Information Tab */}
                {activeTab === 'clinic' && (
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Clinic Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Clinic Name</label>
                                <input
                                    type="text"
                                    value={settings.clinic_name || ''}
                                    onChange={(e) => handleSettingChange('clinic_name', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input
                                    type="text"
                                    value={settings.clinic_phone || ''}
                                    onChange={(e) => handleSettingChange('clinic_phone', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={settings.clinic_email || ''}
                                    onChange={(e) => handleSettingChange('clinic_email', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                <textarea
                                    value={settings.clinic_address || ''}
                                    onChange={(e) => handleSettingChange('clinic_address', e.target.value)}
                                    rows="3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                            </div>
                            <button
                                onClick={handleSaveSettings}
                                disabled={isSaving}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
                            >
                                <Save size={20} />
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Services Management Tab */}
                {activeTab === 'services' && (
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Services Management</h2>

                        {/* Add New Service */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <h3 className="font-medium text-gray-800 mb-3">Add New Service</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <input
                                    type="text"
                                    placeholder="Service Name"
                                    value={newService.name}
                                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={newService.description}
                                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={handleAddService}
                                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                >
                                    <Plus size={20} />
                                    Add Service
                                </button>
                            </div>
                        </div>

                        {/* Services List */}
                        <div className="space-y-3">
                            {services.map((service) => (
                                <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                                    {editingService === service.id ? (
                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                value={service.name}
                                                onChange={(e) => {
                                                    const updated = services.map(s =>
                                                        s.id === service.id ? { ...s, name: e.target.value } : s
                                                    );
                                                    setServices(updated);
                                                }}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="text"
                                                value={service.description || ''}
                                                onChange={(e) => {
                                                    const updated = services.map(s =>
                                                        s.id === service.id ? { ...s, description: e.target.value } : s
                                                    );
                                                    setServices(updated);
                                                }}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleUpdateService(service.id, service)}
                                                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                                >
                                                    <Check size={16} />
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setEditingService(null);
                                                        fetchData();
                                                    }}
                                                    className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                                                >
                                                    <X size={16} />
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-800">{service.name}</h4>
                                                <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                                                <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${service.is_active ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {service.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setEditingService(service.id)}
                                                    className="text-blue-600 hover:text-blue-800 transition-colors"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteService(service.id)}
                                                    className="text-red-600 hover:text-red-800 transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Opening Hours Tab */}
                {activeTab === 'hours' && (
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">Opening Hours</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Monday - Friday</label>
                                <input
                                    type="text"
                                    value={settings.opening_hours_weekday || ''}
                                    onChange={(e) => handleSettingChange('opening_hours_weekday', e.target.value)}
                                    placeholder="e.g., 9:00 AM - 8:00 PM"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Saturday</label>
                                <input
                                    type="text"
                                    value={settings.opening_hours_saturday || ''}
                                    onChange={(e) => handleSettingChange('opening_hours_saturday', e.target.value)}
                                    placeholder="e.g., 9:00 AM - 6:00 PM"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sunday</label>
                                <input
                                    type="text"
                                    value={settings.opening_hours_sunday || ''}
                                    onChange={(e) => handleSettingChange('opening_hours_sunday', e.target.value)}
                                    placeholder="e.g., 10:00 AM - 4:00 PM"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                onClick={handleSaveSettings}
                                disabled={isSaving}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
                            >
                                <Save size={20} />
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminSettings;
