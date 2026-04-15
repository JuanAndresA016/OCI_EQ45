
//progress
import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';

export default function Percentage() {
  return (
    <div style={{ position: 'relative', width: 200, height: 200 }}>
      <Gauge width={200} height={200} value={72} text={""} />

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 14, color: '#888' }}><span>En tiempo</span></div>
        <div style={{ fontSize: 28, fontWeight: 'bold', color: "#000" }}><span style={{color: "#000"}}>72%</span></div>
      </div>
    </div>
  );
}