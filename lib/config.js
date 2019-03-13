const port = resolve({env: 'PORT', fallback: 3102});

module.exports = {
  port,
  inMemoryDb: resolve({env: 'IN_MEMORY_DB', fallback: false}),
  publicHost: resolve({env: 'PUBLIC_HOST', fallback: `http://localhost:${port}`}),
};

function resolve({env, fallback}) {
  const value = process[env];
  console.info(value !== undefined ?
    `${env}: ${value}` :
    `${env} not set, using ${fallback}`);
  return value !== undefined ? value : fallback;
}
