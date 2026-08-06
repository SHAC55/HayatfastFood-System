import { Router } from "express";
import { addMenuItem, getAllMenuItems, updateMenuItem,  deleteMenuItem} from "../controllers/menu.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, addMenuItem);
router.get("/", authMiddleware, getAllMenuItems);
router.put("/:id", authMiddleware, updateMenuItem);
router.delete("/:id", authMiddleware, deleteMenuItem);

export default router;