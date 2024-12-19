import { useEffect, useState } from "react";
import Modal from "./Modal";
import getSubject from "../../../Api/manageSubject/getSubject";
import CreateSubjectForm from "./createSubject";
import { Subject } from "../../../types/types";
import UpdateSubject from "./UpdateSubject";

const ManageSubjects = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filteredSubject, setFilteredSubject] = useState<Subject | null>(null);
  const [subjectCode, setSubjectCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [subjectToUpdate, setSubjectToUpdate] = useState<Subject | null>(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await getSubject();
        if (response.success) {
          setSubjects(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch subjects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const handleSearch = () => {
    setError(null);
    setFilteredSubject(null);

    if (!subjectCode.trim()) {
      setError("Please enter a subject code.");
      return;
    }

    const subject = subjects.find(
      (sub) => String(sub.subCode).toLowerCase() === subjectCode.toLowerCase()
    );

    if (subject) {
      setFilteredSubject(subject);
    } else {
      setError("No subject found for the provided code.");
    }
  };

  const handleCreateSubject = (newSubject: Partial<Subject>) => {
    console.log("Subject Created:", newSubject);
    setShowModal(false); // Close modal after submitting
    // Ideally, call API to create the subject and refresh the list
  };
  const handleUpdate = (UpdateSubject: Partial<Subject>) => {
    // <Navigate to={`/admin/dashboard/update-subject/${subject._id}`}></Navigate>
    console.log("Subject Created:", UpdateSubject);
    setShowModal(false); // Close modal after submitting
  };

  if (loading) {
    return (
      <div className="text-center text-xl text-gray-500 py-8">Loading...</div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter Subject Code"
          value={subjectCode}
          onChange={(e) => setSubjectCode(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full max-w-md"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Create Subject
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {filteredSubject && (
        <div
          key={filteredSubject._id}
          className="bg-white border border-gray-200 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            {filteredSubject.name}
          </h3>
          <p className="text-gray-600">
            Subject Code: {filteredSubject.subCode}
          </p>
          <p className="text-gray-600">Credits: {filteredSubject.credit}</p>
          <p className="text-gray-600">Mark: {filteredSubject.mark}</p>
          <p className="text-gray-600">
            Department: {filteredSubject.departmentId.name}
          </p>
          <p className="text-gray-600">
            Semester: {filteredSubject.semesterId.name}
          </p>

          {/* Update button */}
          <button
            onClick={() => {
              setSubjectToUpdate(filteredSubject); // Set the subject to update
              setShowModal(true); // Show the update modal
            }}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            Update
          </button>

          {/* Modal for Updating */}
          <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
            {subjectToUpdate ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Update Subject</h2>
                <UpdateSubject
                  subject={subjectToUpdate} // Pass the subject to update
                  onSubmit={handleUpdate}
                />
              </>
            ) : (
              <div>Loading...</div>
            )}
          </Modal>
        </div>
      )}

      {/* Modal Component with input form */}
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-semibold mb-4">Create New Subject</h2>
        <CreateSubjectForm onSubmit={handleCreateSubject} />
      </Modal>
    </div>
  );
};

export default ManageSubjects;
