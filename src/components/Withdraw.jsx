import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const columns = [
    { field: 'imageUrl', headerName: '', width: 150, sortable: false, filtered: false, renderCell: (params) => <img src={params.value} width={80} height={80} />, },
    { field: 'marketName', headerName: 'Market Name', width: 500, sortable: false, headerClassName: 'super-app-theme--header', },
    { field: 'rollTotalPrice', headerName: 'Roll Total Price', width: 150, headerClassName: 'super-app-theme--header' },
    { field: 'rollBasePrice', headerName: 'Roll Base Price', width: 150, headerClassName: 'super-app-theme--header' },
    {
        field: 'rollMarkup', headerName: 'Roll Markup', width: 150, valueGetter: (params) =>
            `${params.row.rollMarkup}%`, headerClassName: 'super-app-theme--header'
    },
    {
        field: 'buffPrice', headerName: 'BUFF163 Price', width: 200, valueGetter: (params) =>
            `${params.row.buffPrice.toFixed(2)}`, headerClassName: 'super-app-theme--header'
    },
    {
        field: 'isUnderpriced', headerName: 'Underpriced', width: 150, valueGetter: (params) =>
            `${params.row.isUnderpriced ? '✔️' : '❌'}`, headerClassName: 'super-app-theme--header'
    },
    {
        field: 'underpricedPerc', headerName: 'Difference Percentage', width: 200, valueGetter: (params) =>
            `${params.row.underpricedPerc.toFixed(3)}`, headerClassName: 'super-app-theme--header'
    },
];

const Withdraw = () => {

    const [tableData, setTableData] = useState([])

    const [pageSize, setPageSize] = React.useState(10);

    useEffect(() => {
        fetch("https://csgoroll-server.herokuapp.com/api/roll/items")
            .then((data) => data.json())
            .then((data) => setTableData(data))
    }, [])

    return (
        <div style={{ height: 700, width: '90%', margin: '0 auto' }}>
            <DataGrid
                getRowId={(row) => row.id}
                rows={tableData}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[10, 20, 50]}
                pagination
                disableSelectionOnClick
                sx={{
                    mt: '70px',
                    '& .super-app-theme--header': {
                        fontSize: '18px'
                    },
                    border: 0
                }}
                components={{ Toolbar: GridToolbar }}
                componentsProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    },
                }}
            />
        </div>
    );
}

export default Withdraw;