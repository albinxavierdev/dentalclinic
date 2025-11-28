import React from 'react';
import { ArrowRight } from 'lucide-react';

const Services = () => {
    const services = [
        {
            title: "Root Canal",
            description: "Save your natural tooth with our painless root canal treatment.",
            image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            title: "Dental Implants",
            description: "Permanent solution for missing teeth with natural look and feel.",
            image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            title: "Cosmetic Dentistry",
            description: "Enhance your smile with veneers, bonding, and more.",
            image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            title: "Teeth Whitening",
            description: "Brighten your smile with our safe and effective whitening.",
            image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            title: "Orthodontics",
            description: "Straighten your teeth with braces or clear aligners.",
            image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" // Reusing image for demo
        }
    ];

    return (
        <section id="services" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">How Can I Help You?</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We offer a wide range of dental services to cater to all your oral health needs.
                        From routine checkups to complex surgeries, we have you covered.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-blue-800 mb-3">{service.title}</h3>
                                <p className="text-gray-600 mb-4 text-sm line-clamp-2">{service.description}</p>
                                <a href="#" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
                                    Read More <ArrowRight size={16} className="ml-1" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
