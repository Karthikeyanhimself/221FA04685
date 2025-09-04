import axios from "axios";

const BASE_URL = "http://20.244.56.144/evaluation-service/logs";

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrYXJ0aGlrZXlhdGl5eWFndXJhNzNAZ21haWwuY29tIiwiZXhwIjoxNzU2OTY0MzM5LCJpYXQiOjE3NTY5NjM0MzksImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJkZDQ0OTRmYS0xYTBlLTQyYWUtYjhhNC00NTRmYzU1MWMwMzkiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJrYXJ0aGlrZXlhbiByZWRkeSB0aXl5YWd1cmEiLCJzdWIiOiJkNzczYWNlOS0xOTIzLTQwMmMtODMxOC1iYmZmNTYyY2U5MGUifSwiZW1haWwiOiJrYXJ0aGlrZXlhdGl5eWFndXJhNzNAZ21haWwuY29tIiwibmFtZSI6ImthcnRoaWtleWFuIHJlZGR5IHRpeXlhZ3VyYSIsInJvbGxObyI6IjIyMWZhMDQ2ODUiLCJhY2Nlc3NDb2RlIjoiWXp1SmVVIiwiY2xpZW50SUQiOiJkNzczYWNlOS0xOTIzLTQwMmMtODMxOC1iYmZmNTYyY2U5MGUiLCJjbGllbnRTZWNyZXQiOiJHdGVVdG5ZYmNtWW5kQ1JnIn0.v7p7rpQUqeVy7aXc1FruMXUHGzb3ri2V8FoskwjVPwI";

export async function Log(
    stack: "backend" | "frontend",
    level: "debug" | "info" | "warn" | "error" | "fatal",
    pkg: string,
    message: string
) {
    try {
        const response = await axios.post(
            `${BASE_URL}/logs`,
            {
                stack,
                level,
                package: pkg,
                message,
            },
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
            }
        );
        return response.data;
    } catch (err) {
        console.error("Logging failed:", err);
    }
}
