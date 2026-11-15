# Library Management System

A backend application for managing a library's books, genres and users. Built with NestJS, Prisma ORM and PostgreSQL.

## Technologies Used

- **NestJS** – Backend application framework
- **TypeScript** – Programming language
- **Prisma ORM** – Database modelling and management
- **PostgreSQL** – Relational database
- **Neon** – Hosted PostgreSQL database

## Project Structure

```text
library-management-system/
├── api/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── prisma/
│   │   │   └── prisma.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env.example
│   └── package.json
└── README.md
```

## Database Models

The database contains three core models:

- **User:** Stores library user information and their roles.
- **Genre:** Stores book categories.
- **Book:** Stores book information and references its genre.

The User model uses a Role enum with two possible values:

- `PATRON`
- `LIBRARIAN`

## Schema Decisions

### Why Book references Genre

The Book model references the Genre model through a foreign key called `genreId` instead of storing the genre name directly inside each book record.

This establishes a one-to-many relationship:

- One genre can have many books.
- Each book belongs to one genre.

### Benefits of this design

1. **Reduces data duplication:** Genre information is stored once rather than repeated in every book record.
2. **Maintains data consistency:** If a genre name changes, it only needs to be updated in one place.
3. **Supports referential integrity:** The foreign key ensures that a book references an existing genre.
4. **Improves maintainability:** Books and genres can be managed independently.

### Prisma vs Document Databases

In Prisma with PostgreSQL, relationships are represented using foreign keys and relational constraints.

In a document database such as MongoDB, genre information could be embedded inside each book document or referenced through an identifier in another collection.

For this project, PostgreSQL was selected because the library system has clearly defined relationships between users, books and genres.

## Database Seeding

The database seed script is located at:

`api/prisma/seed.ts`

It creates:

- 4 genres
- 16 books distributed across the genres

The seed script uses Prisma `upsert` operations to avoid creating duplicate records when executed repeatedly.

## Environment Configuration

Create an `.env` file inside the `api` directory.

Use `.env.example` as a template and provide your own PostgreSQL connection string:

```env
DATABASE_URL="your_postgresql_connection_string"
```

**Security:** Never commit your actual `.env` file or expose database credentials.

## Installation and Setup

Navigate to the API directory:

```bash
cd api
```

Install dependencies:

```bash
npm install
```

Configure your `.env` file with your PostgreSQL connection string.

Generate Prisma Client:

```bash
npx prisma generate
```

Apply database migrations:

```bash
npx prisma migrate dev
```

Seed the database:

```bash
npx prisma db seed
```

## Running the Application

Start the development server:

```bash
npm run start:dev
```

The application runs at:

`http://localhost:3000`

## License

This project is developed for educational purposes.