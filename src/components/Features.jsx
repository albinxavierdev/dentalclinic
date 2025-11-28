import React from 'react';
import { Shield, Clock, Award } from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: <Shield className="w-12 h-12 text-white" />,
            title: "Safe & Sterile",
            description: "We maintain the highest standards of hygiene and sterilization for your safety.",
            bgColor: "bg-blue-600"
        },
        {
            icon: <Clock className="w-12 h-12 text-white" />,
            title: "Flexible Timings",
            description: "Open 7 days a week with extended hours to fit your busy schedule.",
            bgColor: "bg-blue-600"
        },
        {
            icon: <Award className="w-12 h-12 text-white" />,
            title: "Expert Care",
            description: "Our team of specialists ensures you receive the best treatment possible.",
            bgColor: "bg-pink-500"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                        A place to look and feel your best
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                            <div className={`${feature.bgColor} w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-blue-900 mb-3 text-center">{feature.title}</h3>
                            <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
