#!/usr/bin/env node

import { spawn } from 'node:child_process';
import path from 'node:path';

const env = { ...process.env };

if (process.platform === 'win32') {
  const windowsPaths = [
    'C:\\Windows\\System32',
    'C:\\Windows',
    'C:\\Windows\\System32\\WindowsPowerShell\\v1.0',
  ];

  env.PATH = [...windowsPaths, env.PATH ?? ''].join(path.delimiter);
}

const args = [
  'concurrently',
  '-c',
  '#93c5fd,#c4b5fd,#fdba74',
  'php artisan serve',
  'php artisan queue:listen --tries=1',
  'npm run dev',
  '--names=server,queue,vite',
];

const child = spawn('npx', args, {
  stdio: 'inherit',
  env,
  shell: process.platform === 'win32',
});

child.on('exit', (code) => {
  process.exit(code ?? 1);
});

child.on('error', (error) => {
  console.error(error);
  process.exit(1);
});
