const Recipe = require('./../models/Recipe');
const path = require('path');
const { unlink } = require('fs');

// GET RECIPE

const getRecipe = async (req,res,next) => {
    try {
        const recipes = await Recipe.find({status:"active"});
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({
            errors: {
                recipes: {
                    msg: "recipe not found"
                }
            }
        });
    }
}

// SHARE RECIPE

const shareRecipe = async (req,res,next) => {
    let newRecipe;
    newRecipe = new Recipe({
        ...req.body
    });
    try {
        newRecipe.save();
        res.status(200).json({
            success: {
                msg:"recipe share successfully"
            }
        })
    } catch (err) {
        res.status(500).json({
            errors: {
                recipe: {
                    msg:err.message
                }
            }
        })
    }
}

// APPROVE RECIPE

const approveRecipe = async (req,res,next) => {
    const { id } = req.params;
    try {
        
        await Recipe.updateOne({ _id: id }, { $set: { ...req.body } });
        res.status(200).json({
            success: {
                msg: "recipe is approved"
            }
        });
        
    } catch (err) {
        res.status(500).json({
            errors: {
                recipe: {
                    msg:err.message
                }
            }
        })
    }
}

// MODIFY RECIPE

const modifyRecipe = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (req.files && req.files.length > 0) {
            const recipe = await Recipe.findOne({ _id: id });
            if (recipe.image) {
                unlink(
                    path.join(__dirname, `./../../mern/public/${recipe.image}`),
                    (err) => {
                        if (!err) {
                            unlink(
                                path.join(__dirname, `./../../myapp/public/${recipe.image}`),
                                (err2) => {
                                    if (!err2) {
                                        const file_directory = './image';
                                        async function update() {
                                            await Recipe.updateOne({ _id: id }, { $set: { ...req.body, image: file_directory + '/' + req.files[0].filename } });
                                        }
                                        update();
                                        res.status(200).json({
                                            success: {
                                                msg: "recipe modified"
                                            }
                                        });
                                    }
                                }
                            )
                        }
                    }
                );
            } else {
                const file_directory = './image';
                async function update() {
                    await Recipe.updateOne({ _id: id }, { $set: { ...req.body, image: file_directory + '/' + req.files[0].filename } });
                }
                update();
                res.status(200).json({
                    success: {
                        msg: "recipe modified"
                    }
                });
            }
        } else {
            
            async function update() {
                await Recipe.updateOne({ _id: id }, { $set: { ...req.body } });
            }
            update();
            res.status(200).json({
                success: {
                    msg: "recipe modified"
                }
            })
        }
    } catch (err) {
        res.status(500).json({
            errors: {
                recipe: {
                    msg: err.message
                }
            }
        });
    }
}

// GET USER BY ID

const getRecipeById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.findOne({ _id: id });
        res.status(200).json(recipe);
    } catch (err) {
        res.status(500).json({
            errors: {
                recipe: {
                    msg:err.message
                }
            }
        })
    }
}

// GET PENDING USER

const getPendingRecipe = async (req,res,next) => {
    try {
        const recipes = await Recipe.find({ status: "pending" });
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({
            errors: {
                recipe: {
                    msg: 'err.message'
                }
            }
        });
    }
}

// DELETE RECIPE

const deleteRecipe = async (req,res,next) => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.findOne({ _id: id });
        if (recipe.image) {
            unlink(
                path.join(__dirname, `./../../mern/public/${recipe.image}`),
                (err) => {
                    if (!err) {
                        async function remove (){
                            await Recipe.deleteOne({ _id: id });
                            unlink(
                                path.join(__dirname, `./../../myapp/public/${recipe.image}`),
                                (err2) => {
                                    if (!err2) {
                                        res.status(200).json({
                                            success: {
                                                msg: "recipe deleted successfully"
                                            }
                                        });
                                    }
                                }
                            );
                        };
                        remove();
                    }
                }
            )
        } else {
            async function remove() {
                await Recipe.deleteOne({ _id: id });
                res.status(200).json({
                    success: {
                        msg: "recipe deleted successfully"
                    }
                });
            }
            remove();
        }
    } catch (err) {
        res.status(500).json({
            errors: {
                recipe: {
                    msg: err.message
                }
            }
        });
    }
}

// SEARCH RECIPE

const searchRecipe = async (req,res,next) => {
    const { title } = req.params;
    const title_search_regex = new RegExp(title, "i");
    try {
        const recipes = await Recipe.find({ title: title_search_regex });
        res.status(200).json(recipes)
    } catch (err) {
        res.status(500).json({
            errors: {
                recipe: {
                    msg: err.message
                }
            }
        });
    }
}

module.exports = {
    getRecipe,
    shareRecipe,
    approveRecipe,
    modifyRecipe,
    getRecipeById,
    deleteRecipe,
    getPendingRecipe,
    searchRecipe
}