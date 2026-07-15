import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// Define the path to the service account key
const serviceAccountPath = path.resolve(__dirname, 'serviceAccountKey.json');

// Ensure the developer has provided the service account key
if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ Error: Missing serviceAccountKey.json');
  console.error('To run the seeder, you must:');
  console.error('1. Go to Firebase Console -> Project Settings -> Service Accounts');
  console.error('2. Generate a new private key.');
  console.error('3. Save it as "serviceAccountKey.json" inside the "scripts/seeder" folder.');
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Define the zones based on our SDD architecture
const zones = [
  { id: 'north_gate', name: 'North Gate', density: 45, status: 'normal', active_campaign: null },
  { id: 'south_gate', name: 'South Gate (Main Exit)', density: 95, status: 'critical', active_campaign: null },
  { id: 'east_concourse', name: 'East Concourse Food Court', density: 60, status: 'warning', active_campaign: null },
  { id: 'west_concourse', name: 'West Concourse VIP', density: 20, status: 'normal', active_campaign: null }
];

async function seedDatabase() {
  console.log('🌱 Starting Aura database seeding...');

  try {
    // 1. Seed Zones
    console.log('Writing Zones...');
    const zoneBatch = db.batch();
    for (const zone of zones) {
      const zoneRef = db.collection('zones').doc(zone.id);
      zoneBatch.set(zoneRef, zone);
    }
    await zoneBatch.commit();
    console.log(`✅ Successfully seeded ${zones.length} zones.`);

    // 2. Seed Mock Users in South Gate (Our critical hotspot for the demo)
    console.log('Writing Simulated Fans...');
    const userBatch = db.batch();
    const MOCK_USER_COUNT = 50;
    
    for (let i = 1; i <= MOCK_USER_COUNT; i++) {
      // Pad the user ID for clean sorting (e.g., mock_fan_001)
      const userId = `mock_fan_${i.toString().padStart(3, '0')}`;
      const userRef = db.collection('users').doc(userId);
      
      userBatch.set(userRef, {
        id: userId,
        zoneId: 'south_gate',
        status: 'leaving', // Initial state
        sentiment: 'neutral',
        reward_code: null
      });
    }
    await userBatch.commit();
    console.log(`✅ Successfully seeded ${MOCK_USER_COUNT} simulated fans in the South Gate.`);

    console.log('🎉 Seeding complete! The database is ready for the Dashboard.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
}

// Execute the seeder
seedDatabase();
