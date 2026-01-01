import express from 'express'
import { getAllUsers , registerController , loginController,deleteUser } from '../controller/userController.js';
const router = express.Router();

router.get("/all-users", getAllUsers);

router.post("/register", registerController);

router.post("/login", loginController);

router.delete("/delete-user/:userId",deleteUser)
export default router
