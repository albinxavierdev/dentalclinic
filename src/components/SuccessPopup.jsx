import React from 'react';
import { CheckCircle, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SuccessPopup = ({ isOpen, onClose, appointment }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
                    >
                        {/* Success Icon */}
                        <div className="bg-gradient-to-br from-blue-400 to-blue-500 p-8 text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4"
                            >
                                <CheckCircle className="text-blue-500" size={48} />
                            </motion.div>
                            <h2 className="text-2xl font-bold text-white mb-2">Appointment Booked!</h2>
                            <p className="text-blue-50">Your appointment request has been submitted successfully</p>
                        </div>

                        {/* Details */}
                        <div className="p-6">
                            <div className="bg-gray-50 rounded-xl p-4 mb-6">
                                <h3 className="font-bold text-gray-800 mb-3">Appointment Details</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Name:</span>
                                        <span className="font-medium text-gray-800">{appointment?.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Service:</span>
                                        <span className="font-medium text-gray-800">{appointment?.service}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Date:</span>
                                        <span className="font-medium text-gray-800">{appointment?.date}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Time:</span>
                                        <span className="font-medium text-gray-800">{appointment?.time}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Status:</span>
                                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                                            {appointment?.status || 'Pending'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Contact CTA */}
                            <div className="bg-gradient-to-r from-blue-500 to-blue-500 rounded-xl p-4 mb-6 text-white">
                                <p className="text-sm mb-2 opacity-90">For any queries, call us at:</p>
                                <a
                                    href="tel:+919876543210"
                                    className="flex items-center justify-center gap-2 text-xl font-bold hover:underline"
                                >
                                    <Phone size={24} />
                                    +91 98765 43210
                                </a>
                            </div>

                            <div className="text-center text-sm text-gray-600 mb-4">
                                <p>We will confirm your appointment shortly via email or phone.</p>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="w-full bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-full font-bold transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SuccessPopup;
