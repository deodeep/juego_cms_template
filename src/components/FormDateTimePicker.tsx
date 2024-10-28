import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface DateTimePickerProps {
    label: string
    onChangeHandler: Function
}

const FormDateTimePicker : React.FC<DateTimePickerProps> = ({label,onChangeHandler}) => {

    const onDateTimeChange = (e:any) => {
        onChangeHandler && onChangeHandler(e)
    }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label={label}
          onChange={onDateTimeChange}
          sx={{width:'100%'}}
        />
    </LocalizationProvider>
  );
}

export default FormDateTimePicker