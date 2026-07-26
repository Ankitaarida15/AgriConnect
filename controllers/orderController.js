const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.placeOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    const order = await prisma.order.create({
      data: {
        quantity,
        totalPrice: product.price * quantity,
        buyerId: req.user.id,
        productId: product.id,
      },
    });

    await prisma.product.update({
      where: { id: product.id },
      data: {
        quantity: product.quantity - quantity,
      },
    });

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};