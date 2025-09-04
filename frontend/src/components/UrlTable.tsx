// src/components/UrlTable.tsx
import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Link,
} from "@mui/material";

export interface ShortUrl {
    id: number;
    original: string;
    short: string;
}

interface UrlTableProps {
    urls: ShortUrl[];
}

export default function UrlTable({ urls }: UrlTableProps) {
    return (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><b>Original URL</b></TableCell>
                        <TableCell><b>Shortened URL</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {urls.map((url) => (
                        <TableRow key={url.id}>
                            <TableCell>
                                <Link href={url.original} target="_blank" rel="noopener">
                                    {url.original}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <Link href={url.short} target="_blank" rel="noopener">
                                    {url.short}
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export { };
