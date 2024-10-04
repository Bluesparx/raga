import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, selectedDate, stress=0, description='', energy=0, happiness=0, calmness=0, focus=0, tags, date }) => {

  useEffect(() => {
    if (isOpen && selectedDate) {
    }
  }, [isOpen, selectedDate]);

  return (
    isOpen && (
      <div id="static-modal" className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-00 bg-opacity-50">
        <div className="relative p-4 w-full max-w-2xl">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Mood Records for {selectedDate.toLocaleDateString()}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5 space-y-4">
              {!focus ? (
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  No mood records available for this day.
                </p>
              ) : (
                  <div className="border-b text-gray-900 border-gray-200 pb-2 mb-2">
                    <p><strong>Stress:</strong> {stress}</p>
                    <p><strong>Energy:</strong> {energy}</p>
                    <p><strong>Happiness:</strong> {happiness}</p>
                    <p><strong>Calmness:</strong> {calmness}</p>
                    <p><strong>Focus:</strong> {focus}</p>
                    <p><strong>Description:</strong> {description}</p>
                  </div>
              )}
            </div>

            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                onClick={onClose}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
