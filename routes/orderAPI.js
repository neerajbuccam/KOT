var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://127.0.0.1:27017/magzika');

//Get Orders
router.get('/order', function(req, res, next){
    db.orders.find().sort({dateCreated: -1}, function(err, orderItems){
        if(err){
            res.send(err);
        }
        res.json(orderItems);
    });
});

//Get Order Titles
router.get('/orderTitleSearch/:word', function(req, res, next){
    var orderTitles = [];

    db.orders.aggregate([{"$unwind": "$tableTitle"}, {"$match": {"tableTitle": { $regex: '[ ]?'+req.params.word, $options: "i" }} }, {"$group": {"_id": "$tableTitle"} }], function(err, orderItems){
        if(err){
            res.send(err);
        }
        orderItems.forEach(function(data){
            orderTitles.push(data._id);
        });

        res.json(orderTitles);
    });
});

//Get Active Orders
router.get('/orderActive', function(req, res, next){
    db.orders.find({"closeStatus": false}).sort({dateCreated: -1}, function(err, orderItems){
        if(err){
            res.send(err);
        }
        res.json(orderItems);
    });
});

//Get Cleared Orders
router.get('/orderCleared', function(req, res, next){
    db.orders.find({"closeStatus": true}).sort({dateClosed: -1}, function(err, orderItems){
        if(err){
            res.send(err);
        }
        res.json(orderItems);
    });
});

//Get order
router.get('/order/:id', function(req, res, next){
    db.orders.findOne({"_id": mongojs.ObjectId(req.params.id)}, function(err, orderItem){
        if(err){
            res.send(err);
        }
        res.json(orderItem);
    });
});

//Get filtered orders
router.post('/search', function(req, res, next){
	var filter = req.body;
	var query = {};
	
	if(filter.table != '')
		query.table = filter.table;
	
	if(filter.tableTitle != '')
		query.tableTitle = { $regex: '[ 0-9a-zA-Z]?'+filter.tableTitle+'[ 0-9a-zA-Z]?', $options: "i" };
	
	if(filter.date.year)
		query['dateCreated.year'] = filter.date.year;
	
	if(filter.date.month)
		query['dateCreated.month'] = filter.date.month;
	
	if(filter.date.date)
		query['dateCreated.date'] = filter.date.date;
	
	db.orders.find(query).sort({dateCreated: -1}, function(err, orders){
		if(err){
			res.send(err);
		}
		res.json(orders);
	});
});

//Get Monthly Sales
router.get('/monthlySales', function(req, res, next){
	db.orders.aggregate([{ $group: {"_id": {year: "$dateCreated.year", month: "$dateCreated.month"}, grandTotal: { $sum: "$grandTotal"}} }, {$sort: {_id: 1}}], function(err, salesData){
        if(err){
            res.send(err);
        }
        res.json(salesData);
    });
});

//Get Daily Sales
router.get('/dailySales', function(req, res, next){
	db.orders.aggregate([{ $group: {"_id": {year: "$dateCreated.year", month: "$dateCreated.month", date: "$dateCreated.date"}, grandTotal: { $sum: "$grandTotal"}} }, {$sort: {_id: 1}}], function(err, salesData){
        if(err){
            res.send(err);
        }
        res.json(salesData);
    });
});

//Add Order
router.post('/order', function(req, res, next){
    var order = req.body;
    var validErr;
    
    if(order.table == ''){
        validErr = { msg: "Select Table for this order"};
        
        res.status = (400);
        res.json(validErr);
    }
    
    order.orderItems.forEach(function(item){
        if(item.itemName == '' || item.qty < 1 || order.grandTotal < 1){
            validErr = { msg: "Insufficient Items Data for this order"};
            
            res.status = (400);
            res.json(validErr);
        }
    }, order);
    
    if(typeof(validErr) == 'undefined'){
        db.orders.insert(order, function(err, order){
            if(err){
                res.status = (400);
                res.json(err);
            }
            else{
                res.json(order);
            }
        });
    }
});

//Update Order
router.put('/order/:id', function(req, res, next){
    var order = req.body;
    var updOrder = {};
    var validErr = [];
    
    if(order.table == '' || order.orderItems.length < 1){
        res.status = (400);
        res.json({
            "msg": "Incomplete Data for this order"
        });
    }
    else{
        updOrder.table = order.table;
        updOrder.tableTitle = order.tableTitle;
        updOrder.orderItems = order.orderItems;
        updOrder.grandTotal = order.grandTotal;
        updOrder.cashTendered = order.cashTendered;
        updOrder.amtDue = order.amtDue;
        updOrder.closeStatus = order.closeStatus;
        updOrder.dateCreated = order.dateCreated;
        
        db.orders.update({"_id": mongojs.ObjectId(req.params.id)}, updOrder, {}, function(err, order){
            if(err){
                res.send(err);
            }
            res.json(order);
        });
    }
});

//Update Amt Due
router.put('/orderAmtDue/:id', function(req, res, next){
    var order = req.body;
    var validErr;
    
    if(order.AmtDue == ''){
        res.status = (400);
        validErr = { "msg": "Invalid Due Amount" };
    }
    else{
        db.orders.update({"_id": mongojs.ObjectId(req.params.id)}, {$set:{'cashTendered': order.cashTendered, 'amtDue': order.amtDue }}, {}, function(err, order){
            if(err){
                res.send(err);
            }
            res.json(order);
        });
    }
});

//Update Close Order
router.put('/orderCloseOrder/:id', function(req, res, next){
    var order = req.body;
    
    db.orders.update({"_id": mongojs.ObjectId(req.params.id)}, {$set:{'closeStatus': true, 'dateClosed': order.dateClosed }}, {}, function(err, order){
        if(err){
            res.send(err);
        }
        res.json(order);
    });
});

//Delete Order
router.delete('/order/:id', function(req, res, next){
    db.orders.remove({"_id": mongojs.ObjectId(req.params.id)}, function(err, order){
        if(err){
            res.send(err);
        }
        res.json(order);
    });
});

module.exports = router;