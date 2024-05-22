import { createError } from "../error.js"
import User from "../models/User.js"

export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body
                },
                {
                    new: true
                })
            res.status(200).json(updatedUser)
        } catch (err) {
            next(err)
        }

    } else {
        return next(createError(403, "you can only update your account"))
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndDelete(
                req.params.id,
            )
            res.status(200).json("user has been deleted")
        } catch (err) {
            next(err)
        }
    } else {
        return next(createError(403, "you can only delete your account"))
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

export const subscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {//current user id
            $push: { subcribedUsers: req.params.id } //被订阅者的id 比如influencer
        });
        //increase number of followers of the person being subscribed
        await User.findByIdAndUpdate(req.params.id, {
            $inc: {
                subscribers: 1
            },
        })
        res.status(200).json("subscription successful")
    } catch (err) {
        next(err)
    }
}

export const unsubscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {//current user id
            $pull: { subcribedUsers: req.params.id } //被订阅者的id 比如influencer
        });
        //increase number of followers of the person being subscribed
        await User.findByIdAndUpdate(req.params.id, {
            $inc: {
                subscribers: -1
            },
        })
        res.status(200).json("Unsubscription successful")
    } catch (err) {
        next(err)
    }
}

export const like = async(req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try{
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{likes:id},
            $pull:{dislikes:id}
        })
        res.status(200).json("The video has been liked.")
    }catch(err){
        next(err)
}
}

export const dislike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try{
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}
        })
        res.status(200).json("The video has been disliked.")
    }catch(err){
        next(err)
}
}
