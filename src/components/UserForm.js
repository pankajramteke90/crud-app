import React from 'react';
import { useDispatch } from 'react-redux';
import { addUser, addUserLocally } from '../redux/userSlice';
import { useForm } from 'react-hook-form';
import { Button, TextField, Box, Container, Typography } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const schema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
});

const UserForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        const uniqueUser = { ...data, id: uuidv4() };

        console.log('Submitting new user with ID:', uniqueUser);
        dispatch(addUserLocally(uniqueUser));
        dispatch(addUser(uniqueUser));
        navigate('/');
        reset();
    };

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', px: 2 }}>
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '500px',
                    padding: '16px',
                    borderRadius: '8px',
                    boxShadow: 3,
                    backgroundColor: 'background.paper',
                    textAlign: 'center',
                }}
            >
                <Typography 
                    variant="h4" 
                    sx={{ mb: 3, fontWeight: 'bold', fontSize: '1.8rem', fontFamily: 'Roboto, sans-serif' }}
                >
                    Add New User
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        {...register('name')}
                        label="Name"
                        variant="outlined"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        {...register('email')}
                        label="Email"
                        variant="outlined"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth
                        sx={{
                            backgroundColor: 'primary.main',
                            '&:hover': { backgroundColor: 'primary.dark' },
                            padding: '10px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            marginTop: 2
                        }}
                    >
                        Add User
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default UserForm;

