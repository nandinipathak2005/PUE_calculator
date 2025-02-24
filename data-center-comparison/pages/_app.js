import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PUECalculator = () => {
  const [workload, setWorkload] = useState("");
  const [powerUsage, setPowerUsage] = useState("");
  const [pue, setPUE] = useState(1.5); // Default value for PUE
  const [results, setResults] = useState(null);

  const calculateImpact = () => {
    if (!workload || !powerUsage || !pue || pue <= 0 || workload < 0 || powerUsage < 0) {
      alert("Please enter valid positive values.");
      return;
    }

    // Industry-standard PUE values
    const traditionalPUE = 2.0; // Traditional data centers
    const greenPUE = 1.2; // Green data centers
    const nonConventionalPUE = 1.5; // Mixed-energy approach

    const traditionalImpact = workload * powerUsage * traditionalPUE;
    const greenImpact = workload * powerUsage * greenPUE;
    const nonConventionalImpact = workload * powerUsage * nonConventionalPUE;

    setResults({
      traditional: traditionalImpact.toFixed(2),
      green: greenImpact.toFixed(2),
      nonConventional: nonConventionalImpact.toFixed(2),
    });
  };

  return (
    <div style={{ backgroundColor: "black", color: "white", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center" }}>
        ⚡ Data Center PUE Calculator
      </h1>

      <div style={{ backgroundColor: "#222", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px #39FF14", width: "90%", maxWidth: "400px" }}>
        <label style={{ display: "block", marginBottom: "10px" }}>Workload (kW):</label>
        <input type="number" value={workload} min="0" onChange={(e) => setWorkload(Math.max(0, e.target.value))}
          style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #39FF14", backgroundColor: "#111", color: "white" }} />
        
        <label style={{ display: "block", marginBottom: "10px" }}>Power Usage (kWh):</label>
        <input type="number" value={powerUsage} min="0" onChange={(e) => setPowerUsage(Math.max(0, e.target.value))}
          style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #39FF14", backgroundColor: "#111", color: "white" }} />
        
        <button onClick={calculateImpact} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#39FF14", color: "black", fontWeight: "bold", cursor: "pointer" }}>
          Calculate Impact
        </button>

        {results && (
          <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#111", borderRadius: "5px", color: "#39FF14", textAlign: "center" }}>
            <h3 style={{ fontWeight: "bold", marginBottom: "10px" }}>🌍 Energy Consumption</h3>
            <p>🔥 Traditional (PUE 2.0): <span style={{ color: "red" }}>{results.traditional}</span> kWh</p>
            <p>🌿 Green (PUE 1.2): <span style={{ color: "lightgreen" }}>{results.green}</span> kWh</p>
            <p>📀 Non-Conventional (PUE 1.5): <span style={{ color: "yellow" }}>{results.nonConventional}</span> kWh</p>
          </div>
        )}
      </div>
      
      {results && (
        <div style={{ width: "80%", maxWidth: "600px", marginTop: "20px" }}>
          <Bar 
            data={{
              labels: ["Traditional", "Green", "Non-Conventional"],
              datasets: [{
                label: "Energy Consumption (kWh)",
                data: [results.traditional, results.green, results.nonConventional],
                backgroundColor: ["red", "lightgreen", "yellow"],
              }],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                title: { display: true, text: "Data Center Energy Consumption" },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PUECalculator;
