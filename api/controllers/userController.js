const User = require('./../models/User');
const bcrypt = require('bcrypt');
const path = require('path');
const { unlink } = require('fs');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

// GET USER

const getUser = async (req,res,next) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({
            errors: {
                user: {
                    msg: "users not found"
                }
            }
        });
    }
}

// ADD USER

const addUser = async (req,res,next) => {
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const file_directory = './image';

    if (req.files && req.files.length > 0) {

        newUser = new User({
            ...req.body,
            avatar: file_directory+ '/' + req.files[0].filename,
            password: hashedPassword
        });
    } else {
        newUser = new User({
            ...req.body,
            password: hashedPassword
        });
    }
    try {
        await newUser.save();
        res.json({
            success: {
                msg: "user added successfully"
            }
        });
    } catch (err) {
        res.status(500).json({
            errors: {
                user: {
                    msg: err.message
                }
            }
        });
    }
}

// FIND USER BY ID

const findUserById = async (req,res,next) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ _id: id });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({
            errors: {
                user: {
                    msg:"user is not found"
                }
            }
        })
    }
}

// UPDATE USER

const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let user = {};
    if (req.files && req.files.length > 0) {
        user = {
            ...req.body,
            password: hashedPassword,
            avatar:req.files[0].filename
        }
    } else {
        user = {
            ...req.body,
            password: hashedPassword
        }
    }
    try {
        await User.updateOne({ _id: id }, { $set: user });
        res.json({
            success: {
                msg: "user updated successfully"
            }
        });
    } catch (err) {
        res.status(500).json({
            errors: {
                user: {
                    msg: "user updated failed"
                }
            }
        });
    }
}

// DELETE USER

const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        
        const user = await User.findOne({ _id: id });
        if (user && user.avatar) {
            unlink(path.join(__dirname, `../../mern/public/${user.avatar}`), async (err) => {
                if (!err) {
                    await User.deleteOne({ _id: id });
                    unlink(path.join(__dirname, `./../../myapp/public/${user.avatar}`), (err) => {
                        if (!err) {
                            res.status(200).json({
                                success: {
                                    msg: "user deleted"
                                }
                            });
                        }
                    });
                }
            });            
        } else {
            await User.deleteOne({ _id: id });
            res.status(200).json({
                success: {
                    msg: "user deleted"
                }
            });
        }
    } catch (err) {
        res.status(500).json({
            errors: {
                user: {
                    msg: "user deleted failed!"
                }
            }
        });
    }
}

// DO LOGIN

const doLogin = async (req,res,next) => {
    try {
        const user = await User.findOne({name:req.body.name});
        if (user) {
            const isValidPassword = await bcrypt.compare(req.body.password, user.password);
            if (isValidPassword) {
                const userObject = {
                    username: user.name,
                    email: user.email,
                    id:user._id
                }

                // the token

                const token = jwt.sign(userObject, process.env.ADMIN_JWT_SECRET, {
                    expiresIn: 86400000
                });

                // set cookie

                res.cookie(process.env.ADMIN_COOKIE_NAME, token, {
                    maxAge: 86400000,
                    signed: true
                });

                res.status(200).json({
                    success: {
                        msg: "login successfull!!",
                        cookie:token
                    }
                })
            } else {
                throw createError('login falied user not found');
            }
        } else {
            throw createError('login falied user not found');
        }
    } catch (err) {
        console.log(err);
        res.status(405).json({
            errors: {
                login: {
                    msg:err
                }
            }
        })
    }
}

// DO LOGOUT

const doLogout = async (req,res,next) => {
    try {
        res.clearCookie(process.env.ADMIN_COOKIE_NAME);
        res.status(200).json({
            success: {
                msg: 'logged out !!'
            }
        });
    } catch(err){
        res.status(200).json({
            errors: {
                login: {
                    msg:"logged out failed !!"
                }
            }
        });
    }
}

module.exports = {
    getUser,
    addUser,
    findUserById,
    updateUser,
    deleteUser,
    doLogin,
    doLogout
}