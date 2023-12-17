import React from "react";

const ComponentLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-300 bg-opacity-50">
      <img
        className="w-auto h-auto" // Adjust the size as needed
        src="/loader-icon.svg"
        alt="Loading"
      />
    </div>
  );
};

export default ComponentLoader;
