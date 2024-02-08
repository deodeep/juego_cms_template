import React, { useRef, useState } from "react";
import MUIDataTableUI from "src/views/tables/MUIDataTableUI";
import { Box, Button, Card, CardContent, FilledInputProps, Grid, IconButton, InputProps, MenuItem, Modal, OutlinedInputProps, Typography } from "@mui/material";
import { TextField, Select } from 'mui-rff'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Form } from 'react-final-form'
import { defaultData, initialData } from "src/lib/constants";
import useBounceBack from "src/hooks/useBounceBack";

const Tournament: React.FC = () => {

  const [filteredData, setFilteredData] = useState<Employee[]>([]);
  const [data, setData] = useState<Employee[]>(initialData);
  const [open, setOpen] = React.useState(false);
  const [editUserData, setEditUserData] = useState<Employee>(defaultData);
  const [isEditData, setEditDataEnable] = useState<boolean>(false);

  const searchQueryRef = useRef<string>("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createTextFields = (
    label: string,
    name: keyof FormDataType,
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

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "company",
      label: "Company",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "city",
      label: "City",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "phone_number",
      label: "Phone Number",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "state",
      label: "State",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex: number) => {
          const rowData: any = data[dataIndex];

          return (
            <>
              <IconButton
                aria-label="edit"
                onClick={() => handleEdit(rowData)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(rowData)}
              >
                <DeleteIcon />
              </IconButton>
            </>
          );
        },
      },
    },
  ];

  const formFields = [
    {
      size: 6,
      field: createTextFields('Name', 'name', 'none', true, false)
    },
    {
      size: 6,
      field: createTextFields('Company', 'company', 'none', false, false)
    },
    {
      size: 6,
      field: createTextFields('City', 'city', 'none', false, false)
    },
    {
      size: 6,
      field: createTextFields('Phone No', 'phone_number', 'none', true, false)
    },
    {
      size: 6,
      field: (
        <Select name='state' label='State' formControlProps={{ margin: 'none' }}>
          <MenuItem value='CT'>CT</MenuItem>
          <MenuItem value='NY'>NY</MenuItem>
          <MenuItem value='TX'>TX</MenuItem>
          <MenuItem value='NY'>FL</MenuItem>
        </Select>
      )
    },

  ]

  const options = {
    filterType: "checkbox",
    rowsPerPage: 5,
    // viewColumns: false, // To hide selection of columns in the table header
    onTableChange: (action: string, tableState: any) => {
      if (action === "search") {
        const query: string = tableState?.searchText?.toLowerCase();
        searchQueryRef.current = query;
        // updateFilteredData();
      } else if (action === 'rowSelectionChange') {
        console.log("tableState", tableState?.selectedRows);
      } else if (action === "rowDelete") {
        console.log("tableState", tableState?.selectedRows);
      }
    },
    rowsPerPageOptions: [5, 10, 20],
    // selectableRows: "none", // To hide checkboxes
  };

  const handleEdit = (rowData: Employee) => {
    setEditUserData(rowData);
    setEditDataEnable(true);
    handleOpen();
  };

  const handleDelete = (rowData: Employee) => {
    const updatedData: Employee[] = data.filter((row) => row !== rowData);
    setData(updatedData);
  };

  const handleAddUserClick = () => {
    setEditUserData(defaultData);
    setEditDataEnable(false);
    handleOpen();
  };

  useBounceBack(2000, () => {
    const filtered: Employee[] = data.filter(
      (row: any) =>
        row.name.toLowerCase().includes(searchQueryRef.current) ||
        row.company.toLowerCase().includes(searchQueryRef.current) ||
        row.city.toLowerCase().includes(searchQueryRef.current) ||
        row.state.toLowerCase().includes(searchQueryRef.current)
    );
    if (JSON.stringify(filtered) !== JSON.stringify(filteredData)) {
      setFilteredData(filtered)
    }
  })

  const onSubmit = async (values: FormDataType) => {
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    await sleep(300);
    let updatedData: Employee[] = [];
    if (isEditData) {
      updatedData = data.map(user =>
        user.id === editUserData?.id ? { id: editUserData?.id, ...values } : user
      );
    }
    else {
      const addUserData: Employee = {
        id: data.length,
        ...values
      }
      updatedData = [...data, addUserData];
    }    
    setData(updatedData);
    setEditUserData(defaultData);
    setEditDataEnable(false);
    handleClose();
  }

  const validate = (values: FormDataType) => {
    const errors: Partial<FormDataType> = {}
    if (!isNaN(parseFloat(values.phone_number)) && (values.phone_number)?.length !== 10) {
      errors.phone_number = 'Phone Number Should contain 10digits'
    }
    return errors;
  }

  return (
    <>
      <MUIDataTableUI
        data={searchQueryRef.current ? filteredData : data}
        onAddUserClick={handleAddUserClick}
        columns={columns}
        options={options}
        tableTitle={"User List"}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: 'center', height: "100vh", width: "100vw" }}
      >
        <Card style={{ margin: '1rem 0', overflow: 'auto', width: '50%', alignItems: 'center' }}>
          <CardContent>
            <Form
              onSubmit={onSubmit}
              validate={validate}
              initialValues={editUserData}
              render={({ handleSubmit, form, submitting }: formTypes) => (
                <form onSubmit={handleSubmit}>
                  <Box sx={{ margin: '1rem' }}>
                    <Typography variant='h6'>{isEditData ? 'Edit User' : 'Add User'}</Typography>
                  </Box>
                  <Grid container spacing={3}>
                    {formFields.map((item, idx) => (
                      <Grid item xs={item.size} key={idx}>
                        {item.field}
                      </Grid>
                    ))}  
                  </Grid>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: 'flex-end', gap: "1rem"}}>
                  <Grid item style={{ marginTop: 16 }}>
                      <Button type='button' onClick={() => {form.reset(), setEditUserData(defaultData)}}>
                        Reset
                      </Button>
                    </Grid>
                    <Grid item style={{ marginTop: 16 }}>
                      <Button variant='contained' color='primary' type='submit' disabled={submitting}>
                        {isEditData ? 'Edit' : 'Submit'}
                      </Button>
                    </Grid>
                  </Box>
                </form>
              )}
            />
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default Tournament;
