require("dotenv").config({ path: "backend/.env.local" });
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const session = require("express-session");
const passport = require("./passportConfig");
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const { PrismaClient } = require("@prisma/client");


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");

const app = express();
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts allowed
  message: {
    message: "Too many login attempts. Try again after 15 minutes."
  }
});
const prisma = new PrismaClient();

const upload = multer({
  dest: "uploads/",
});


// GEMINI AI
console.log("Gemini Key:", process.env.GEMINI_API_KEY);
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://agri-connect-pp2d.vercel.app",
  ],
  credentials: true,
}));
 
app.use(express.json());

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());


// =====================
// HOME ROUTE
// =====================
app.get("/", (req, res) => {
  res.status(200).send("AgriConnect Backend Running 🚀");
});

// =====================
// GET ALL USERS
// =====================
app.get("/users", async (req, res) => {

  try {

    const users = await prisma.user.findMany();

    res.status(200).json(users);

  } catch (error) {
    console.error("AI ERROR DETAILS:", error);

    res.status(500).json({
      message: error.message,
    });
}
});

// =====================
// ADD USER
// =====================
app.post(
  "/users",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("phone").notEmpty().withMessage("Phone is required"),
    body("role").notEmpty().withMessage("Role is required"),
  ],
  async (req, res) => {

  console.log(req.body);
const errors = validationResult(req);

if (!errors.isEmpty()) {
  return res.status(400).json({
    errors: errors.array(),
  });
}

  try {

    const {
      name,
      email,
      password,
      phone,
      village,
      role
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !role
    ) {
      return res.status(400).json({
        message: "All required fields are required"
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

const user = await prisma.user.create({
  data: {
    name,
    email,
    password: hashedPassword,
    phone,
    village,
    role
  }
});

    res.status(201).json({
      message: "User created successfully",
      user
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal Server Error"
    });

  }

});

// =====================
// LOGIN USER
// =====================
app.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required"
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal Server Error"
    });

  }

});

// =====================
// GET LOGGED-IN USER
// =====================
app.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        village: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error("ME ERROR:", error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
// =====================
// GET ALL PRODUCTS
// =====================
app.get("/products", async (req, res) => {
  try {

    const products = await prisma.product.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            village: true,
            role: true,
            createdAt: true
          }
        }
      }
    });

    res.status(200).json(products);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal Server Error"
    });

  }
});

// =====================
// SEARCH PRODUCT
// =====================
app.get("/products/search", async (req, res) => {

  try {

    const q = req.query.q || "";

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: q,
          mode: "insensitive"
        }
      },
      include: {
        user: true
      }
    });

    res.status(200).json(products);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal Server Error"
    });

  }

});

// =====================
// GET SINGLE PRODUCT
// =====================
app.get("/products/:id", async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const product = await prisma.product.findUnique({
      where: {
        id: id
      },
      include: {
        user: true
      }
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json(product);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal Server Error"
    });

  }

});

// =====================
// ADD PRODUCT
// =====================
app.post(
  "/products",
  authMiddleware,
  roleMiddleware("FARMER"),
  async (req, res) => {
    console.log("User:", req.user);
console.log("Body:", req.body);
  try {

    const {
  name,
  category,
  description,
  price,
  quantity,
  image
} = req.body;

    const product = await prisma.product.create({
    data: {
  name,
  category,
  description,
  price,
  quantity,
  image,
  userId: req.user.id
}  
    });

    res.status(201).json(product);

  } 
  catch (error) {
  console.error(error);

  res.status(500).json({
    message: error.message,
  });
}
});

// =====================
// UPDATE PRODUCT
// =====================
app.put("/products/:id", authMiddleware, async (req, res) => {

  try {

console.log("User:", req.user);
console.log("Body:", req.body);
console.log("Product ID:", req.params.id);

    const id = parseInt(req.params.id);

    const existingProduct = await prisma.product.findUnique({
  where: {
    id
  }
});

if (!existingProduct) {
  return res.status(404).json({
    message: "Product not found"
  });
}

if (existingProduct.userId !== req.user.id) {
  return res.status(403).json({
    message: "You can update only your own products"
  });
}

    const {
      name,
      category,
      description,
      price,
      quantity,
      image,
      userId
    } = req.body;

    const product = await prisma.product.update({
      where: {
        id
      },
      data: {
  name,
  category,
  description,
  price: Number(price),
  quantity: Number(quantity),
  image
}
      
    });

    res.status(200).json({
      message: "Product updated successfully",
      product
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal Server Error"
    });

  }

});
// =====================
// DELETE PRODUCT
// =====================
app.delete("/products/:id", authMiddleware, async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    const existingProduct = await prisma.product.findUnique({
  where: {
    id
  }
});

if (!existingProduct) {
  return res.status(404).json({
    message: "Product not found"
  });
}

if (existingProduct.userId !== req.user.id) {
  return res.status(403).json({
    message: "You can delete only your own products"
  });
}

    await prisma.product.delete({
      where: {
        id
      }
    });

    res.status(200).json({
      message: "Product deleted successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Internal Server Error"
    });

  }

});

// =====================
// PLACE ORDER
// =====================
app.post("/orders", authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await prisma.product.findUnique({
      where: {
        id: Number(productId),
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({
        message: "Insufficient stock",
      });
    }

    const order = await prisma.order.create({
      data: {
        buyerId: req.user.id,
        productId: product.id,
        quantity: Number(quantity),
        totalPrice: product.price * Number(quantity),
      },
    });

    await prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        quantity: product.quantity - Number(quantity),
      },
    });

    res.status(201).json({
      message: "Order Placed Successfully",
      order,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
// =====================
// AI ASSISTANT
// =====================
app.post("/ai", upload.single("image"), async (req, res) => {
  try {
    const message = req.body.message;

    let prompt = message;
    let imagePart = null;

if (req.file) {
  const imageBuffer = fs.readFileSync(req.file.path);

  imagePart = {
    inlineData: {
      mimeType: req.file.mimetype,
      data: imageBuffer.toString("base64"),
    },
  };
}

if (req.file) {
  prompt =
    message +
    "\n\nAnalyze this crop image. Tell:\n" +
    "1. Crop Name\n" +
    "2. Disease (if any)\n" +
    "3. Treatment\n" +
    "4. Fertilizer Suggestion\n" +
    "5. Watering Tips";
}

    if (!message) {
      return res.status(400).json({
        message: "Question is required",
      });
    }
const contents = imagePart
  ? [
      imagePart,
      {
        text:
          prompt +
          "\n\nAnalyze this agriculture image. Tell:\n" +
          "1. Crop Name\n" +
          "2. Disease (if visible)\n" +
          "3. Treatment\n" +
          "4. Fertilizer Recommendation\n" +
          "5. Watering Tips",
      },
    ]
  : prompt;

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents,
});
    
if (req.file) {
  fs.unlinkSync(req.file.path);
}

    res.status(200).json({
      reply: response.text,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "AI Error",
    });
  }
});

// =====================
// GOOGLE LOGIN
// =====================

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user.id,
        role: req.user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.redirect(`https://agri-connect-pp2d.vercel.app/login?token=${token}`);
  }
);

// START SERVER

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});