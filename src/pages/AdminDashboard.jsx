import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Trash2, Calendar, Clock, User, Mail, Phone, Menu, TrendingUp, TrendingDown, Users, CheckCircle } from 'lucide-react';
import { api } from '../config/api.js';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const statusColors = {
        Pending: 'bg-yellow-100 text-yellow-800',
        Confirmed: 'bg-blue-100 text-blue-800',
        Completed: 'bg-green-100 text-green-800',
        Cancelled: 'bg-red-100 text-red-800'
    };

    useEffect(() => {
        const isAuth = localStorage.getItem('adminAuth');
        if (!isAuth) {
            navigate('/admin');
            return;
        }

        fetchAppointments();
    }, [navigate]);

    useEffect(() => {
        filterAppointments();
    }, [searchTerm, filterStatus, appointments]);

    const fetchAppointments = async () => {
        try {
            const response = await fetch(api.appointments);
            const data = await response.json();
            setAppointments(data);
            setFilteredAppointments(data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filterAppointments = () => {
        let filtered = appointments;

        if (filterStatus !== 'All') {
            filtered = filtered.filter(apt => apt.status === filterStatus);
        }

        if (searchTerm) {
            filtered = filtered.filter(apt =>
                apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                apt.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                apt.phone.includes(searchTerm) ||
                apt.service.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredAppointments(filtered);
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await fetch(`${api.appointments}/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                fetchAppointments();
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this appointment?')) {
            return;
        }

        try {
            const response = await fetch(`${api.appointments}/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchAppointments();
            }
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    const stats = {
        total: appointments.length,
        pending: appointments.filter(a => a.status === 'Pending').length,
        confirmed: appointments.filter(a => a.status === 'Confirmed').length,
        completed: appointments.filter(a => a.status === 'Completed').length,
    };

    // Calculate trends (mock data for demonstration)
    const trends = {
        totalChange: '+12%',
        pendingChange: '+5%',
        confirmedChange: '+8%',
        completedChange: '+15%',
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Main Content */}
            <div className="flex-1 lg:ml-64">
                {/* Header */}
                <header className="bg-white shadow-sm sticky top-0 z-30">
                    <div className="px-4 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="lg:hidden text-gray-700"
                            >
                                <Menu size={24} />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                                <p className="text-sm text-gray-600">Welcome back, Admin</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-6">
                    {/* Analytics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium mb-1">Total Appointments</p>
                                    <h3 className="text-3xl font-bold text-gray-800">{stats.total}</h3>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <Calendar className="text-blue-600" size={24} />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <TrendingUp className="text-green-600" size={16} />
                                <span className="text-green-600 font-medium">{trends.totalChange}</span>
                                <span className="text-gray-500">vs last month</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium mb-1">Pending</p>
                                    <h3 className="text-3xl font-bold text-gray-800">{stats.pending}</h3>
                                </div>
                                <div className="bg-yellow-100 p-3 rounded-lg">
                                    <Clock className="text-yellow-600" size={24} />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <TrendingUp className="text-green-600" size={16} />
                                <span className="text-green-600 font-medium">{trends.pendingChange}</span>
                                <span className="text-gray-500">vs last month</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium mb-1">Confirmed</p>
                                    <h3 className="text-3xl font-bold text-gray-800">{stats.confirmed}</h3>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <Users className="text-blue-700" size={24} />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <TrendingUp className="text-green-600" size={16} />
                                <span className="text-green-600 font-medium">{trends.confirmedChange}</span>
                                <span className="text-gray-500">vs last month</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium mb-1">Completed</p>
                                    <h3 className="text-3xl font-bold text-gray-800">{stats.completed}</h3>
                                </div>
                                <div className="bg-green-100 p-3 rounded-lg">
                                    <CheckCircle className="text-green-600" size={24} />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <TrendingUp className="text-green-600" size={16} />
                                <span className="text-green-600 font-medium">{trends.completedChange}</span>
                                <span className="text-gray-500">vs last month</span>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Appointments Management</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, phone, or service..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="All">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    {/* Appointments Table */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="overflow-x-auto">
                            {isLoading ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-600">Loading appointments...</p>
                                </div>
                            ) : filteredAppointments.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-600">No appointments found</p>
                                </div>
                            ) : (
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredAppointments.map((appointment) => (
                                            <tr key={appointment.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <User size={16} className="text-gray-400" />
                                                        <div>
                                                            <p className="font-medium text-gray-900">{appointment.name}</p>
                                                            {appointment.special_request && (
                                                                <p className="text-xs text-gray-500 mt-1">Note: {appointment.special_request}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="space-y-1 text-sm">
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <Mail size={14} />
                                                            {appointment.email}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <Phone size={14} />
                                                            {appointment.phone}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-gray-900">{appointment.service}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="space-y-1 text-sm">
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <Calendar size={14} />
                                                            {appointment.date}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <Clock size={14} />
                                                            {appointment.time}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <select
                                                        value={appointment.status}
                                                        onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                                                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[appointment.status]} border-0 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Confirmed">Confirmed</option>
                                                        <option value="Completed">Completed</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => handleDelete(appointment.id)}
                                                        className="text-red-600 hover:text-red-800 transition-colors"
                                                        title="Delete appointment"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
