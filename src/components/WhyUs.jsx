import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const WhyUs = () => {
    const benefits = [
        "Experienced Team of Specialists",
        "Advanced Dental Technology",
        "Comfortable & Relaxing Environment",
        "Personalized Treatment Plans",
        "Affordable Pricing"
    ];

    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-16">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:w-1/2"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">Why Dental Clinic?</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            We are dedicated to providing the best dental care with a personal touch.
                            Our clinic is equipped with modern facilities to ensure your comfort and safety.
                            We believe in building long-lasting relationships with our patients based on trust and quality care.
                        </p>

                        <ul className="space-y-4 mb-8">
                            {benefits.map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <CheckCircle className="text-blue-500 flex-shrink-0" size={20} />
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-colors">
                            Read More
                        </button>
                    </motion.div>

                    {/* Image Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:w-1/2"
                    >
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Dental Clinic Interior"
                                className="rounded-2xl shadow-xl w-full object-cover h-[400px]"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg max-w-xs hidden md:block border-l-4 border-blue-500">
                                <p className="text-gray-800 font-medium italic">"Your smile is our priority. We ensure every visit is comfortable."</p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default WhyUs;
