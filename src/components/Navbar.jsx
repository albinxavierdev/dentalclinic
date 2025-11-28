import React, { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';

const Navbar = ({ onBookClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="w-full bg-white shadow-sm sticky top-0 z-50">
            {/* Top Bar */}
            <div className="bg-blue-50 text-blue-900 py-2 text-xs md:text-sm">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1"><Phone size={14} /> +91 98765 43210</span>
                        <span className="hidden md:flex items-center gap-1"><Mail size={14} /> info@dentalclinic.com</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">Book Appointment</span>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            K
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-blue-900 leading-none">DENTAL</span>
                            <span className="text-sm text-blue-600 font-medium tracking-wider">DENTAL CLINIC</span>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</a>
                        <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About Us</a>
                        <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Services</a>
                        <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact Us</a>
                        <button
                            onClick={onBookClick}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full font-medium transition-colors"
                        >
                            Book Now
                        </button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4 flex flex-col gap-4">
                        <a href="#" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsOpen(false)}>Home</a>
                        <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsOpen(false)}>About Us</a>
                        <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsOpen(false)}>Services</a>
                        <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsOpen(false)}>Contact Us</a>
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                onBookClick();
                            }}
                            className="bg-blue-500 text-white px-5 py-2 rounded-full font-medium w-full"
                        >
                            Book Now
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
