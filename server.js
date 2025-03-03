const jsonServer = require("json-server");
const multer = require("multer");
const fs = require("fs");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Ensure 'public/images' directory exists
const uploadDir = "public/images";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    let imageFilename = `${Date.now()}_${file.originalname}`;
    req.body.imageFilename = imageFilename;
    cb(null, imageFilename);
  },
});

const upload = multer({ storage });

// Multer for file upload (before json-server router)
server.use(upload.any());

// Manually parse JSON bodies because json-server doesn't do this before multer
server.use((req, res, next) => {
  if (req.headers["content-type"]?.includes("application/json")) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        req.body = JSON.parse(body);
        next();
      } catch (err) {
        res.status(400).json({ error: "Invalid JSON format" });
      }
    });
  } else {
    next();
  }
});

// POST request validation
server.post("/products", (req, res, next) => {
  let errors = {};
  let hasError = false;

  // Validate product fields
  if (!req.body.name || req.body.name?.length < 2) {
    hasError = true;
    errors.name = "The name length should be at least 2 characters";
  }
  if (!req.body.brand || req.body.brand?.length < 2) {
    hasError = true;
    errors.brand = "The brand length should be at least 2 characters";
  }
  if (!req.body.category || req.body.category?.length < 2) {
    hasError = true;
    errors.category = "The category length should be at least 2 characters";
  }
  if (!req.body.price || isNaN(req.body.price) || req.body.price <= 0) {
    hasError = true;
    errors.price = "The price must be a valid positive number";
  }
  if (!req.body.description || req.body.description?.length < 10) {
    hasError = true;
    errors.description = "The description should be at least 10 characters";
  }

  if (hasError) {
    return res.status(422).json({ errors });
  }

  req.body.createdAt = new Date().toISOString();
  req.body.price = Number(req.body.price);

  next(); // Proceed to json-server
});

// Use json-server router
server.use(router);
server.listen(4000, () => {
  console.log("JSON Server is running on port 4000");
});
