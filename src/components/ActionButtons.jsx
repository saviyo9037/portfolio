function ActionButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
      
      {/* CONTACT ME */}
      <a href="tel:9037348073">
        <button
          className="border border-purple-700 px-6 py-3 bg-purple-900 text-white 
                     text-lg font-bold rounded-xl
                     hover:bg-white hover:text-purple-900 transition duration-300"
        >
          CONTACT ME
        </button>
      </a>

      {/* DOWNLOAD RESUME */}
      <a
        href="/Saviyo_George_Resume.pdf"
        download
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          className="border border-purple-700 px-6 py-3 text-white 
                     text-lg font-bold rounded-xl
                     hover:bg-purple-900 hover:text-white transition duration-300"
        >
          DOWNLOAD MY RESUME
        </button>
      </a>

    </div>
  );
}

export default ActionButtons;
