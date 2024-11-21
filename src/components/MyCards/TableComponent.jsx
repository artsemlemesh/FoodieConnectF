import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TableComponent = ({ rows, columns }) => {
  return (
    <TableContainer component={Paper} className="rounded-lg shadow-lg">
      <Table>
        <TableHead className="bg-gray-100">
          <TableRow>
            {columns.map((col, index) => (
              <TableCell key={index} className="font-bold">
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;