const { pool } = require('./server.js');

async function seedUsers() {
  try {
    await pool.query(`
      INSERT INTO users (email, name) VALUES 
      ('user1@bits.edu', 'Alex Kumar'),
      ('user2@bits.edu', 'Jordan Patel'),
      ('user3@bits.edu', 'Casey Singh')
      ON CONFLICT DO NOTHING;
    `);
    console.log('✅ Users seeded!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
}

seedUsers();
