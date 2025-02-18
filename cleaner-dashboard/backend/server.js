const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

// Middleware to handle CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Potato1234-',
    database: 'keyswcodb',
});

// Verify database connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to database with ID: ' + db.threadId);
});

// ---------------- LOGIN LOGIC ----------------
const bcrypt = require("bcrypt");

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ status: 'error', message: 'Username and password are required' });
    }

    const query = 'SELECT id, username, email, role, password_hash FROM users WHERE username = ?';
    db.query(query, [username], async (error, results) => {
        if (error) {
            console.error('Login query error:', error.message);
            return res.status(500).json({ status: 'error', message: 'Database error', details: error.message });
        }

        if (results.length === 0) {
            return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
        }

        const user = results[0];

        // Check if password is hashed or plain text
        const isHashed = user.password_hash.startsWith("$2b$");
        
        let passwordMatch = false;
        if (isHashed) {
            passwordMatch = await bcrypt.compare(password, user.password_hash);
        } else {
            passwordMatch = password === user.password_hash; // Direct comparison for old plain text passwords
        }

        if (passwordMatch) {
            res.json({
                status: 'success',
                message: 'Login successful',
                user: { id: user.id, username: user.username, email: user.email, role: user.role },
            });

            // Optional: If the password was plain text, upgrade it to hashed
            if (!isHashed) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const updateQuery = 'UPDATE users SET password_hash = ? WHERE id = ?';
                db.query(updateQuery, [hashedPassword, user.id], (err) => {
                    if (err) {
                        console.error('Error upgrading password to hashed:', err.message);
                    } else {
                        console.log(`Upgraded password to hashed for user ${user.username}`);
                    }
                });
            }
        } else {
            res.status(401).json({ status: 'error', message: 'Invalid credentials' });
        }
    });
});

app.post("/api/signup", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ status: "error", message: "All fields are required." });
    }

    const checkQuery = "SELECT * FROM users WHERE username = ? OR email = ?";
    db.query(checkQuery, [username, email], async (error, results) => {
        if (error) {
            console.error("Database error:", error.message);
            return res.status(500).json({ status: "error", message: "Database error." });
        }

        if (results.length > 0) {
            return res.status(400).json({ status: "error", message: "Username or email already exists." });
        }

        // Hash new user's password
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertQuery = "INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, 'employer')";
        db.query(insertQuery, [username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error("Error inserting user:", err.message);
                return res.status(500).json({ status: "error", message: "Could not create user." });
            }

            res.status(201).json({ status: "success", message: "Account created successfully!" });
        });
    });
});



// ---------------- CLEANERS MANAGEMENT ----------------
app.get('/api/cleaners', (req, res) => {
    const query = `
        SELECT c.user_id, c.rating, c.total_jobs, c.earnings, u.username, u.email
        FROM cleaners c
        JOIN users u ON c.user_id = u.id
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/api/cleaners', (req, res) => {
    const { username, email, role, rating, total_jobs, earnings } = req.body;
    const randomPass = Math.floor(10000000 + Math.random() * 90000000);

    const userQuery = 'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)';
    db.query(userQuery, [username, email, randomPass, role], (err, userResult) => {
        if (err) return res.status(500).json({ error: err.message });

        const userId = userResult.insertId;
        const cleanerQuery = 'INSERT INTO cleaners (user_id, rating, total_jobs, earnings) VALUES (?, ?, ?, ?)';
        db.query(cleanerQuery, [userId, rating, total_jobs, earnings], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Cleaner added successfully', userId });
        });
    });
});

// ---------------- EMPLOYERS MANAGEMENT ----------------
app.get('/api/employers', (req, res) => {
    const query = `
        SELECT e.user_id, e.company_name, e.phone_number, e.address, u.username, u.email
        FROM employers e
        JOIN users u ON e.user_id = u.id
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/api/employers', (req, res) => {
    const { username, email, role, company_name, phone_number, address } = req.body;
    const randomPass = Math.floor(10000000 + Math.random() * 90000000);

    const userQuery = 'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)';
    db.query(userQuery, [username, email, randomPass, role], (err, userResult) => {
        if (err) return res.status(500).json({ error: err.message });

        const userId = userResult.insertId;
        const employerQuery = 'INSERT INTO employers (user_id, company_name, phone_number, address) VALUES (?, ?, ?, ?)';
        db.query(employerQuery, [userId, company_name, phone_number, address], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Employer added successfully', userId });
        });
    });
});

