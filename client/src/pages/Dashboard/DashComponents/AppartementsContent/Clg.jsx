import React, { useState, useEffect } from "react";

function Clg() {
  const [consoleLogs, setConsoleLogs] = useState([]);

  useEffect(() => {
    // Function to capture console logs
    const captureConsoleLogs = (type, args) => {
      setConsoleLogs((prevLogs) => [...prevLogs, { type, message: args }]);
    };

    // Save original console methods
    const originalConsoleLog = console.log;
    const originalConsoleWarn = console.warn;
    const originalConsoleError = console.error;

    // Override console methods
    console.log = (...args) => {
      originalConsoleLog(...args); // Preserve the original console.log behavior
      captureConsoleLogs("log", args);
    };
    console.warn = (...args) => {
      originalConsoleWarn(...args); // Preserve the original console.warn behavior
      captureConsoleLogs("warn", args);
    };
    console.error = (...args) => {
      originalConsoleError(...args); // Preserve the original console.error behavior
      captureConsoleLogs("error", args);
    };

    // Clean up the console log capture on component unmount
    return () => {
      console.log = originalConsoleLog; // Restore the original console.log
      console.warn = originalConsoleWarn; // Restore the original console.warn
      console.error = originalConsoleError; // Restore the original console.error
    };
  }, []); // Empty dependency array ensures it only runs once on mount

  return (
    <div>
      <h2>Console Logs:</h2>
      {consoleLogs.map((log, index) => (
        <div
          key={index}
          style={{
            color:
              log.type === "error"
                ? "red"
                : log.type === "warn"
                ? "orange"
                : "black",
          }}
        >
          {log.message.map((entry, entryIndex) => (
            <div key={entryIndex}>
              {typeof entry === "object" ? (
                <pre>{JSON.stringify(entry, null, 2)}</pre>
              ) : (
                <span>{entry}</span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Clg;
