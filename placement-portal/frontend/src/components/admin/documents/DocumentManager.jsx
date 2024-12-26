 // components/admin/documents/DocumentManager.jsx
 export const DocumentManager = () => {
    const [documents, setDocuments] = useState([
      {
        id: 1,
        type: 'offer_letter',
        studentId: 'CS001',
        companyName: 'Tech Corp',
        uploadDate: '2024-02-20',
        status: 'verified'
      }
    ]);
  
    return (
      <Card>
        <CardContent>
          {/* Document management UI */}
        </CardContent>
      </Card>
    );
  };
  
  