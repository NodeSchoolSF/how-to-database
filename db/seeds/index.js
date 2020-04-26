const products = [
  { name: "Nintendo Switch", price: 1000 },
  { name: "PS4", price: 400 },
  { name: "Xbox", price: 500 },
  { name: "Flour", price: 5 },
];

const users = [
  { email: "bob@example.com" },
  { email: "karen@example.com" },
  { email: "dwight@example.com" },
];

const wishlists = [
  {
    name: "Bobs Quarantine Wishlist",
    userEmail: "bob@example.com",
    productNames: ["Nintendo Switch", "Flour"],
  },
  {
    name: "Bobs Videogame List",
    userEmail: "bob@example.com",
    productNames: ["PS4"],
  },
  {
    name: "Karens Top Food List",
    userEmail: "karen@example.com",
    productNames: ["Xbox"],
  },
];

exports.seed = async function (knex) {
  const productInsertions = products.map((item) => {
    return () => knex("products").insert(item).returning("id");
  });

  const userInsertions = users.map((item) => {
    return () => knex("users").insert(item).returning("id");
  });

  const wishlistInsertions = wishlists.map((item) => {
    return async () => {
      const user = await knex("users").where("email", item.userEmail).first();
      return await knex("wishlists")
        .insert({
          name: item.name,
          user_id: user.id,
        })
        .returning("id");
    };
  });

  const wishlistProductInsertions = wishlists
    .map((wishlist) => {
      return wishlist.productNames.map((productName) => ({
        wishlistName: wishlist.name,
        productName,
      }));
    })
    .flat()
    .map((item) => {
      return async () => {
        const wishlist = await knex("wishlists")
          .where("name", item.wishlistName)
          .first();
        const product = await knex("products")
          .where("name", item.productName)
          .first();

        return await knex("wishlist_products").insert({
          wishlist_id: wishlist.id,
          product_id: product.id,
        });
      };
    });

  const tasks = [
    // Clear all existing rows before inserting
    () => knex("wishlist_products").del(),
    () => knex("wishlists").del(),
    () => knex("users").del(),
    () => knex("products").del(),
    // Insert seed data
    ...productInsertions,
    ...userInsertions,
    ...wishlistInsertions,
    ...wishlistProductInsertions,
  ];

  // Execute promises sequentially
  return tasks.reduce(async (promiseChain, taskFunc) => {
    await promiseChain;
    const task = taskFunc();
    await task;
  }, Promise.resolve());
};
