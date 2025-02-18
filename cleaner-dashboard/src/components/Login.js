import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ handleLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validateInput = () => {
        if (username.trim() === "" || password.trim() === "") {
            setError("Username and password cannot be empty.");
            return false;
        }
        return true;
    };

    const submit = async (event) => {
        event.preventDefault();
        if (!validateInput()) return;

        try {
            const response = await axios.post("http://localhost:5000/api/login", {
                username: username,
                password: password
            });

            if (response.data.status === "success") {
                console.log("Login successful");

                // Store login details in localStorage
                localStorage.setItem("isLogin", "true");
                localStorage.setItem("role", response.data.user.role);
                localStorage.setItem("user_id", response.data.user.id);

                handleLogin(response.data.user.role);
                navigate("/");
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Failed to connect to the server.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.loginBox}>
                <h1 style={styles.title}>Login</h1>
                {error && <p style={styles.errorMessage}>{error}</p>}
                <form onSubmit={submit} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Login</button>
                </form>
            </div>
        </div>
    );
}

// Inline styles
const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #005f73, #0a9396)",
        fontFamily: "Arial, sans-serif",
    },
    loginBox: {
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        width: "350px",
    },
    title: {
        color: "#2E6F57",
        marginBottom: "20px",
        fontSize: "24px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        width: "100%",
        padding: "12px",
        margin: "8px 0",
        border: "1px solid #ccc",
        borderRadius: "6px",
        fontSize: "16px",
        transition: "0.3s",
        outline: "none",
    },
    button: {
        width: "100%",
        padding: "12px",
        backgroundColor: "#00AEEF",
        border: "none",
        borderRadius: "6px",
        fontSize: "16px",
        color: "white",
        cursor: "pointer",
        transition: "0.3s",
        marginTop: "10px",
    },
    errorMessage: {
        color: "red",
        fontSize: "14px",
        marginBottom: "10px",
    },
};

// Hover effect for button (using inline JS)
styles.button["&:hover"] = {
    backgroundColor: "#2E6F57",
};

export default Login;
