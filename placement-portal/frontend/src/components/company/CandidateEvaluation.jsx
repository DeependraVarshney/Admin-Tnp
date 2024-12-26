// components/company/CandidateEvaluation.jsx
export const CandidateEvaluation = () => {
    // In real app, fetch from API/Redux
    const [candidate, setCandidate] = useState({
      _id: '507f1f77bcf86cd799439013',
      name: 'John Doe',
      rollNo: 'CS19B001',
      branch: 'Computer Science',
      cgpa: 9.2,
      resume: 'resume_url',
      interviewId: '507f1f77bcf86cd799439014'
    });
  
    const [evaluation, setEvaluation] = useState({
      technical: {
        problemSolving: 0,
        coding: 0,
        conceptual: 0
      },
      communication: 0,
      attitude: 0,
      comments: '',
      recommendation: ''
    });
  
    return (
      <Card>
        <CardContent>
          {/* Evaluation form implementation */}
        </CardContent>
      </Card>
    );
  };