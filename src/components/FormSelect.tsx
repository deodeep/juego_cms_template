import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

interface SelectProps {
  label: string
  onChangeHandler: Function
  menuItems: Array<any>
  isError: boolean
}

const FormSelect: React.FC<SelectProps> = ({ label, onChangeHandler, menuItems, isError }) => {
  function onOptionChange(e: any) {
    onChangeHandler && onChangeHandler(e.target.value)
  }
  return (
    <Box sx={{width:'100%'}}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select label={label} onChange={onOptionChange} error={isError}>
          {menuItems.map((item: any) => {
            return <MenuItem value={item}>{item}</MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
  )
}

export default FormSelect
