// Sample notes for Lesson 7 — runs via mongosh
// docker exec dev-lab-mongo mongosh -u devlab -p devlab --authenticationDatabase admin devlab --file /seed-notes.js

db = db.getSiblingDB("devlab");

db.notes.deleteMany({});

db.notes.insertMany([
    {
      title: "Learn Git basics",
      tags: ["learning", "git"],
      done: false,
      createdAt: new Date(),
    },
    {
      title: "Compare Postgres vs MongoDB",
      tags: ["learning", "mongodb", "postgres"],
      done: false,
      createdAt: new Date(),
    },
    {
      title: "Build notes API with FastAPI",
      tags: ["learning", "python", "api"],
      done: false,
      createdAt: new Date(),
    },
]);

print("Inserted sample notes.");
print("Notes count:", db.notes.countDocuments());
db.notes.find().forEach((doc) => printjson(doc));
