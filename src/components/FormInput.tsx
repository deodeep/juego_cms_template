import {TextField } from '@mui/material'
import React from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

interface InputProps {
  label: string
  onChangeHandler: Function
  type?: string
  error: boolean
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
}

const FormInput: React.FC<InputProps> = ({ label, onChangeHandler, type = 'text', error,errorMessage }) => {
  const handleInputChange = (e: any) => {
    onChangeHandler && onChangeHandler(e.target.value)
  }

  return (
    <TextField label={label} type={type} onChange={handleInputChange} error={error} helperText={errorMessage} fullWidth/>
  )
}

export default FormInput
