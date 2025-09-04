import React, { useState } from "react";
import { TextField, Button, Box, Typography, Card, CardContent, Grid, Paper, Fade } from "@mui/material";
import { Link as LinkIcon, AccessTime, Code } from "@mui/icons-material";
import axios from "axios";
import { Log as log } from "logging-middlewares";

import UrlTable, { ShortUrl } from "./UrlTable";

export default function UrlShortener() {
    const [url, setUrl] = useState("");
    const [expiry, setExpiry] = useState<number>(10);
    const [customCode, setCustomCode] = useState("");
    const [shortUrls, setShortUrls] = useState<ShortUrl[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!url.startsWith("http")) {
            log("frontend", "error", "form", "Invalid URL entered");
            alert("Please enter a valid URL (must start with http/https)");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3000/api/shorten", {
                url,
                expiry,
                customCode,
            });

            const data = response.data;
            const newUrl: ShortUrl = {
                id: shortUrls.length + 1,
                original: data.originalUrl,
                short: data.shortUrl
            };
            setShortUrls([...shortUrls, newUrl]);

            log("frontend", "info", "shortener", "Short URL created successfully");
            setUrl("");
            setCustomCode("");
        } catch (err: any) {
            log("frontend", "error", "api", "Failed to shorten URL");
            const errorMessage = err.response?.data?.error || "Error shortening URL";
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            py: 4
        }}>
            <Box sx={{ maxWidth: 800, mx: "auto", px: 2 }}>
                <Fade in={true} timeout={1000}>
                    <Card
                        elevation={10}
                        sx={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 3,
                            mb: 4
                        }}
                    >
                        <CardContent sx={{ p: 4 }}>
                            <Typography
                                variant="h4"
                                gutterBottom
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    mb: 3
                                }}
                            >
                                <LinkIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                URL Shortener
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid size={12}>
                                    <TextField
                                        fullWidth
                                        label="Enter URL to Shorten"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                            }
                                        }}
                                        InputProps={{
                                            startAdornment: <LinkIcon sx={{ mr: 1, color: 'action.active' }} />,
                                        }}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="Expiry (minutes)"
                                        value={expiry}
                                        onChange={(e) => setExpiry(Number(e.target.value))}
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                            }
                                        }}
                                        InputProps={{
                                            startAdornment: <AccessTime sx={{ mr: 1, color: 'action.active' }} />,
                                        }}
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Custom Code (optional)"
                                        value={customCode}
                                        onChange={(e) => setCustomCode(e.target.value)}
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                            }
                                        }}
                                        InputProps={{
                                            startAdornment: <Code sx={{ mr: 1, color: 'action.active' }} />,
                                        }}
                                    />
                                </Grid>

                                <Grid size={12}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        sx={{
                                            py: 1.5,
                                            borderRadius: 2,
                                            fontSize: '1.1rem',
                                            fontWeight: 'bold',
                                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                                            '&:hover': {
                                                background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 6px 10px 2px rgba(33, 203, 243, .3)',
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        {loading ? 'Shortening...' : 'Shorten URL'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Fade>

                {shortUrls.length > 0 && (
                    <Fade in={true} timeout={1000}>
                        <Paper
                            elevation={5}
                            sx={{
                                borderRadius: 3,
                                overflow: 'hidden',
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            <UrlTable urls={shortUrls} />
                        </Paper>
                    </Fade>
                )}
            </Box>
        </Box>
    );
}
