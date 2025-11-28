import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Appointment request submitted! We will contact you soon.');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <footer id="contact" className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* About Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                K
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold leading-none">DENTAL</span>
                                <span className="text-sm text-blue-400 font-medium tracking-wider">DENTAL CLINIC</span>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Your trusted partner for comprehensive dental care. We combine expertise with compassion to deliver exceptional results.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="bg-white/10 hover:bg-blue-500 p-2 rounded-full transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="bg-white/10 hover:bg-blue-500 p-2 rounded-full transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="bg-white/10 hover:bg-blue-500 p-2 rounded-full transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="bg-white/10 hover:bg-blue-500 p-2 rounded-full transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Clock size={24} className="text-blue-400" />
                            Opening Hours
                        </h3>
                        <div className="space-y-3 text-gray-400">
                            <div className="flex justify-between">
                                <span>Monday - Friday</span>
                                <span className="text-white font-medium">9:00 AM - 8:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Saturday</span>
                                <span className="text-white font-medium">9:00 AM - 6:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Sunday</span>
                                <span className="text-white font-medium">10:00 AM - 4:00 PM</span>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-700">
                                <p className="text-sm text-blue-400">Emergency services available 24/7</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-6">Get In Touch</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="text-blue-400 flex-shrink-0 mt-1" size={20} />
                                <div className="text-gray-400">
                                    <p className="font-medium text-white mb-1">Main Clinic</p>
                                    <p className="text-sm">123 Dental Street, Medical District, Mumbai - 400001</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="text-blue-400 flex-shrink-0 mt-1" size={20} />
                                <div className="text-gray-400">
                                    <p className="font-medium text-white mb-1">Phone</p>
                                    <p className="text-sm">+91 98765 43210</p>
                                    <p className="text-sm">+91 98765 43211</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail className="text-blue-400 flex-shrink-0 mt-1" size={20} />
                                <div className="text-gray-400">
                                    <p className="font-medium text-white mb-1">Email</p>
                                    <p className="text-sm">info@dentalclinic.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Appointment Form */}
                    <div>
                        <h3 className="text-xl font-bold mb-6">Book Appointment</h3>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                                required
                            />
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                            >
                                Submit Request
                            </button>
                        </form>
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                        <p>&copy; 2024 Dental Clinic. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-blue-400 transition-colors">Sitemap</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
