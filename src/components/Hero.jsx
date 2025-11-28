import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ onBookClick }) => {
    return (
        <section className="relative bg-gradient-to-r from-blue-400 to-blue-300 py-16 md:py-24 overflow-hidden">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="md:w-1/2 text-white z-10"
                >
                    <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider mb-2 opacity-90">Comprehensive Services</h2>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        Modern Equipment & <br />Technology
                    </h1>
                    <p className="text-lg md:text-xl mb-8 opacity-90 max-w-lg">
                        We provide state-of-the-art dental services with the latest technology to ensure your smile is perfect.
                    </p>
                    <button
                        onClick={onBookClick}
                        className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Book Appointment
                    </button>
                </motion.div>

                {/* Image Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="md:w-1/2 relative z-10"
                >
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30">
                        <img
                            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Dental Procedure"
                            className="w-full h-auto object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>

                    {/* Floating Badge */}
                    <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg hidden md:block">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-full">
                                <span className="text-2xl">🦷</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Dental Care</p>
                                <p className="font-bold text-gray-800">Top Rated</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform origin-top-right"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
        </section>
    );
};

export default Hero;
