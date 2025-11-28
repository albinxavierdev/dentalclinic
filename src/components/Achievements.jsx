import React from 'react';
import { Trophy, Star, Award } from 'lucide-react';

const Achievements = () => {
    const achievements = [
        {
            icon: <Trophy className="w-8 h-8" />,
            title: "Best Dental Clinic 2023",
            description: "Awarded by Indian Dental Association"
        },
        {
            icon: <Star className="w-8 h-8" />,
            title: "Excellence in Endodontics",
            description: "National Healthcare Awards"
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: "Patient Choice Award",
            description: "5 years in a row"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Achievements</h2>
                    <p className="text-blue-100 max-w-2xl mx-auto">
                        Recognized for excellence in dental care and patient satisfaction
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {achievements.map((achievement, index) => (
                        <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all border border-white/20">
                            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                {achievement.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                            <p className="text-blue-100">{achievement.description}</p>
                        </div>
                    ))}
                </div>

                {/* Limca Book Section */}
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="md:w-1/3">
                            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-8 text-center shadow-2xl">
                                <Award className="w-16 h-16 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold mb-2">LIMCA BOOK</h3>
                                <p className="text-sm">OF RECORDS</p>
                            </div>
                        </div>
                        <div className="md:w-2/3">
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                LIMCA BOOK OF RECORDS HAS BESTOWED THIS RECORD
                            </h3>
                            <p className="text-blue-100 leading-relaxed mb-4">
                                Dr. Vikram Ahuja has been recognized in the Limca Book of Records for performing
                                the highest number of successful root canal treatments in a single year. This
                                achievement showcases our commitment to excellence and patient care.
                            </p>
                            <p className="text-sm text-blue-200 italic">
                                "This recognition motivates us to continue providing world-class dental care to our patients."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Achievements;
