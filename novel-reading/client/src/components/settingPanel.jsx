import React, { useState, useRef, useEffect } from 'react';

const settingPanel = () => {
    const ref = useRef();
    const featureRef = useRef();
    const [fontSize, setFontSize] = useState(20);
    const [background, setBackground] = useState('pink');
    const [isOpen, setIsOpen] = useState(false);

    const handleFontSizeChange = (change) => {
        setFontSize(prev => Math.max(10, prev + change));
    };

    const handleBackgroundColorChange = (color) => {
        setBackground(color);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target) && !featureRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    
    return (
        <div className="fixed top-1/2 right-20 transform -translate-y-1/2 z-50">
            <button
                ref={featureRef}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-coral-pink text-white p-5 rounded-lg shadow-lg"
            >
                <i className="fi fi-rr-settings"></i>
            </button>

            {isOpen && (
                <div ref={ref} className="absolute right-0 top-14 w-64 bg-white text-coral-pink p-4 rounded-lg shadow-lg">
                    <p className="text-2xl font-semibold mb-4">DISPLAY OPTIONS</p>
                    <div className="mb-4">
                        <p className="text-xl font-semibold mb-2 text-coral-pink">Background</p>
                        <div className="flex space-x-2">
                            <button
                                className={`h-10 w-10 rounded-full ${background === 'white' ? 'ring-2 ring-grey' : ''}`}
                                style={{ backgroundColor: 'white' }}
                                onClick={() => handleBackgroundColorChange('white')}
                            ></button>
                            <button
                                className={`h-10 w-10 rounded-full ${background === 'beige' ? 'ring-2 ring-grey' : ''}`}
                                style={{ backgroundColor: 'beige' }}
                                onClick={() => handleBackgroundColorChange('beige')}
                            ></button>
                            <button
                                className={`h-10 w-10 rounded-full ${background === 'black' ? 'ring-2 ring-black' : ''}`}
                                style={{ backgroundColor: 'black' }}
                                onClick={() => handleBackgroundColorChange('black')}
                            ></button>
                        </div>
                    </div>
                    <div>
                        <p className="text-xl font-semibold mb-2 text-coral-pink">Font Size</p>
                        <div className="flex items-center space-x-2 text-smoke">
                            <button
                                className="bg-gray py-1 px-2 rounded"
                                onClick={() => handleFontSizeChange(-1)}
                            >
                                A-
                            </button>
                            <span className="text-l">{fontSize}</span>
                            <button
                                className="bg-gray py-1 px-2 rounded"
                                onClick={() => handleFontSizeChange(1)}
                            >
                                A+
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default settingPanel;
