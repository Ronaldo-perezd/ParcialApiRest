const route = require('express').Router()

const path = require('path')

route.get('/',(req,res)=>res.sendFile(path.join(__dirname,'../views/index.html')))

route.get('/getAddDish',(req,res)=>res.sendFile(path.join(__dirname,'../views/add-dish.html')))

/*route.delete('/:dishId', (req, res) => {
    const dishId = req.params.dishId;    
    res.json({ state: true, data: Dish with ID ${dishId} deleted successfully });
});*/

module.exports = route