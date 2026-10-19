// Cross-platform script to seed the test database and start the Flask server
const { execSync, spawn } = require('child_process');
const path = require('path');

const serverDir = path.resolve(__dirname, '..', 'server');
const testDbPath = path.join(serverDir, 'e2e_test_dogshelter.db');
const python = process.env.PYTHON || (process.platform === 'win32' ? 'py' : 'python3');

// Seed the test database
execSync(`${python} utils/seed_test_database.py`, {
  cwd: serverDir,
  stdio: 'inherit',
});

// Start Flask with the test database
const server = spawn(python, ['app.py'], {
  cwd: serverDir,
  env: { ...process.env, DATABASE_PATH: testDbPath },
  stdio: 'inherit',
});

server.on('close', (code) => process.exit(code ?? 1));
