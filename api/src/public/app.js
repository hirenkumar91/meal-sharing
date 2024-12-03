import pkg from 'pg';
const { Client } = pkg;

// Replace with your Render database credentials
const client = new Client({
  connectionString: 'postgres://<username>:<password>@<hostname>:<port>/<database_name>',
  ssl: {
    rejectUnauthorized: false, // Required by Render for SSL connection
  },
});

async function createTables() {
  const query = `
    -- Create Meal Table
    CREATE TABLE IF NOT EXISTS "Meal" (
        "id" SERIAL PRIMARY KEY,
        "title" VARCHAR(255) NOT NULL,
        "description" TEXT,
        "location" VARCHAR(255) NOT NULL,
        "meal_date" TIMESTAMP NOT NULL,
        "max_reservations" INTEGER NOT NULL,
        "price" DECIMAL(10, 2) NOT NULL,
        "created_date" DATE DEFAULT CURRENT_DATE
    );

    -- Create Reservation Table
    CREATE TABLE IF NOT EXISTS "Reservation" (
        "id" SERIAL PRIMARY KEY,
        "number_of_guests" INTEGER NOT NULL CHECK ("number_of_guests" > 0),
        "meal_id" INTEGER NOT NULL,
        "created_date" DATE DEFAULT CURRENT_DATE,
        "contact_phonenumber" VARCHAR(15) NOT NULL,
        "contact_name" VARCHAR(100) NOT NULL,
        "contact_email" VARCHAR(150) NOT NULL,
        CONSTRAINT fk_meal FOREIGN KEY ("meal_id") REFERENCES "Meal"("id") ON DELETE CASCADE
    );

    -- Create Review Table
    CREATE TABLE IF NOT EXISTS "Review" (
        "id" SERIAL PRIMARY KEY,
        "title" VARCHAR(255) NOT NULL,
        "description" TEXT,
        "meal_id" INTEGER NOT NULL,
        "stars" INTEGER NOT NULL CHECK ("stars" BETWEEN 1 AND 5),
        "created_date" DATE DEFAULT CURRENT_DATE,
        CONSTRAINT fk_review_meal FOREIGN KEY ("meal_id") REFERENCES "Meal"("id") ON DELETE CASCADE
    );
  `;

  try {
    await client.connect();
    await client.query(query);
    console.log('Tables created successfully on Render PostgreSQL!');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    await client.end();  // Always close the connection when done
  }
}

createTables();