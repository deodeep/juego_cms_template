import React from 'react'
import { Form } from 'react-final-form'
import { TextField, Checkboxes, Select, DateTimePicker } from 'mui-rff'
import {
  Grid,
  Button,
  MenuItem,
  CardContent,
  Card,
  Box,
  Typography,
  InputAdornment,
  InputProps,
  OutlinedInputProps,
  FilledInputProps
} from '@mui/material'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

interface FormData {
  tournamentType: string
  tournamentName: string
  tournamentStartDate: Date
  tournamentEndDate: Date
  regDuration: string
  waitingTime: string
  durationPerGame: string
  playerTurnTimer: string
  entryAmount: string
  prizePool: string
  notification: boolean
}

const onSubmit = async (values: FormData) => {
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
  await sleep(300)
  window.alert(JSON.stringify(values, null, 2))
}

const validate = (values: FormData) => {
  const errors: Partial<FormData> = {}
  if (isNaN(parseFloat(values.durationPerGame))) {
    errors.durationPerGame = 'Invalid duration'
  }
  return errors
}

const createTextFields = (
  label: string,
  name: keyof FormData,
  margin: 'none' | 'normal' | 'dense' | undefined,
  required: boolean,
  isDisabled: boolean,
  inputProps?: Partial<FilledInputProps> | Partial<OutlinedInputProps> | Partial<InputProps> | undefined
) => {
  return (
    <TextField
      label={label}
      name={name}
      margin={margin}
      required={required}
      disabled={isDisabled}
      InputProps={inputProps}
    />
  )
}

const createDateTimePicker = (label: string, name: keyof FormData) => {
  return <DateTimePicker label={label} name={name} />
}

const formFields = [
  {
    size: 6,
    field: (
      <Select name='tournamentType' label='TournamentType' formControlProps={{ margin: 'none' }}>
        <MenuItem value='4 Players & 3 Winners'>4 Players & 3 Winners</MenuItem>
        <MenuItem value='2 Players & 1 Winner'>2 Players & 1 Winner</MenuItem>
      </Select>
    )
  },
  {
    size: 6,
    field: createTextFields('Tournament Name', 'tournamentName', 'none', true, false)
  },
  {
    size: 6,
    field: createDateTimePicker('Tournament Start Date & Time', 'tournamentStartDate')
  },
  {
    size: 6,
    field: createDateTimePicker('Tournament End Date & Time', 'tournamentEndDate')
  },
  {
    size: 6,
    field: createTextFields('Registration Duration', 'regDuration', 'none', false, true)
  },
  {
    size: 6,
    field: createTextFields('Waiting Time (Auto Calculation)', 'waitingTime', 'none', false, true)
  },
  {
    size: 6,
    field: createTextFields('Duration', 'durationPerGame', 'none', false, false, {
      endAdornment: <InputAdornment position='end'>mm</InputAdornment>
    })
  },
  {
    size: 6,
    field: createTextFields('Player Turn Timer', 'playerTurnTimer', 'none', false, false, {
      endAdornment: <InputAdornment position='end'>sec</InputAdornment>
    })
  },
  {
    size: 6,
    field: createTextFields('Entry Amount Per Participant', 'entryAmount', 'none', false, false)
  },

  {
    size: 6,
    field: createTextFields('Prize Pool', 'prizePool', 'none', false, false)
  },
  {
    size: 12,
    field: (
      <Checkboxes
        name='notification'
        formControlProps={{ margin: 'none' }}
        data={{ label: 'Send Notification', value: true }}
      />
    )
  }
]

const CreateTournament = () => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div>
          <Typography variant='h4'> Create Tournament </Typography>
          <Card style={{ minHeight: '80vh', margin: '1rem 0', overflow: 'scroll', width: '100%' }}>
            <CardContent>
              <Form
                onSubmit={onSubmit}
                validate={validate}
                initialValues={{ regDuration: '00 : 00 : 00', waitingTime: '00 : 00', entryAmount: 0 }}
                render={({ handleSubmit, form, submitting, pristine, values }) => (
                  <form onSubmit={handleSubmit} >
                    <Box sx={{ margin: '1rem' }}>
                      <Typography variant='h6'> Create Tournament</Typography>
                    </Box>
                    <Grid container spacing={3}>
                      {formFields.map((item, idx) => (
                        <Grid item xs={item.size} key={idx}>
                          {item.field}
                        </Grid>
                      ))}
                      <Grid item style={{ marginTop: 16 }}>
                        <Button type='button' onClick={() => form.reset()}>
                          Reset
                        </Button>
                      </Grid>
                      <Grid item style={{ marginTop: 16 }}>
                        <Button variant='contained' color='primary' type='submit' disabled={submitting}>
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                )}
              />
            </CardContent>
          </Card>
        </div>
      </LocalizationProvider>
    </MuiPickersUtilsProvider>
  )
}

export default React.memo(CreateTournament)
