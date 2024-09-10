'use client'

import React, {useState} from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Divider,
    Link as MuiLink
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import Link from 'next/link';
import {useAuth} from "@/contexts/AuthContext";
import { useRouter } from 'next/navigation';

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, loading, signUp, googleSignUp } = useAuth();
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await signUp(email, password);
            router.push('/');
        } catch (error) {
            console.error('Error signing in', error)
        }
    }

    const handleGoogleSignUp = async () => {
        try {
            await googleSignUp();
            router.push('/');
        } catch (error) {
            console.error('Error signing Up', error)
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.100'
            }}
        >
            <Container maxWidth="sm">
                <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h4" component="h1" align="center" color="text.primary" gutterBottom>
                        Welcome
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary" paragraph>
                        Please sign up to your account
                    </Typography>

                    <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 2 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                    </Box>

                    <Divider sx={{ my: 3,'&::before, &::after': { borderColor: 'gray' } }}><Typography color="text.secondary">Or continue with</Typography></Divider>

                    <Button
                        type="button"
                        onClick={handleGoogleSignUp}
                        fullWidth
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        sx={{ mb: 2 }}
                    >
                        Sign Up with Google
                    </Button>

                    <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 2 }}>
                        Already have an account?{' '}
                        <Link href="/login" passHref>
                            <MuiLink component="span" variant="body2">
                                Sign In
                            </MuiLink>
                        </Link>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