// ---------------- TICKETS MANAGEMENT ----------------
app.get('/api/tickets', (req, res) => {
    const query = `
        SELECT t.id AS ticket_id, t.job_id, t.issue, t.status, u.username, u.role, u.email 
        FROM tickets t
        JOIN users u ON t.user_id = u.id
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/api/tickets', (req, res) => {
    const { user_id, job_id, issue, status } = req.body;

    const query = 'INSERT INTO tickets (user_id, job_id, issue, status) VALUES (?, ?, ?, ?)';
    db.query(query, [user_id, job_id, issue, status], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Ticket submitted successfully' });
    });
});

app.put('/api/tickets/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const query = 'UPDATE tickets SET status = ? WHERE id = ?';
    db.query(query, [status, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Ticket updated successfully' });
    });
});

app.delete('/api/tickets/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM tickets WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Ticket deleted successfully' });
    });
});

// ---------------- SERVICE BOOKING MANAGEMENT ----------------
app.get('/api/bookings', (req, res) => {
    const { user_id } = req.query; // Get user_id from query parameters

    if (!user_id) {
        return res.status(400).json({ error: "Missing user_id parameter." });
    }

    const query = `
        SELECT 
            COUNT(*) AS total_bookings,
            SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending_bookings,
            SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_bookings
        FROM bookings
        WHERE user_id = ?
    `;

    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error("❌ Error fetching booking counts:", err.message);
            return res.status(500).json({ error: "Database error", details: err.message });
        }

        res.json({
            total_bookings: results[0].total_bookings || 0,
            pending_bookings: results[0].pending_bookings || 0,
            completed_bookings: results[0].completed_bookings || 0
        });
    });
});

app.get('/api/profile', (req, res) => {
    const { user_id } = req.query; // Get user_id from query parameters

    if (!user_id) {
        return res.status(400).json({ error: "Missing user_id parameter." });
    }

    const query = `
        SELECT 
            company_name AS name,
            phone_number AS contact,
            address AS address
        FROM employers
        WHERE user_id = ?
    `;

    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error("❌ Error fetching profile info:", err.message);
            return res.status(500).json({ error: "Database error", details: err.message });
        }

        res.json({
            name: results[0].name|| "",
            contact: results[0].contact || "",
            address: results[0].address || ""
        });
    });
});

app.get("/api/bookings/list", (req, res) => {
    const { user_id, status } = req.query;

    let query = `SELECT * FROM bookings WHERE user_id = ?`;
    const queryParams = [user_id];

    if (status !== "all") {
        query += ` AND status = ?`;
        queryParams.push(status);
    }

    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error("Error fetching bookings:", err.message);
            return res.status(500).json({ error: err.message });
        }
        console.log(results);
        res.json(results);
    });
});


app.post("/api/bookings", (req, res) => {
    const { user_id, service_type, num_rooms, square_footage, date, time, address, special_instructions } = req.body;

    if (!user_id || !service_type || !date || !time || !address) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    const insertQuery = `
        INSERT INTO bookings (user_id, service_type, num_rooms, square_footage, date, time, address, special_instructions)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(insertQuery, [user_id, service_type, num_rooms, square_footage, date, time, address, special_instructions], (err, result) => {
        if (err) {
            console.error("❌ Error inserting booking:", err.message);
            return res.status(500).json({ error: "Database error", details: err.message });
        }
        res.json({ message: "✅ Booking created successfully!", bookingId: result.insertId });
    });
});

// ---------------- SERVER LISTENING ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
