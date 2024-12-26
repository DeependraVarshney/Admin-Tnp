 // components/admin/communication/CommunicationLogs.jsx
 export const CommunicationLogs = () => {
    const [logs, setLogs] = useState([
      {
        id: 1,
        type: 'email',
        recipient: 'student@example.com',
        subject: 'Interview Schedule',
        status: 'delivered',
        timestamp: '2024-02-20T10:00:00'
      }
    ]);
  
    return (
      <Card>
        <CardContent>
          {/* Communication logs interface */}
        </CardContent>
      </Card>
    );
  };
  
 