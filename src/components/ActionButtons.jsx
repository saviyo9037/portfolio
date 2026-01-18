function ActionButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
      
      <button
        className="border border-purple-700 px-6 py-3 bg-purple-900 text-white 
                   text-lg font-bold rounded-xl
                   hover:bg-white hover:text-purple-900 transition duration-300"
      >
        CONTACT ME
      </button>

      <button
        className="border border-purple-700 px-6 py-3 text-white 
                   text-lg font-bold rounded-xl
                   hover:bg-purple-900 hover:text-white transition duration-300"
      >
        DOWNLOAD MY RESUME
      </button>

    </div>
  );
}

export default ActionButtons;
