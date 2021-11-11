const People = require('./../models/Poeple');

// external imports

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

// GET PEOPLE

const getPeople = async (req,res,next) => {
    try {
        const people = await People.find();
        res.status(200).json(people);
    } catch (err) {
        res.status(500).json({
            error:"people not found"
        })
    }
}

// ADD PEOPLE

const addPeople = async (req, res, next) => {
    let newPeople;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    newPeople = new People({
        ...req.body,
        password:hashedPassword
    });
    try {
        await newPeople.save();
        res.status(200).json({
            success: {
                msg: "sign up successfull"
            }
        });
    } catch (err) {
        res.status(500).json({
            errors: {
                people: {
                    msg:err.message
                }
            }
        });
    }
}

// LOGIN PEOPLE

const loginPeople = async (req,res,next) => {
    try {
        const people = await People.findOne({email:req.body.email});
        if (people) {
            const isValidPassword = await bcrypt.compare(req.body.password, people.password);
            if (isValidPassword) {
                const peopleObject = {
                    username: people.username,
                    email: people.email,
                    id:people._id
                }

                // the token

                const token = jwt.sign(peopleObject, process.env.PEOPLE_JWT_SECRET, {
                    expiresIn: 86400000
                });

                // set cookie

                const mycookie = res.cookie(process.env.POEPLE_COOKIE_NAME, token, {
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
        console.log(err.message);
        res.status(405).json({
            errors: {
                login: {
                    msg:"login failed"
                }
            }
        })
    }
}

// LOGOUT

const doLogout = async (req,res,next) => {
    try {
        res.clearCookie(process.env.POEPLE_COOKIE_NAME);
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
    addPeople,
    loginPeople,
    getPeople,
    doLogout
}