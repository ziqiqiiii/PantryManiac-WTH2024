'use client';
import React, { useState } from "react";
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

const EditableTable = () => {
  // Sample data
  const initialData = [
    { id: 1, name: "Apple", quantity: 10, price: 1.5 },
    { id: 2, name: "Banana", quantity: 5, price: 0.9 },
    { id: 3, name: "Cherry", quantity: 20, price: 2.0 },
  ];

  // State for table data
  const [data, setData] = useState(initialData);

  // State for editing
  const [editIdx, setEditIdx] = useState(null);

  // Handle input changes
  const handleInputChange = (e: any, rowIdx: number, field: number) => {
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
            <TableCell style={{ height: 70,  width: "10%"}}>ID</TableCell>
            <TableCell style={{ height: 70,  width: "30%"}}>Name</TableCell>
            <TableCell style={{ height: 70,  width: "20%"}}>Quantity</TableCell>
            <TableCell style={{ height: 70,  width: "20%"}}>Price</TableCell>
            <TableCell style={{ height: 70,  width: "20%"}}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIdx) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>
                {editIdx === rowIdx ? (
                  <TextField
                    value={row.name}
                    onChange={(e) => handleInputChange(e, rowIdx, "name")}
                    fullWidth
                  />
                ) : (
                  row.name
                )}
              </TableCell>
              <TableCell>
                {editIdx === rowIdx ? (
                  <TextField
                    value={row.quantity}
                    type="number"
                    onChange={(e) => handleInputChange(e, rowIdx, "quantity")}
                    fullWidth
                  />
                ) : (
                  row.quantity
                )}
              </TableCell>
              <TableCell>
                {editIdx === rowIdx ? (
                  <TextField
                    value={row.price}
                    type="number"
                    onChange={(e) => handleInputChange(e, rowIdx, "price")}
                    fullWidth
                  />
                ) : (
                  row.price
                )}
              </TableCell>
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
