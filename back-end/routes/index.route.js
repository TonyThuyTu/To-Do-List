const express = require("express");
const router = express.Router();

// Import sub-routes
const customerRoutes = require("./customer.route");

// Mount them
router.use("/customers", customerRoutes);

module.exports = router;
