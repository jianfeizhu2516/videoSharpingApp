import express from "express";
import { addVideo, addView, getByTag, getVideo, random, search, sub, trend } from "../controllers/videoController.js"
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

//create a video
router.post("/",verifyToken,addVideo);

//这里的Id是videoId
router.put("/:id",verifyToken,addVideo)

router.delete("/:id",verifyToken,addVideo)

router.get("/find/:id",getVideo)

router.put("/view/:id",addView)

router.put("/trend",trend)

router.put("/random",random)

router.put("/sub",sub)

router.put("/tags",getByTag)

router.put("/search",search)


export default router;
