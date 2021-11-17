import { useState, useEffect, Fragment } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';

export default function DataGrid({
  tableHeader,
  tableData,
  keyHeader,
  selectedRows,
  allowMultipleSelection,
  onSelectedChange,
}) {
  const switchInitialState =
    allowMultipleSelection && selectedRows && selectedRows.length > 1;

  const [isMultipleSelectionOn, setIsMultipleSelectionOn] =
    useState(switchInitialState);
  const [selected, setSelected] = useState(selectedRows || []);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeMultipleSelection = (event) => {
    setIsMultipleSelectionOn(event.target.checked);
    setSelected([]);
  };

  const handleRowClick = (selectedKey) => {
    setSelected((selectedKeys) => {
      const newSelectedKeys = [...selectedKeys];
      if (allowMultipleSelection && isMultipleSelectionOn) {
        const id = newSelectedKeys.indexOf(selectedKey);
        if (id >= 0) newSelectedKeys.splice(id, 1);
        else {
          newSelectedKeys.push(selectedKey);
        }
      } else {
        return [selectedKey];
      }

      return newSelectedKeys;
    });
  };

  useEffect(() => {
    if (typeof onSelectedChange === 'function') onSelectedChange(selected);
  }, [selected, onSelectedChange]);

  return (
    <Fragment>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {tableHeader.map((header) => (
                <TableCell
                  key={header.id}
                  align={header.align}
                  style={{ minWidth: header.minWidth }}
                >
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={data[keyHeader]}
                    onClick={() => handleRowClick(data[keyHeader])}
                    selected={selected.includes(data[keyHeader])}
                  >
                    {tableHeader.map((header) => {
                      const value = header.id.reduce((prev, curr) => {
                        return prev[curr];
                      }, data);
                      return (
                        <TableCell key={header.id} align={header.align}>
                          {header.format && typeof value === 'number'
                            ? header.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {allowMultipleSelection && (
        <Box>
          <FormControlLabel
            control={
              <Switch
                checked={isMultipleSelectionOn}
                onChange={handleChangeMultipleSelection}
              />
            }
            label="Selection Multiple"
          />
        </Box>
      )}
    </Fragment>
  );
}
