// components/admin/reports/CustomReportBuilder.jsx
export const CustomReportBuilder = () => {
    const [reportConfig, setReportConfig] = useState({
      type: 'custom',
      metrics: ['placements', 'packages'],
      filters: {
        branch: [],
        year: '',
        company: []
      },
      groupBy: 'branch',
      format: 'excel'
    });
  
    return (
      <Card>
        <CardContent>
          {/* Custom report builder interface */}
        </CardContent>
      </Card>
    );
  };
  
 