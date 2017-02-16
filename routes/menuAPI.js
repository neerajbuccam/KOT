var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://127.0.0.1:27017/magzika');

//Get Menu Items
router.get('/menu', function(req, res, next){
    db.menu.find(function(err, menuItems){
        if(err){
            res.send(err);
        }
        res.json(menuItems);
    });
});

//Get Menu Item
router.get('/menu/:id', function(req, res, next){
    db.menu.findOne({"_id": mongojs.ObjectId(req.params.id)}, function(err, menuItem){
        if(err){
            res.send(err);
        }
        res.json(menuItem);
    });
});

//Add Menu Items
router.post('/menu', function(req, res, next){
    var menu = req.body;
    var validErr = [];
    
    menu.forEach(function(item, index){
        if((!item.name || item.name == '') && (!item.price || item.price == '')){
            validErr.push({
                "item": item.name,
                "msg": "Incomplete Data for "+(index+1)+" Item Name: "+item.name
            });
        }
    });
    
    if(validErr.length > 0){
        res.status = (400);
        res.json(validErr);
    }
    else{
        db.menu.insert(menu, function(err, menus){
            if(err){
                res.status = (400);
                res.json(err);
            }
            else{
                res.json(menus);
            }
        });
    }
});

//Update Menu Item
router.put('/menu/:id', function(req, res, next){
    var menu = req.body;
    var updMenuItem = {};
    var validErr = [];
    
    if((!menu.name || menu.name == '') && (!menu.price || menu.price == '')){
        res.status = (400);
        res.json({
                "item": menu.name,
                "msg": "Incomplete Data for "+(index+1)+" Item Name: "+menu.name
            });
    }
    else{
        updMenuItem.name = menu.name;
        updMenuItem.price = menu.price;
        if(menu.prepareTime){
            updMenuItem.prepareTime = menu.prepareTime;
        }
        
        db.menu.update({"_id": mongojs.ObjectId(req.params.id)}, updMenuItem, {}, function(err, menu){
            if(err){
                res.send(err);
            }
            res.json(menu);
        });
    }
});

//Delete Menu Item
router.delete('/menu/:id', function(req, res, next){
    db.menu.remove({"_id": mongojs.ObjectId(req.params.id)}, function(err, menuItem){
        if(err){
            res.send(err);
        }
        res.json(menuItem);
    });
});

//Search Menu Items
router.get('/menuSearch/:word', function(req, res, next){
    db.menu.createIndex( { name: "text" } );
    db.menu.find({name: { $regex: '[ 0-9]?'+req.params.word, $options: "i" }}, function(err, menuItem){
        if(err){
            res.send(err);
        }
        res.json(menuItem);
    });
});

module.exports = router;