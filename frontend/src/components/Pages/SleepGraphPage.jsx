import React, { useState } from 'react';
import DiscreteSliderMarks from '../DiscreteSliderMarks';
import { Navbar2 } from '../Navbar2';
import { Vortex } from '../ui/vortex';
import SleepGraph from '../SleepGraph';
const SleepGraphPage = () => {
   

    return (
        <>
            <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
                <Vortex>
                    <Navbar2 />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '7rem', paddingBottom: '4rem' }}>
                        <div style={{
                            width: '100%',
                            maxWidth: '60%',
                            padding: '40px',
                            backgroundColor: 'black',
                            borderRadius: '12px',
                            boxShadow: '0 1px 10px rgba(0, 0, 0, 0.3)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}>
                            <h1 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '28px', color: '#f5f5f5' }}>Sleep Graph</h1>
                          <SleepGraph/>
                        </div>
                    </div>
                </Vortex>
            </div>
        </>
    );
};

export default SleepGraphPage;
