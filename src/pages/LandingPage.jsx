import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import WhyUs from '../components/WhyUs';
import Stats from '../components/Stats';
import Services from '../components/Services';
import Features from '../components/Features';
import DentistProfile from '../components/DentistProfile';
import Achievements from '../components/Achievements';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import SuccessPopup from '../components/SuccessPopup';

function LandingPage() {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
    const [currentAppointment, setCurrentAppointment] = useState(null);

    const handleBookClick = () => {
        setIsBookingModalOpen(true);
    };

    const handleBookingSuccess = (appointment) => {
        setCurrentAppointment(appointment);
        setIsSuccessPopupOpen(true);
    };

    const handleCloseSuccess = () => {
        setIsSuccessPopupOpen(false);
        setCurrentAppointment(null);
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar onBookClick={handleBookClick} />
            <Hero onBookClick={handleBookClick} />
            <WhyUs />
            <Stats />
            <Services />
            <Features />
            <DentistProfile />
            <Achievements />
            <Footer />

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                onSuccess={handleBookingSuccess}
            />

            <SuccessPopup
                isOpen={isSuccessPopupOpen}
                onClose={handleCloseSuccess}
                appointment={currentAppointment}
            />
        </div>
    );
}

export default LandingPage;
