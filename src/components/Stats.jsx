import React from 'react';

const Stats = () => {
    const stats = [
        { number: "20,000+", label: "Happy Patients" },
        { number: "10,000+", label: "Root Canals" },
        { number: "20+", label: "Years Experience" }
    ];

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-md text-center border border-gray-100 hover:shadow-lg transition-shadow">
                            <h3 className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</h3>
                            <p className="text-gray-600 font-medium uppercase tracking-wide">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
