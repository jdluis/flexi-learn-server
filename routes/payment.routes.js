// in "routes/payment.routes.js"

const Courses = require("../models/Course.model.js");
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // make sure to add your Stripe Secret Key to the .env
const Payment = require("../models/Payment.model.js");
const isAuthenticated = require("../middlewares/auth.middleware");


//Get buyer products
router.get("/:buyerId", async (req, res, next) => {
  const { buyerId } = req.params;

  try {
    const data = await Payment.find({buyer: buyerId}).populate("product buyer")
    res.status(200).json(data);

  } catch (error) {
    next(error);
  }
});


router.post("/create-payment-intent", isAuthenticated, async (req, res, next) => {
  const productId = req.body._id; // this is how we will receive the productId the user is trying to purchase. This can also later be set to receive via params.

  try {
    // this is where you will get the correct price to be paid
    const product = await Courses.findById(productId);
    const priceToPay = product.price; // if not stored in cents, make sure to convert them to cents
    if (product === null) {
      res
        .status(500)
        .json({ errorMessage: "No se consiguio el precio, fallo desarrollo" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: priceToPay, // this is an example for an amount of 14 EUR used for testing.
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    await Payment.create({
      price: priceToPay,
      product: productId,
      status: "incomplete",
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      buyer: req.payload._id //Testing payload buyer example to add who bought the product (not done in this example)
    });
    res.send({
      clientSecret: paymentIntent.client_secret, // the client secret will be sent to the FE after the stripe payment intent creation
    });
  } catch (error) {
    next(error);
  }
});


router.patch("/update-payment-intent", async (req, res, next) => {
  const { clientSecret, paymentIntentId } = req.body;

  try {

    await Payment.findOneAndUpdate({
      clientSecret: clientSecret,
      paymentIntentId: paymentIntentId,
    },{ 
      status: "succeeded" 
    });

    res.status(200).json();

  } catch (error) {
    next(error);
  }
});


module.exports = router;
