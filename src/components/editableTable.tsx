'use client';
import React, { useState, useEffect } from "react";
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
  Select,
  MenuItem,
} from "@mui/material";


const EditableTable = ({ columns, initialData = [], onSave}) => {
  // State for table data
  const [data, setData] = useState(initialData || {});
  
  // Fetch data from JSON file if initialData is empty
  useEffect(() => {
    if (initialData.length === 0) {
      const fetchData = async () => {
        try {
          const response = await fetch("/dummy_food_data.json");
          const jsonData = await response.json();
          setData(jsonData);
        } catch (error) {
          console.error("Error loading initial data:", error);
        }
      };
      fetchData();
    }
  }, [initialData]);

  // State for editing
  const [editIdx, setEditIdx] = useState(null);

  // Handle input changes
  const handleInputChange = (e, rowIdx, field) => {
    const updatedData = [...data];
    updatedData[rowIdx][field] = e.target.value;
    setData(updatedData);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        style={{
          width: "1200px",
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
              <TableRow key={rowIdx} style={{ height: 90, width: "20%" }}>
                {columns.map((column, colIdx) => (                <TableCell key={colIdx}>
                    {editIdx === rowIdx ? (
                      column.type === "select" && column.options ? (
                        <Select
                          value={row[column.field] || ""}
                          onChange={(e) => handleInputChange(e, rowIdx, column.field)}
                          fullWidth
                        >
                          {column.options.map((option, optionIdx) => (
                            <MenuItem key={optionIdx} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      ) : (
                        <TextField
                          value={row[column.field] || ""}
                          type={column.type || "text"}
                          onChange={(e) => handleInputChange(e, rowIdx, column.field)}
                          fullWidth
                        />
                      )
                    ) : (
                      row[column.field]?.toString() || ""
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => setEditIdx(rowIdx === editIdx ? null : rowIdx)}
                  >
                    {editIdx === rowIdx ? "Save" : "Edit"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        size="large"
        onClick={() => onSave(data)}
        style={{ marginTop: "20px" }}
      >
        Save The Results !!!
      </Button>
    </>
  );
};

export default EditableTable;
