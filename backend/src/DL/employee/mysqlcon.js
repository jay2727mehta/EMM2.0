const sql = require('mssql');

const dbConfig = {
  user: 'energysystem', // Replace with your database username
  password: 'Client$100', // Replace with your database password
  server: '10.2.0.63', // Replace with your database server (try server name if possible)
  database: 'AssociateCount', // Replace with your database name
  port: 1433, // Default port for SQL Server
  options: {
    encrypt: false, // Use this if you're on Windows Azure
    trustServerCertificate: true, // Change to true for local dev / self-signed certs
    // Enable these options if you continue facing issues
    // cryptoCredentialsDetails: {
    //   minVersion: 'TLSv1.2' // Ensure you're using at least TLS 1.2
    // },
  },
};

async function connectToDatabase() {
  try {
    const pool=await sql.connect(dbConfig);
    return pool
  } catch (err) {
    console.error('Database connection failed: ', err.message);
    console.error('Please check the following:');
    console.error('- Ensure SQL Server is running and accessible');
    console.error('- Verify network connectivity and firewall settings');
    console.error('- Check SQL Server configuration for remote connections');
    console.error('- Ensure correct username, password, and database name');
    console.error('- Consider using the server name instead of IP if possible');
    console.error('- Review SSL/TLS settings if using encryption');
  }
}

// connectToDatabase();

module.exports = {
  sql,
  connectToDatabase,
};