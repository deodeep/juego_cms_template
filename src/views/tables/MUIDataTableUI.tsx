import React from "react";
import MUIDataTable from "mui-datatables";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

interface MUIDataTableUIProps {
  data: any[];
  onAddUserClick: () => void;
  columns: any[];
  options: any;
  tableTitle: string;
}

const MUIDataTableUI: React.FC<MUIDataTableUIProps> = ({
  data,
  onAddUserClick,
  columns,
  options,
  tableTitle,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <Grid container justifyContent="flex-end" alignItems="center" spacing={2} style={{ padding: '16px' }}>
            <Grid item>
              <Button variant="contained" color="primary" onClick={onAddUserClick}>
                Add User
              </Button>
            </Grid>
          </Grid>
          <MUIDataTable
            title={tableTitle}
            data={data}
            columns={columns}
            options={options}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default MUIDataTableUI;
