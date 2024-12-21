'use client';

import React, { useState, ChangeEvent } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";

interface Column {
  label: string;
  field: string;
  width?: string;
  type?: string;
}

interface EditableTableProps {
  initialData: Record<string, any>[];
  columns: Column[];
}

const EditableTable: React.FC<EditableTableProps> = ({ initialData, columns }) => {
  // State for table data
  const [data, setData] = useState(initialData);

  // State for editing
  const [editIdx, setEditIdx] = useState<number | null>(null);

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, rowIdx: number, field: string) => {
    const updatedData = [...data];
    updatedData[rowIdx][field] = e.target.value;
    setData(updatedData);
  };

  // Toggle editing mode
  const toggleEditMode = (rowIdx: number) => {
    setEditIdx(rowIdx === editIdx ? null : rowIdx);
  };

  return (
    <TableContainer
      component={Paper}
      style={{
        width: "800px",
        height: "400px",
        overflow: "auto", // Enable scroll if content overflows
      }}
    >
      <Table stickyHeader style={{ tableLayout: "fixed" }}>
        <TableHead>
          <TableRow>
            {columns.map((column, idx) => (
              <TableCell key={idx} style={{ height: 70, width: column.width || "auto" }}>
                {column.label}
              </TableCell>
            ))}
            <TableCell style={{ height: 70, width: "20%" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIdx) => (
            <TableRow key={rowIdx}>
              {columns.map((column, colIdx) => (
                <TableCell
                  key={colIdx}
                  style={{ height: 95, width: "20%" }}
                >
                  {editIdx === rowIdx ? (
                    <TextField
                      value={row[column.field]}
                      type={column.type || "text"}
                      onChange={(e) => handleInputChange(e, rowIdx, column.field)}
                      fullWidth
                    />
                  ) : (
                    row[column.field]
                  )}
                </TableCell>
              ))}
              <TableCell>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => toggleEditMode(rowIdx)}
                >
                  {editIdx === rowIdx ? "Save" : "Edit"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EditableTable;

