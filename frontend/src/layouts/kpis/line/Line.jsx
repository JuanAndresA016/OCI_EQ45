
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';

const margin = { right: 24 };
const data = [10, 25, 40, 55, 72, 72];
const xData = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6'];
export default function Line() {
  return (
    <Stack sx={{ width: '100%', height: 250 }}>
   
      <LineChart
        xAxis={[{ data: xData, scaleType: 'point', height: 28 }]}
        series={[{ data, connectNulls: true, showMark: true }]}
        margin={margin}
      />
    </Stack>
  );
}
