import { BrowserRouter, Routes, Route} from "react-router-dom";
import Kpis from "./components/kpis/Kpis";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/kpis" element={<Kpis />} />
      </Routes>
    </BrowserRouter>
  );
}


//line

// import Stack from '@mui/material/Stack';
// import { LineChart } from '@mui/x-charts/LineChart';

// const margin = { right: 24 };
// const data = [4000, 3000, 2000, null, 1890, 2390, 3490];
// const xData = ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G'];
// export default function LineChartConnectNulls() {
//   return (
//     <Stack sx={{ width: '100%', height: 400 }}>
   
//       <LineChart
//         xAxis={[{ data: xData, scaleType: 'point', height: 28 }]}
//         series={[{ data, connectNulls: true, showMark: true }]}
//         margin={margin}
//       />
//     </Stack>
//   );
// }


// //progress
// import Stack from '@mui/material/Stack';
// import { Gauge } from '@mui/x-charts/Gauge';

// export default function BasicGauges() {
//   return (
//     <div style={{ position: 'relative', width: 200, height: 200 }}>
//       <Gauge width={200} height={200} value={72} text={""} />

//       <div
//         style={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           textAlign: 'center',
//         }}
//       >
//         <div style={{ fontSize: 14, color: '#888' }}>Progreso</div>
//         <div style={{ fontSize: 28, fontWeight: 'bold' }}>72%</div>
//       </div>
//     </div>
//   );
// }