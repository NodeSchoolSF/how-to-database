const express = require("express");

const knex = require("./db/knex");

const router = express.Router();

router.get("/wishlists", async (req, res) => {
  try {
    const wishlists = await knex("wishlists").select("*");
    const wishlistProducts = await knex("wishlist_products")
      .join("products", "products.id", "wishlist_products.product_id")
      .select("*")
      .whereIn(
        "wishlist_products.wishlist_id",
        wishlists.map((item) => item.id)
      )
      .orderBy("products.id");

    const productMap = wishlistProducts.reduce((map, item) => {
      map[item.wishlist_id] = map[item.wishlist_id] || [];
      map[item.wishlist_id].push(item);
      return map;
    }, {});

    const results = wishlists.map((wishlist) => {
      return {
        ...wishlist,
        products: productMap[wishlist.id],
      };
    });

    return res.status(200).json({ data: results });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "failed to retrieve wishlists" });
  }
});

module.exports = router;
