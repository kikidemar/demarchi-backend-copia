import { Router } from "express"
import Users from "../../dao/Mongo/models/User.js"
import verifyTokenAndAdmin from "../../middlewares/verifyTokenAndAdmin.js"
import sendmail from "../../utils/sendMail.js";
import passport_call from "../../middlewares/passport_call.js"
import isAdmin from "../../middlewares/isAdmin.js";

const users_router = Router()


users_router.get("/premium/:uid", passport_call('jwt'), isAdmin, async (req, res, next) => {
    try {
        const { uid } = req.params

        const mongouser = await Users.findById(uid)

        // console.log(mongouser)
        if (req.user.role != "admin") return res.status(401).json({
            success: false,
            message: "unauthorized"
        })

        if (mongouser == null) return res.status(404).json({
            success: false,
            message: "user not found"
        })


        if (mongouser.role === "admin") {
            return res.status(401).json({
                success: false,
                message: "can't change admin privileges"
            })
        }

        mongouser.role = mongouser.role === "user" ? "premium" : "user"
        await mongouser.save()

        res.status(200).json({
            success: true,
            message: `user role changed to ${mongouser.role}`
        })

    } catch (err) {
        console.log(err)
        next(err)
    }
})

users_router.delete("/:uid", passport_call('jwt'), isAdmin, async (req, res, next) => {
    try {
        await Users.findByIdAndDelete(req.params.uid)
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


users_router.get('/', passport_call('jwt'), isAdmin, async (req, res, next) => {
    try {
        const users = await Users.find({}, 'name email role').lean()
        return res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


users_router.delete('/', passport_call('jwt'), isAdmin, async (req, res) => {
    try {

        const users = await Users.find();

        const deletedUsers = []
        const notDeletedUsers = []

        const deleteTime = 1000 * 60 * 60 * 24 * (2)
        users.forEach(user => {
            const connect = new Date(user.last_connection)
            if (connect.getTime() <= Date.now() - deleteTime) {
                deletedUsers.push(user)
                // console.log(deletedUsers)
            } else {
                notDeletedUsers.push(user)
            }
        })

        if (deletedUsers.length === 0) {
            res.status(500).json({
                success: false,
                message: 'There are no users inactive for delete'
            })
        } else {

            for (const user of deletedUsers) {
                try {
                    await sendmail(
                        `${user.email}`,
                        'Account deleted due inactivity',
                        `<h1>Your account was deleted due 2 days of inactivity</h1>`
                    )

                    await Users.findByIdAndDelete(user._id)

                } catch (err) {
                    console.error(`Conflict when sending email to ${user.mail}: ${err}`)
                }
            }

            res.status(200).json({
                success: true,
                message: 'Inactive users were deleted successfully'
            })

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error'
        })
    }
})


export default users_router