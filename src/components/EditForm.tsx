import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Button,
  CardContent,
  Card,
  Grid,
  Typography,
  InputLabel
} from '@mui/material'
import FormInput from './FormInput'
import FormSelect from './FormSelect'
import FormDateTimePicker from './FormDateTimePicker'

const EditForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm()

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data))
    // You can perform additional actions like sending data to a server here
  }

  return (
    <Card>
      <CardContent sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='h5'>Edit Tournament</Typography>
            </Grid>
            <Grid item xs={12}>
              <InputLabel >User Name</InputLabel>
              <Controller
                name='textValue'
                control={control}
                defaultValue=''
                rules={{ required: 'This field is required' }}
                render={({ field }) => (
                  <FormInput
                    label={'Name'}
                    onChangeHandler={field.onChange}
                    error={!!errors.textValue}
                    errorMessage={errors.textValue?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='numberValue'
                control={control}
                defaultValue={0}
                rules={{ required: 'This field is required' }}
                render={({ field }) => (
                  <FormInput
                    label={'Age'}
                    onChangeHandler={field.onChange}
                    type={'number'}
                    error={!!errors.textValue}
                    errorMessage={errors.textValue?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='selectValue'
                control={control}
                defaultValue=''
                rules={{ required: 'Please select an option' }}
                render={({ field }) => (
                  <FormSelect
                    label='Select'
                    onChangeHandler={field.onChange}
                    menuItems={['Apple', 'Orange', 'Lemon']}
                    isError={!!errors.textValue}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='Date'
                control={control}
                defaultValue=''
                rules={{ required: 'Please select an option' }}
                render={({ field }) => (
                 <FormDateTimePicker label={'Date'} onChangeHandler={field.onChange} />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' color='primary' sx={{ mt: 2 }}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default EditForm
