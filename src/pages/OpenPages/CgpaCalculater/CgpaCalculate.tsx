import React, { useState } from "react";


const semesterWeights = {
  2010: [5, 5, 5, 15, 15, 20, 25, 10],
  2016: [5, 5, 5, 10, 15, 20, 25, 15],
  2022: [5, 5, 10, 10, 20, 20, 20, 10],
};

const CgpaCalculate: React.FC = () => {
  const [grades, setGrades] = useState<(string | null)[]>(Array(8).fill(null));
  const [selectedYear, setSelectedYear] = useState<keyof typeof semesterWeights>(2010);
  const [cgpa, setCgpa] = useState<number | null>(null);

  const handleGradeChange = (index: number, value: string) => {
    const newGrades = [...grades];
    newGrades[index] = value;
    setGrades(newGrades);
  };

  const calculateCGPA = () => {
    const weights = semesterWeights[selectedYear];
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    const weightedSum = grades.reduce((sum, grade, index) => {
      const numericGrade = grade ? parseFloat(grade) : 0;
      return sum + numericGrade * (weights[index] / 100);
    }, 0);
    setCgpa(weightedSum / (totalWeight / 100));
  };

  const resetFields = () => {
    setGrades(Array(8).fill(null));
    setCgpa(null);
  };

  return (
   <>
    <div className="container mx-auto p-6 max-w-lg bg-gradient-to-br from-blue-50 via-white to-blue-50 shadow-2xl rounded-2xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">CGPA Calculator</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">Select Year:</label>
        <select
          className="border border-gray-300 p-3 rounded-lg shadow-md w-full focus:ring focus:ring-blue-300 focus:outline-none"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value) as keyof typeof semesterWeights)}
        >
          {Object.keys(semesterWeights).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {grades.map((grade, index) => (
          <div
            key={index}
            className="bg-white p-3 rounded-md shadow-lg border border-gray-200 hover:shadow-xl transition-all"
          >
            <label className="block text-sm font-semibold mb-2 text-gray-600">
              Semester {index + 1}:
            </label>
            <input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*\.?[0-9]*"
              placeholder="e.g. 3.85"
              value={grade || ""}
              onChange={(e) => handleGradeChange(index, e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={calculateCGPA}
          className="bg-blue-600 text-white px-4 py-3 rounded-xl shadow hover:bg-blue-700 w-full transition-transform transform hover:scale-105"
        >
          Calculate CGPA
        </button>
        <button
          onClick={resetFields}
          className="bg-red-500 text-white px-4 py-3 rounded-xl shadow hover:bg-red-600 w-full transition-transform transform hover:scale-105"
        >
          Reset
        </button>
      </div>

      {cgpa !== null && (
        <div className="mt-6 text-center bg-blue-100 p-5 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-blue-700">Your CGPA: {cgpa.toFixed(2)}</h2>
        </div>
      )}
    </div>
   </>
  );
};

export default CgpaCalculate;
