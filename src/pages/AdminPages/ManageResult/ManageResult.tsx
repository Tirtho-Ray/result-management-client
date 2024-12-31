import { useState, useEffect } from "react";
import { TextField, Button, Typography, Grid, Card, CardContent, MenuItem, Select, FormControl, InputLabel, CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import api from "../../../Api/Api";
import { RTApiResponse, RTResult, RTSemester, RTStudent, RTSubject } from "../../../types/types";

const ManageResult = () => {
  const [rollNumber, setRollNumber] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<RTStudent | null>(null);
  const [semesters, setSemesters] = useState<RTSemester[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [subjects, setSubjects] = useState<RTSubject[]>([]);
  const [results, setResults] = useState<RTResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await api.get<RTApiResponse<RTSemester[]>>("/api/semesters");
        if (response.data.success) {
          setSemesters(response.data.data);
        }
      } catch (error) {
        Swal.fire("Error", "Failed to fetch semesters", "error");
      }
    };
    fetchSemesters();
  }, []);

  const searchStudent = async () => {
    try {
      setLoading(true);
      const response = await api.get<RTApiResponse<RTStudent>>(
        `/api/students?rollNumber=${rollNumber}`
      );
      if (response.data.success) {
        setSelectedStudent(response.data.data);
        Swal.fire("Success", "Student found!", "success");
      } else {
        Swal.fire("Error", "Student not found!", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to search for student", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    if (!selectedSemester) {
      Swal.fire("Warning", "Please select a semester first", "warning");
      return;
    }

    try {
      setLoading(true);
      const response = await api.get<RTApiResponse<RTSubject[]>>(`/api/subject`);
      if (response.data.success) {
        const semesterSubjects = response.data.data.filter(
          (subject) => subject.semesterId === selectedSemester
        );
        setSubjects(semesterSubjects);
        setResults(
          semesterSubjects.map((subject) => ({
            subjectId: subject._id,
            obtainedMarks: 0,
          }))
        );
      }
    } catch (error) {
      Swal.fire("Error", "Failed to fetch subjects", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleMarksChange = (subjectId: string, marks: number) => {
    setResults((prevResults) =>
      prevResults.map((result) =>
        result.subjectId === subjectId
          ? { ...result, obtainedMarks: marks }
          : result
      )
    );
  };

  const submitResult = async () => {
    if (!selectedStudent || !selectedSemester) {
      Swal.fire("Error", "Student or Semester not selected", "error");
      return;
    }

    const payload = {
      studentId: selectedStudent._id,
      semesterId: selectedSemester,
      results,
    };

    try {
      setLoading(true);
      const response = await api.post<RTApiResponse<null>>("/api/results", payload);
      if (response.data.success) {
        Swal.fire("Success", "Result submitted successfully!", "success");
      } else {
        Swal.fire("Error", "Failed to submit result", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to submit result", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Manage Result
      </Typography>
      <Card style={{ marginBottom: "2rem", padding: "1rem" }}>
        <CardContent>
          <Typography variant="h6">Search Student</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Enter Roll Number"
                variant="outlined"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={searchStudent}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Search"}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {selectedStudent && (
        <Card style={{ marginBottom: "2rem" }}>
          <CardContent>
            <Typography variant="h6">Student Details</Typography>
            <Typography>Name: {selectedStudent.name}</Typography>
            <Typography>Roll Number: {selectedStudent.boardRoll}</Typography>
            <Typography>Registration: {selectedStudent.registration}</Typography>
          </CardContent>
        </Card>
      )}

      {selectedStudent && (
        <Card style={{ marginBottom: "2rem" }}>
          <CardContent>
            <Typography variant="h6">Select Semester</Typography>
            <FormControl fullWidth>
              <InputLabel>Select Semester</InputLabel>
              <Select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
              >
                {semesters.map((semester) => (
                  <MenuItem key={semester._id} value={semester._id}>
                    {semester.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginTop: "1rem" }}
              onClick={fetchSubjects}
              disabled={loading}
            >
              Load Subjects
            </Button>
          </CardContent>
        </Card>
      )}

      {subjects.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6">Enter Marks</Typography>
            {subjects.map((subject) => (
              <Grid container spacing={2} key={subject._id} style={{ marginBottom: "1rem" }}>
                <Grid item xs={6}>
                  <Typography>
                    {subject.subCode} - {subject.name}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="number"
                    label="Marks"
                    fullWidth
                    value={
                      results.find((result) => result.subjectId === subject._id)?.obtainedMarks || ""
                    }
                    onChange={(e) =>
                      handleMarksChange(subject._id, Number(e.target.value))
                    }
                  />
                </Grid>
              </Grid>
            ))}
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={submitResult}
              disabled={loading}
            >
              Submit Result
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ManageResult;
