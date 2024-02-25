// const jwt = require('jsonwebtoken');
// const {SECRET, authenticateJwt} = require("../Middleware/auth")

const Message = require("../Database/messageModel")
const router = require('express').Router();
const bcrypt = require("bcrypt");

router.post('/addmsg', async (req, res, next) => {
    try {

        const { from, to, message } = req.body;

        const data = await Message.create({
            message : {text: message},
            users: [from, to],
            sender:from,
        });
        if(data) return res.json({msg: "Message Added Successfully", status : true});
        return res.json({msg: "Failed to Add Message to the Database", status : false});
     
    } catch (ex) {
        next(ex);
    }
});

router.post('/getmsg', async (req, res, next) => {
    try {
        const { from, to} = req.body;

        const messages = await Message.find({
            users: {
                $all: [from, to],
            }
        }).sort({updatedAt: 1});

        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }
        });

        return res.json(projectedMessages);
    } catch (ex) {
        next(ex);
    }

});

module.exports=router;