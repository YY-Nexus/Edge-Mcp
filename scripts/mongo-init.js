db = db.getSiblingDB("mcpdb");
db.createUser({
  user: "mcpuser",
  pwd: "secureMongoPass",
  roles: [{ role: "readWrite", db: "mcpdb" }]
});
db.createCollection("logs");

