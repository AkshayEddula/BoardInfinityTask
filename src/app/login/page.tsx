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

    const [email, setEmail] = useState('sample@gmail.com')
    const [password, setPassword] = useState('sample')
    const { user, loading, signIn, googleSignIn} = useAuth();
    const router = useRouter();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await signIn(email, password);
            router.push('/');
        } catch (error) {
            console.error('Error signing in', error)
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            router.push('/');
        } catch (error) {
            console.error('Error signing in', error)
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
                        Welcome back
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary" paragraph>
                        Please sign in to your account
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary" paragraph>
                        Use <Box component="span" fontWeight="bold" fontStyle="italic">sample@gmail.com</Box> and{' '}
                        <Box component="span" fontWeight="bold" fontStyle="italic">sample</Box> for credentials
                    </Typography>

                    <Box component="form" onSubmit={handleSignIn} noValidate sx={{ mt: 2 }}>
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
                            Sign In
                        </Button>
                    </Box>

                    <Divider sx={{ my: 3,'&::before, &::after': { borderColor: 'gray' } }}><Typography color="text.secondary">Or continue with</Typography></Divider>

                    <Button
                        fullWidth
                        type="button"
                        onClick={handleGoogleSignIn}
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        sx={{ mb: 2 }}
                    >
                        Sign in with Google
                    </Button>

                    <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 2 }}>
                        Don't have an account?{' '}
                        <Link href="/signup" passHref>
                            <MuiLink component="span" variant="body2">
                                Sign up
                            </MuiLink>
                        </Link>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
