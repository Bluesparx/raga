import React, { useState, useEffect } from 'react';
import DiscreteSliderMarks from '../DiscreteSliderMarks'; // Assume this is a slider component you already have
import { Navbar2 } from '../Navbar2';
import { Vortex } from '../ui/vortex';
import ContactUsForm from '../ContactUsForm';

const  ContactUsPage = () => {
    
    return (
        <>
            <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
                <Vortex>
                    {/* <Navbar2 /> */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '7rem', paddingBottom: '4rem' }}>
                       
                            <ContactUsForm/>
                     
                    </div>
                </Vortex>
            </div>
        </>
    );
};

export default ContactUsPage;
