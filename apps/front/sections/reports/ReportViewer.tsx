import UsageGraph from '@/components/UsageGrapth/UsageGraph';
import NodeReport, { NodeReportResult } from '@/types/nodeReport';
import { toTitleCase } from '@/utility/toTitleCase';
import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface ReportViewerProps {
  reports: NodeReport[];
}

const getLables = (results: NodeReportResult[]) =>
  results.map(({ aggregation_period }) => aggregation_period);

const getData = (results: NodeReportResult[]) =>
  results.map(({ avg }) => Math.floor(parseFloat(avg)));

const ReportViewer: React.FC<ReportViewerProps> = ({ reports }) => {
  const downloadAsPDF = () => {
    const container = document.getElementById('pdf');
    html2canvas(container).then((canvas) => {
      const img = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(img, 'JPEG', 0, 0, 210, 210);
      pdf.save(`${reports.at(0).nodeUuid}.pdf`);
    });
  };
  return (
    <Card id="pdf">
      <CardHeader
        title={`Node: ${reports.at(0).nodeUuid}`}
        action={<Button onClick={downloadAsPDF}>Download PDF</Button>}
      />
      <CardContent>
        <Grid container spacing={2}>
          {reports.map(({ property, result }, index) => (
            <Grid key={index} item xs={12}>
              <UsageGraph
                title={toTitleCase(property.propertyName)}
                subheader={toTitleCase(property.domain)}
                chartLabels={getLables(result)}
                chartData={[
                  {
                    name: toTitleCase(property.propertyName),
                    type: 'area',
                    fill: 'gradient',
                    data: getData(result),
                  },
                ]}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ReportViewer;
