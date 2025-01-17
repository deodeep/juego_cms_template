// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import MUIDataTableComp from 'src/views/tables/MUIDataTableUI'
import TableBasic from 'src/views/tables/TableBasic'
import TableCollapsible from 'src/views/tables/TableCollapsible'
import TableCustomized from 'src/views/tables/TableCustomized'
import TableDense from 'src/views/tables/TableDense'
import TableSpanning from 'src/views/tables/TableSpanning'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const MUITable = () => {
  return (
    <Grid container spacing={6}>
          <MUIDataTableComp />
      {/* <Grid item xs={12}>
        <Card>
        </Card>
      </Grid> */}
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='https://mui.com/components/tables/' target='_blank'>
            MUI Tables
          </Link>
        </Typography>
        <Typography variant='body2'>Tables display sets of data. They can be fully customized</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Basic Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableBasic />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Dense Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableDense />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Sticky Header' titleTypographyProps={{ variant: 'h6' }} />
          <TableStickyHeader />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Collapsible Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableCollapsible />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Spanning Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableSpanning />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Customized Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableCustomized />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
