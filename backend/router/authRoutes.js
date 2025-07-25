import express from "express"
import protect from "../middleware/authMiddleware.js"
import { registerUser, loginUser, getUserInfo } from "../controllers/authController.js"
import upload from "../middleware/uploadMiddleware.js"

let router = express()

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/getUser", protect, getUserInfo)

router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No File uplaoded" });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename
        }`;
    res.status(200).json({ success: true, imageUrl });
})

export default router