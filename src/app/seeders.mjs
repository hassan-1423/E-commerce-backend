// @ts-check
import { PrismaClient, UserRole } from "@prisma/client";
import argon2 from "argon2";

/**
 * Create the default admin user account with account password
 * @param {PrismaClient} db
 */
async function adminSeeder(db) {
  await db.user.create({
    data: {
      name: "Admin",
      email: "admin@site.com",
      role: UserRole.ADMIN,
      password: {
        create: {
          hash: await argon2.hash("123_Orangez"),
        },
      },
    },
  });
}

/**
 * Seed products data into the database
 * @param {PrismaClient} db
 */
async function productSeeder(db) {
  const products = [
    {
      title: "Smartphone A",
      description: "High-performance smartphone with excellent camera.",
      category: {
        create: {
          categoryName: "Electronics",
        },
      },
      price: 599.99,
      discountPercentage: 10,
      rating: 4.5,
      stock: 100,
      brand: "BrandX",
      sku: "SKU12345",
      weight: 0.3,
      dimensions: {
        create: {
          width: 7.0,
          height: 15.0,
          depth: 0.7,
        },
      },
      warrantyInformation: "2 years warranty.",
      shippingInformation: "Ships within 2 business days.",
      availabilityStatus: "In Stock",
      imagesURL: ["image1.jpg", "image2.jpg"],
      thumbnail: "thumb.jpg",
    },
    {
      title: "Laptop Pro",
      description: "Lightweight laptop with powerful performance.",
      category: {
        create: {
          categoryName: "Computers",
        },
      },
      price: 1299.99,
      discountPercentage: 15,
      rating: 4.8,
      stock: 50,
      brand: "BrandY",
      sku: "SKU23456",
      weight: 1.5,
      dimensions: {
        create: {
          width: 33.0,
          height: 23.0,
          depth: 1.2,
        },
      },
      warrantyInformation: "3 years warranty.",
      shippingInformation: "Ships within 3 business days.",
      availabilityStatus: "In Stock",
      imagesURL: ["image3.jpg", "image4.jpg"],
      thumbnail: "thumb2.jpg",
    },
    // Add more products here...
  ];

  for (const product of products) {
    await db.product.create({
      data: {
        ...product,
        tags: {
          connectOrCreate: [
            {
              where: { name: "Electronics" },
              create: { name: "Electronics" },
            },
            {
              where: { name: "Featured" },
              create: { name: "Featured" },
            },
          ],
        },
      },
    });
  }
}

/**
 * The application may require some default data to be present in the database
 * to be operational. This function runs the seeders to set up that data.
 *
 * @returns {Promise<void>}
 */
async function runSeeders() {
  const db = new PrismaClient();

  /** @type {((client: PrismaClient) => Promise<void>)[]} */
  const enabledSeeders = [adminSeeder, productSeeder];

  try {
    for (const seeder of enabledSeeders) {
      await seeder(db);
    }
  } finally {
    await db.$disconnect();
  }
}

/* eslint-disable-next-line no-console */
runSeeders().catch(console.error);
