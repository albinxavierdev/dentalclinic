import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
app.use(cors({
  origin: ["https://dentalclinic-1-ngh0.onrender.com", "https://dentalclinic-607o.onrender.com"],
  credentials: true
}));
app.use(express.json());

// ===== APPOINTMENTS API =====

// Get all appointments
app.get('/api/appointments', async (req, res) => {
    try {
        const appointments = await getAllAppointments();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get appointment by ID
app.get('/api/appointments/:id', async (req, res) => {
    try {
        const appointment = await getAppointmentById(req.params.id);
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
app.post('/api/appointments', async (req, res) => {
    try {
        const { name, email, phone, service, date, time, special_request } = req.body;

        // Validation
        if (!name || !email || !phone || !service || !date || !time) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const id = await createAppointment(req.body);
        const appointment = await getAppointmentById(id);
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update appointment
app.put('/api/appointments/:id', async (req, res) => {
    try {
        const { name, email, phone, service, date, time, special_request } = req.body;

        if (!name || !email || !phone || !service || !date || !time) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        await updateAppointment(req.params.id, req.body);
        const appointment = await getAppointmentById(req.params.id);
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update appointment status
app.patch('/api/appointments/:id/status', async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }

        const appointment = await updateAppointmentStatus(req.params.id, status);
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete appointment
app.delete('/api/appointments/:id', async (req, res) => {
    try {
        await deleteAppointment(req.params.id);
        res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ===== SETTINGS API =====

// Get all settings
app.get('/api/settings', async (req, res) => {
    try {
        const settings = await getAllSettings();
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single setting
app.get('/api/settings/:key', async (req, res) => {
    try {
        const value = await getSetting(req.params.key);
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
app.put('/api/settings/:key', async (req, res) => {
    try {
        const { value } = req.body;

        if (value === undefined) {
            return res.status(400).json({ error: 'Value is required' });
        }

        const setting = await updateSetting(req.params.key, value);
        res.json(setting);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update multiple settings
app.post('/api/settings', async (req, res) => {
    try {
        await updateMultipleSettings(req.body);
        const settings = await getAllSettings();
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ===== SERVICES API =====

// Get all services
app.get('/api/services', async (req, res) => {
    try {
        const services = await getAllServices();
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get active services only
app.get('/api/services/active', async (req, res) => {
    try {
        const services = await getActiveServices();
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get service by ID
app.get('/api/services/:id', async (req, res) => {
    try {
        const service = await getServiceById(req.params.id);
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
app.post('/api/services', async (req, res) => {
    try {
        const { name, description, is_active } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Service name is required' });
        }

        const id = await createService(req.body);
        const service = await getServiceById(id);
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update service
app.put('/api/services/:id', async (req, res) => {
    try {
        const { name, description, is_active } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Service name is required' });
        }

        await updateService(req.params.id, req.body);
        const service = await getServiceById(req.params.id);
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete service
app.delete('/api/services/:id', async (req, res) => {
    try {
        await deleteService(req.params.id);
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

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../dist')));

// Handle client-side routing - MUST be the last route
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
