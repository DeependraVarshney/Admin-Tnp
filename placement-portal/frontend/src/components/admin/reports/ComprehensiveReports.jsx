 // components/admin/reports/ComprehensiveReports.jsx
 export const ComprehensiveReports = () => {
    const [reports, setReports] = useState([
      {
        id: 1,
        name: 'Branch Wise Placement Report',
        type: 'placement',
        format: 'excel',
        lastGenerated: '2024-02-20'
      }
    ]);
  
    return (
      <Card>
        <CardContent>
          {/* Report generation interface */}
        </CardContent>
      </Card>
    );
  };
  
 