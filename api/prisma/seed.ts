
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create the genres first
  const genres = [
    {
      name: "Fiction",
      description: "Imaginary stories and novels",
    },
    {
      name: "Science",
      description: "Scientific knowledge and discoveries",
    },
    {
      name: "Technology",
      description: "Computing and technological innovation",
    },
    {
      name: "History",
      description: "Historical events and civilizations",
    },
  ];

  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { name: genre.name },
      update: { description: genre.description },
      create: genre,
    });
  }

  // Retrieve the genres so we can link books to them
  const savedGenres = await prisma.genre.findMany();

  const genreMap = Object.fromEntries(
    savedGenres.map((genre) => [genre.name, genre.id])
  );

  // Create 16 books across the four genres
  const books = [
    {
      title: "Things Fall Apart",
      author: "Chinua Achebe",
      isbn: "9780007200020",
      genreId: genreMap.Fiction,
      publishedYear: 1958,
    },
    {
      title: "The River Between",
      author: "Ngugi wa Thiong'o",
      isbn: "9780435905484",
      genreId: genreMap.Fiction,
      publishedYear: 1965,
    },
    {
      title: "Purple Hibiscus",
      author: "Chimamanda Ngozi Adichie",
      isbn: "9781616202415",
      genreId: genreMap.Fiction,
      publishedYear: 2003,
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      isbn: "9780061122415",
      genreId: genreMap.Fiction,
      publishedYear: 1988,
    },
    {
      title: "Half of a Yellow Sun",
      author: "Chimamanda Ngozi Adichie",
      isbn: "9780007200283",
      genreId: genreMap.Fiction,
      publishedYear: 2006,
    },
    {
      title: "A Brief History of Time",
      author: "Stephen Hawking",
      isbn: "9780553380163",
      genreId: genreMap.Science,
      publishedYear: 1988,
    },
    {
      title: "The Selfish Gene",
      author: "Richard Dawkins",
      isbn: "9780198788607",
      genreId: genreMap.Science,
      publishedYear: 1976,
    },
    {
      title: "Cosmos",
      author: "Carl Sagan",
      isbn: "9780345539434",
      genreId: genreMap.Science,
      publishedYear: 1980,
    },
    {
      title: "The Gene",
      author: "Siddhartha Mukherjee",
      isbn: "9781476733500",
      genreId: genreMap.Science,
      publishedYear: 2016,
    },
    {
      title: "Silent Spring",
      author: "Rachel Carson",
      isbn: "9780618249060",
      genreId: genreMap.Science,
      publishedYear: 1962,
    },
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      isbn: "9780132350884",
      genreId: genreMap.Technology,
      publishedYear: 2008,
    },
    {
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt and David Thomas",
      isbn: "9780135957059",
      genreId: genreMap.Technology,
      publishedYear: 1999,
    },
    {
      title: "Code",
      author: "Charles Petzold",
      isbn: "9780735611313",
      genreId: genreMap.Technology,
      publishedYear: 1999,
    },
    {
      title: "The Innovators",
      author: "Walter Isaacson",
      isbn: "9781476708690",
      genreId: genreMap.Technology,
      publishedYear: 2014,
    },
    {
      title: "A People's History of the United States",
      author: "Howard Zinn",
      isbn: "9780062397348",
      genreId: genreMap.History,
      publishedYear: 1980,
    },
    {
      title: "The Silk Roads",
      author: "Peter Frankopan",
      isbn: "9781101912379",
      genreId: genreMap.History,
      publishedYear: 2015,
    },
  ];

  for (const book of books) {
    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {},
      create: book,
    });
  }

  console.log("Database seeding completed successfully!");
  console.log(`Genres available: ${savedGenres.length}`);
  console.log(`Books prepared: ${books.length}`);
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
