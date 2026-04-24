import * as React from 'react';
import 'dayjs/locale/es';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker({ label, value, onChange }) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <DatePicker
        label={label}
        value={value}
        onChange={(newValue) => onChange(newValue)} 
        format="DD/MM/YYYY"
      />
    </LocalizationProvider>
  );
}