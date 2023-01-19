import { useGetNodesList } from '@/api/nodes';
import UsageGraph from '@/components/UsageGrapth/UsageGraph';
import Node from '@/types/node';
import NodeReport, { NodeReportResult } from '@/types/nodeReport';
import { formatBytesWithoutName } from '@/utility/formatBytes';
import { toTitleCase } from '@/utility/toTitleCase';
import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface ReportViewerProps {
  reports: NodeReport[];
}

const getLables = (results: NodeReportResult[]) =>
  results.map(({ aggregation_period }) => aggregation_period);

const getData = (results: NodeReportResult[], aggregationType: string) =>
  results.map((record) => parseFloat(record[aggregationType]));

const getNodeName = (nodes: Node[], nodeId: string) => {
  return nodes.find(({ uuid }) => uuid === nodeId)?.name;
};

const ReportViewer: React.FC<ReportViewerProps> = ({ reports }) => {
  const { data: nodes } = useGetNodesList();
  const downloadAsPDF = () => {
    const container = document.getElementById('pdf');
    html2canvas(container).then((canvas) => {
      const img = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(img, 'JPEG', 0, 0, 210, 210);
      pdf.save(`${new Date().getTime()}.pdf`);
    });
  };
  return (
    <Card variant="outlined" id="pdf">
      <CardHeader
        action={<Button onClick={downloadAsPDF}>Download as PDF</Button>}
      />
      <CardContent>
        <Grid container spacing={2}>
          {reports.map(({ property, result, nodeUuid }, index) => {
            result.sort(
              (a, b) =>
                new Date(a.aggregation_period).getTime() -
                new Date(b.aggregation_period).getTime()
            );

            return (
              <Grid key={index} item xs={12}>
                <CardHeader title={getNodeName(nodes, nodeUuid)} />
                <UsageGraph
                  title={`${toTitleCase(
                    property.propertyName
                  )} - ${property.domain.replace(/_/g, ' ')}`}
                  subheader={`Aggregation type: ${property.aggregationType}`}
                  chartLabels={getLables(result)}
                  chartData={[
                    {
                      name: toTitleCase(property.propertyName),
                      type: 'area',
                      fill: 'gradient',
                      data: getData(result, property.aggregationType),
                    },
                  ]}
                />
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ReportViewer;
