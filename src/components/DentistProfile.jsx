import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Users } from 'lucide-react';

const DentistProfile = () => {
    const qualifications = [
        "BDS, MDS (Endodontics)",
        "Fellow of International College of Dentists",
        "20+ Years of Clinical Experience",
        "Specialist in Root Canal Treatment"
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-16">

                    {/* Image Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:w-1/2"
                    >
                        <div className="relative">
                            <div className="bg-gradient-to-br from-blue-100 to-blue-100 rounded-3xl p-8">
                                <img
                                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                    alt="Dr. Vikram Ahuja"
                                    className="rounded-2xl shadow-xl w-full object-cover h-[500px]"
                                />
                            </div>

                            {/* Floating Stats */}
                            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg hidden md:block">
                                <div className="flex items-center gap-3 mb-2">
                                    <Users className="text-blue-600" size={24} />
                                    <div>
                                        <p className="text-2xl font-bold text-blue-900">20,000+</p>
                                        <p className="text-sm text-gray-600">Happy Patients</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:w-1/2"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Meet Your Dentist</h2>
                        <h3 className="text-2xl font-bold text-blue-600 mb-6">Dr. Vikram Ahuja</h3>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Dr. Vikram Ahuja is a highly experienced endodontist with over 20 years of practice.
                            He is passionate about providing painless dental care and has helped thousands of patients
                            achieve healthy, beautiful smiles. His expertise in root canal treatment is recognized
                            nationally and internationally.
                        </p>

                        <div className="space-y-3 mb-8">
                            {qualifications.map((qual, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <GraduationCap className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                                    <span className="text-gray-700">{qual}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-colors">
                                Book Consultation
                            </button>
                            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-bold transition-colors">
                                View Profile
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default DentistProfile;
