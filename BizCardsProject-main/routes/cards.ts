import { Router } from "express";
import { Card } from "../db/model/card.model";
import { verifyToken } from "../middleware/verify-token";
import {validateCard, validateCardUpdate} from "../middleware/validate-schema";
import { verifyIsBusiness } from "../middleware/verify-is-business";
import {verifyUserOrAdmin} from "../middleware/verify-user-or-admin";
import {verifyUser} from "../middleware/verify-user";
import {ICard, ICardUpdate} from "../db/types/db";

const router = Router();

//Get all cards
router.get("/", async (req, res, next) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (e) {
    next(e);
  }
});

//Get my cards
router.get("/my-cards", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const cards = await Card.find({ user_id: userId });
    res.json(cards);
  } catch (e) {
    next(e);
  }
});

// Get card by id:
router.get("/:id", verifyUserOrAdmin, async (req, res, next) => {
  try {
    const id = req.params.id;

    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ message: `Card with id: ${id} Not found` });
    }
    res.json(card);
  } catch (e) {
    next(e);
  }
});

//Post a card
router.post("/", verifyIsBusiness, validateCard, async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const card = await Card.create({ ...req.body, user_id: userId });
    res.status(201).json(card);
  } catch (e) {
    next(e);
  }
});

// Update card by id:
router.put("/:id", verifyUserOrAdmin, validateCard, async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body as ICard;

    const updatedCard = await Card.findByIdAndUpdate(id, body, {
      new: true
    });

    if (!updatedCard) {
      return res.status(404).json({ message: `Card with id: ${id} Not found` });
    }
    res.json(updatedCard);
  } catch (e) {
    next(e);
  }
});

//Patch card by id:
router.patch("/:id", verifyUserOrAdmin, validateCardUpdate, async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body as ICardUpdate; // Assuming ICardUpdate is the interface for your card update model

    const updatedCard = await Card.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedCard) {
      return res.status(404).json({ message: `Card with id: ${id} Not found` });
    }

    res.json(updatedCard);
  } catch (e) {
    next(e);
  }
});

//Delete card by id:
router.delete("/:id", verifyUserOrAdmin, async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletedCard = await Card.findByIdAndDelete(id);
    if (!deletedCard) {
      return res.status(404).json({ message: `card with id: ${id} Not found` });
    }
    res.json(deletedCard);
  } catch (e) {
    next(e);
  }
});
export default router;
