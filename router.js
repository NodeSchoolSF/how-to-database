const express = require("express");

const knex = require("./db/knex");

const router = express.Router();

// Users - list all
router.get("/users", async (req, res) => {
  try {
    const results = await knex("users").select("*");
    return res.status(200).json({ data: results });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "failed to retrieve users" });
  }
});

// Users - create new
// NOTE: this is very simplified - normally to create users you'd have a user
// registration endpoint that salts/hashes password and generates a session.
router.post("/users", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "email required" });
    }

    const results = await knex("users").insert({ email: email }).returning("*");

    return res.status(201).json({ data: results });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "failed to create user" });
  }
});

// Wishlists - list all, filtered by a user_id
router.get("/wishlists", async (req, res) => {
  try {
    const userId = req.query.user_id;
    if (!userId) {
      return res.status(400).json({ error: "missing parameter" });
    }

    const results = await knex("wishlists")
      .select("*")
      .where("user_id", userId);

    return res.status(200).json({ data: results });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "failed to retrieve wishlists" });
  }
});

// Wishlists - create new wishlist
router.post("/wishlists", async (req, res) => {
  try {
    const { name, user_id } = req.body;
    if (!name || !user_id) {
      return res.status(400).json({ error: "missing parameter" });
    }

    const results = await knex("wishlists")
      .insert({ name, user_id })
      .returning("*");

    return res.status(201).json({ data: results });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "failed to create user" });
  }
});

// Wishlists - list all products for a wishlist
router.get("/wishlists/:id/products", async (req, res) => {
  try {
    const wishlistId = req.params.id;

    const results = await knex("wishlist_products")
      .join("products", "products.id", "wishlist_products.product_id")
      .select("products.*")
      .where("wishlist_products.wishlist_id", wishlistId)
      .orderBy("products.id");

    return res.status(200).json({ data: results });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "failed to retrieve wishlist products" });
  }
});

// Wishlists - add a product to a wishlist
router.post("/wishlists/:id/products", async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id } = req.body;

    if (!product_id) {
      return res.status(400).json({ error: "missing parameter" });
    }

    const result = await knex("wishlist_products")
      .insert({
        wishlist_id: id,
        product_id: product_id,
      })
      .returning("*");

    return res.status(201).json({ data: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "failed to add wishlist product" });
  }
});

module.exports = router;
