/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";

interface ResultModalProps {
  result: any;
  updatedResult: any;
  onInputChange: (index: number, field: string, value: string) => void;
  onClose: () => void;
  onUpdate: () => void;
}

const ResultModal: FC<ResultModalProps> = ({
  result,
  updatedResult,
  onInputChange,
  onClose,
  onUpdate,
}) => (
  <div className="modal-overlay fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
    <div className="modal-container bg-white rounded-lg p-8 max-w-4xl shadow-xl">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        {result ? `Result for ${result.studentName}` : "No Results Found"}
      </h3>
      {result ? (
        <div>
          <table className="min-w-full table-auto text-gray-700">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Code</th>
                <th>Obtained Marks</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {updatedResult.map((subject: any, index: number) => (
                <tr key={index}>
                  <td>{subject.subjectName}</td>
                  <td>{subject.subCode}</td>
                  <td>
                    <input
                      type="number"
                      value={subject.obtainedMarks}
                      onChange={(e) =>
                        onInputChange(index, "obtainedMarks", e.target.value)
                      }
                      className="border px-2 py-1 rounded"
                    />
                  </td>
                  <td>{subject.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-end space-x-4">
            <button
              onClick={onUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Update Result
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <p>No results found for the given details.</p>
      )}
    </div>
  </div>
);

export default ResultModal;
