import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUser, deleteUser } from '../redux/userSlice';
import DataTable from 'react-data-table-component';
import { Button, Container, Box, Typography, Grid2 } from '@mui/material';
import { Link } from 'react-router-dom';

const UserGrid = () => {
    const dispatch = useDispatch();
    const { users, loading } = useSelector((state) => state.users);

    const [editingRowId, setEditingRowId] = useState(null); 
    const [editedRowData, setEditedRowData] = useState({}); 

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    
    const handleEdit = (user) => {
        setEditingRowId(user.id); 
        setEditedRowData({ ...user }); 
    };

    
    const handleInputChange = (e) => {
        setEditedRowData({
            ...editedRowData,
            [e.target.name]: e.target.value,
        });
    };

    
    const handleSave = (userId) => {
        dispatch(updateUser(editedRowData)); 
        setEditingRowId(null); 
    };

    
    const handleCancel = () => {
        setEditingRowId(null); 
    };

   
    const handleDelete = (userId) => {
        dispatch(deleteUser(userId));
    };

   
    const columns = [
        {
            name: 'Sr. No.',
            selector: (row, index) => index + 1, 
            sortable: true,
            width: '100px'
        },
        {
            name: 'Name',
            selector: (row) => row.name,
            cell: (row) => (
                editingRowId === row.id ? (
                    <input
                        type="text"
                        name="name"
                        value={editedRowData.name}
                        onChange={handleInputChange}
                        style={{ padding: '5px', width: '100%' }}
                    />
                ) : (
                    row.name
                )
            ),
            sortable: true
        },
        {
            name: 'Email',
            selector: (row) => row.email,
            cell: (row) => (
                editingRowId === row.id ? (
                    <input
                        type="email"
                        name="email"
                        value={editedRowData.email}
                        onChange={handleInputChange}
                        style={{ padding: '5px', width: '100%' }}
                    />
                ) : (
                    row.email
                )
            ),
            sortable: true
        },
        {
            name: 'Actions',
            cell: (row) => (
                <Grid2 container spacing={2} justifyContent="flex-start" alignItems="center">
                    {editingRowId === row.id ? (
                        <>
                            <Grid2 item xs={12} sm={6}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => handleSave(row.id)}
                                    sx={{ marginBottom: 1 }}
                                >
                                    Save
                                </Button>
                            </Grid2>
                            <Grid2 item xs={12} sm={6}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    onClick={handleCancel}
                                    sx={{ marginBottom: 1 }} style={{padding:"6px"}}
                                >
                                    Cancel
                                </Button>
                            </Grid2>
                        </>
                    ) : (
                        <>
                            <Grid2 item xs={12} sm={6}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' } }}
                                    onClick={() => handleEdit(row)}
                                >
                                    Edit
                                </Button>
                            </Grid2>
                            <Grid2 item xs={12} sm={6}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    fullWidth
                                    sx={{ '&:hover': { backgroundColor: 'error.dark' } }}
                                    onClick={() => handleDelete(row.id)} style={{padding:"6px"}}
                                >
                                    Delete
                                </Button>
                            </Grid2>
                        </>
                    )}
                </Grid2>
            ),
        },
    ];

    return (
        <Container sx={{ p: 3 }}>
            <Typography
                variant="h4"
                sx={{
                    mb: 2,
                    fontWeight: 'bold',
                    fontSize: { xs: '1.8rem', sm: '2rem' },  // Responsive font size
                    textAlign: 'center',
                    fontFamily: 'Roboto, sans-serif'
                }}
            >
                User Records
            </Typography>

            <Typography
                variant="h6"
                sx={{
                    mb: 3,
                    fontWeight: 'normal',
                    textAlign: 'center',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: { xs: '1rem', sm: '1.2rem' },
                    color: 'text.secondary'
                }}
            >
                Manage and edit your user records here
            </Typography>

            <Link to="/add-user">
                <Button
                    variant="contained"
                    sx={{
                        mb: 2,
                        backgroundColor: 'primary.main',
                        color: 'white',
                        '&:hover': { backgroundColor: 'primary.dark' },
                        fontFamily: 'Roboto, sans-serif',
                        width: { xs: '100%', sm: 'auto' }  // Responsive width
                    }}
                >
                    Add New User
                </Button>
            </Link>

            <Box sx={{ mt: 2, border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', boxShadow: 2 }}>
                <DataTable
                    title="User Records"
                    columns={columns}
                    data={users}
                    progressPending={loading}
                    pagination
                    responsive
                    customStyles={{
                        headCells: {
                            style: {
                                backgroundColor: '#f4f4f4',
                                fontWeight: 'bold',
                                fontFamily: 'Arial, sans-serif',
                                fontSize: '1rem',
                            },
                        },
                        cells: {
                            style: {
                                padding: '12px',
                                borderBottom: '1px solid #ddd',
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: '0.95rem',
                            },
                        },
                    }}
                />
            </Box>
        </Container>
    );
};

export default UserGrid;
