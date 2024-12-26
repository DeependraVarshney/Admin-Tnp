// components/admin/students/StudentProfileManager.jsx
export const StudentProfileManager = () => {
    const [students, setStudents] = useState([
      {
        id: 1,
        name: 'John Doe',
        rollNo: 'CS001',
        branch: 'CSE',
        year: '4th',
        cgpa: 8.5,
        placementStatus: 'eligible'
      }
    ]);
  
    return (
      <Card>
        <CardContent>
          {/* Student profile management UI */}
        </CardContent>
      </Card>
    );
  };
  
 