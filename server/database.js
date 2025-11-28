import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(path.join(__dirname, 'appointments.db'));

// Create appointments table
db.exec(`
  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    special_request TEXT,
    status TEXT DEFAULT 'Pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Create settings table
db.exec(`
  CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Create services table
db.exec(`
  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Insert default settings if not exists
const defaultSettings = [
  { key: 'clinic_name', value: 'Dental Clinic' },
  { key: 'clinic_phone', value: '+91 98765 43210' },
  { key: 'clinic_email', value: 'info@dentalclinic.com' },
  { key: 'clinic_address', value: '123 Dental Street, Medical District, Mumbai - 400001' },
  { key: 'opening_hours_weekday', value: '9:00 AM - 8:00 PM' },
  { key: 'opening_hours_saturday', value: '9:00 AM - 6:00 PM' },
  { key: 'opening_hours_sunday', value: '10:00 AM - 4:00 PM' }
];

const insertSetting = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
defaultSettings.forEach(setting => {
  insertSetting.run(setting.key, setting.value);
});

// Insert default services if not exists
const defaultServices = [
  { name: 'Root Canal', description: 'Save your natural tooth with our painless root canal treatment.' },
  { name: 'Dental Implants', description: 'Permanent solution for missing teeth with natural look and feel.' },
  { name: 'Cosmetic Dentistry', description: 'Enhance your smile with veneers, bonding, and more.' },
  { name: 'Teeth Whitening', description: 'Brighten your smile with our safe and effective whitening.' },
  { name: 'Orthodontics', description: 'Straighten your teeth with braces or clear aligners.' },
  { name: 'General Checkup', description: 'Comprehensive dental examination and cleaning.' },
  { name: 'Emergency Care', description: '24/7 emergency dental services.' }
];

const insertService = db.prepare('INSERT OR IGNORE INTO services (name, description) VALUES (?, ?)');
defaultServices.forEach(service => {
  insertService.run(service.name, service.description);
});

// ===== APPOINTMENTS =====

export const getAllAppointments = () => {
  const stmt = db.prepare('SELECT * FROM appointments ORDER BY created_at DESC');
  return stmt.all();
};

export const getAppointmentById = (id) => {
  const stmt = db.prepare('SELECT * FROM appointments WHERE id = ?');
  return stmt.get(id);
};

export const createAppointment = (data) => {
  const stmt = db.prepare(`
    INSERT INTO appointments (name, email, phone, service, date, time, special_request)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    data.name,
    data.email,
    data.phone,
    data.service,
    data.date,
    data.time,
    data.special_request || ''
  );
  return result.lastInsertRowid;
};

export const updateAppointment = (id, data) => {
  const stmt = db.prepare(`
    UPDATE appointments 
    SET name = ?, email = ?, phone = ?, service = ?, date = ?, time = ?, special_request = ?
    WHERE id = ?
  `);
  return stmt.run(data.name, data.email, data.phone, data.service, data.date, data.time, data.special_request || '', id);
};

export const updateAppointmentStatus = (id, status) => {
  const stmt = db.prepare('UPDATE appointments SET status = ? WHERE id = ?');
  return stmt.run(status, id);
};

export const deleteAppointment = (id) => {
  const stmt = db.prepare('DELETE FROM appointments WHERE id = ?');
  return stmt.run(id);
};

// ===== SETTINGS =====

export const getAllSettings = () => {
  const stmt = db.prepare('SELECT * FROM settings');
  const rows = stmt.all();
  return rows.reduce((acc, row) => {
    acc[row.key] = row.value;
    return acc;
  }, {});
};

export const getSetting = (key) => {
  const stmt = db.prepare('SELECT value FROM settings WHERE key = ?');
  const row = stmt.get(key);
  return row ? row.value : null;
};

export const updateSetting = (key, value) => {
  const stmt = db.prepare(`
    INSERT INTO settings (key, value) VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET value = ?, updated_at = CURRENT_TIMESTAMP
  `);
  return stmt.run(key, value, value);
};

export const updateMultipleSettings = (settings) => {
  const stmt = db.prepare(`
    INSERT INTO settings (key, value) VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET value = ?, updated_at = CURRENT_TIMESTAMP
  `);

  const transaction = db.transaction((settingsArray) => {
    for (const [key, value] of Object.entries(settingsArray)) {
      stmt.run(key, value, value);
    }
  });

  transaction(settings);
};

// ===== SERVICES =====

export const getAllServices = () => {
  const stmt = db.prepare('SELECT * FROM services ORDER BY name');
  return stmt.all();
};

export const getActiveServices = () => {
  const stmt = db.prepare('SELECT * FROM services WHERE is_active = 1 ORDER BY name');
  return stmt.all();
};

export const getServiceById = (id) => {
  const stmt = db.prepare('SELECT * FROM services WHERE id = ?');
  return stmt.get(id);
};

export const createService = (data) => {
  const stmt = db.prepare(`
    INSERT INTO services (name, description, is_active)
    VALUES (?, ?, ?)
  `);
  const result = stmt.run(data.name, data.description || '', data.is_active !== undefined ? data.is_active : 1);
  return result.lastInsertRowid;
};

export const updateService = (id, data) => {
  const stmt = db.prepare(`
    UPDATE services 
    SET name = ?, description = ?, is_active = ?
    WHERE id = ?
  `);
  return stmt.run(data.name, data.description || '', data.is_active !== undefined ? data.is_active : 1, id);
};

export const deleteService = (id) => {
  const stmt = db.prepare('DELETE FROM services WHERE id = ?');
  return stmt.run(id);
};
