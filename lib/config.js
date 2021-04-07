const port = resolve({ env: 'PORT', fallback: 3102 });
const inMemoryDb = resolve({ env: 'IN_MEMORY_DB', fallback: false });
const publicHost = resolve({ env: 'PUBLIC_HOST', fallback: `http://localhost:${port}` });

module.exports = { port, inMemoryDb, publicHost };

function resolve({ env, fallback }) {
  const value = process.env[env];
  console.info(value !== undefined ?
    `${env}: ${value}` :
    `${env} not set, using ${fallback}`);
  return value !== undefined ? value : fallback;
}
