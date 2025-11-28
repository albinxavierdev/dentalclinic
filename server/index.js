import express from 'express';
import cors from 'cors';
import {
    getAllAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    updateAppointmentStatus,
    deleteAppointment,
    getAllSettings,
    getSetting,
    updateSetting,
    updateMultipleSettings,
    getAllServices,
    getActiveServices,
    getServiceById,
    createService,
    updateService,
    deleteService
} from './database.js';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// ===== APPOINTMENTS API =====

// Get all appointments
app.get('/api/appointments', (req, res) => {
    try {
        const appointments = getAllAppointments();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get appointment by ID
app.get('/api/appointments/:id', (req, res) => {
    try {
        const appointment = getAppointmentById(req.params.id);
        if (appointment) {
            res.json(appointment);
        } else {
            res.status(404).json({ error: 'Appointment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new appointment
app.post('/api/appointments', (req, res) => {
    try {
        const { name, email, phone, service, date, time, special_request } = req.body;

        // Validation
        if (!name || !email || !phone || !service || !date || !time) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const id = createAppointment(req.body);
        const appointment = getAppointmentById(id);
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update appointment
app.put('/api/appointments/:id', (req, res) => {
    try {
        const { name, email, phone, service, date, time, special_request } = req.body;

        if (!name || !email || !phone || !service || !date || !time) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        updateAppointment(req.params.id, req.body);
        const appointment = getAppointmentById(req.params.id);
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update appointment status
app.patch('/api/appointments/:id/status', (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }

        updateAppointmentStatus(req.params.id, status);
        const appointment = getAppointmentById(req.params.id);
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete appointment
app.delete('/api/appointments/:id', (req, res) => {
    try {
        deleteAppointment(req.params.id);
        res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ===== SETTINGS API =====

// Get all settings
app.get('/api/settings', (req, res) => {
    try {
        const settings = getAllSettings();
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single setting
app.get('/api/settings/:key', (req, res) => {
    try {
        const value = getSetting(req.params.key);
        if (value !== null) {
            res.json({ key: req.params.key, value });
        } else {
            res.status(404).json({ error: 'Setting not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update single setting
app.put('/api/settings/:key', (req, res) => {
    try {
        const { value } = req.body;

        if (value === undefined) {
            return res.status(400).json({ error: 'Value is required' });
        }

        updateSetting(req.params.key, value);
        res.json({ key: req.params.key, value });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update multiple settings
app.post('/api/settings', (req, res) => {
    try {
        updateMultipleSettings(req.body);
        const settings = getAllSettings();
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ===== SERVICES API =====

// Get all services
app.get('/api/services', (req, res) => {
    try {
        const services = getAllServices();
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get active services only
app.get('/api/services/active', (req, res) => {
    try {
        const services = getActiveServices();
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get service by ID
app.get('/api/services/:id', (req, res) => {
    try {
        const service = getServiceById(req.params.id);
        if (service) {
            res.json(service);
        } else {
            res.status(404).json({ error: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new service
app.post('/api/services', (req, res) => {
    try {
        const { name, description, is_active } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Service name is required' });
        }

        const id = createService(req.body);
        const service = getServiceById(id);
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update service
app.put('/api/services/:id', (req, res) => {
    try {
        const { name, description, is_active } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Service name is required' });
        }

        updateService(req.params.id, req.body);
        const service = getServiceById(req.params.id);
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete service
app.delete('/api/services/:id', (req, res) => {
    try {
        deleteService(req.params.id);
        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ===== ADMIN AUTH =====

// Simple admin authentication (for demo purposes)
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;

    // Simple hardcoded credentials (in production, use proper authentication)
    if (username === 'admin' && password === 'admin123') {
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
