const Shop = require('../Backend/models/Shops');
async function addShops(req,res){
    const address = req.body.address;
    if(!address){
        return res.redirect("/adminMenu/Shops");
    }
    const latitude = req.body.lat;
    const longitude = req.body.lng;
    const photoURL = req.body.photoURL;
    
    let tmpShop = await Shop.findOne({address});
    if (tmpShop){
        console.log("Candys shop already in data")
        const errorResponse = { text: "Candys shop already exist" };
        return res.redirect(`/adminMenu/Shops?error=${encodeURIComponent(JSON.stringify(errorResponse))}`);
    }else{
        tmpShop = new Shop({
            address,
            latitude: latitude || 0,
            longitude: longitude || 0,
            photoURL
        });
        await tmpShop.save();
        res.redirect("/adminMenu/Shops");
    }
}

async function updateShops(req,res){
    const address = req.body.address;
    const url = req.body.url;
    const tmpShop = await Shop.findOne({"address":address});
    if (!tmpShop){
        console.log("Candys shop is not exist")
        const errorResponse = { text: "Shop not found" };
        return res.redirect(`/adminMenu/Shops?error=${encodeURIComponent(JSON.stringify(errorResponse))}`);
    }
    await Shop.findOneAndUpdate({"address":address},{$set:{"photoURL": url}},{new:true},(err,doc)=>{
        res.redirect("/adminMenu/Shops");
    });
}

async function deleteShops(req,res){
    const address = req.body.address.trim();
    try {
        const deletedShop = await Shop.findOneAndDelete({ address });
        if (deletedShop) {
            console.log('Shop deleted:', deletedShop);
            res.redirect('/adminMenu/Shops');
        } else {
            console.log('Shop not found');
            const errorResponse = { text: "Shop not found" };
            return res.redirect(`/adminMenu/Shops?error=${encodeURIComponent(JSON.stringify(errorResponse))}`);
        }
    } catch (error) {
        console.error('Error deleting shop:', error);
        res.status(500).send('Error deleting shop');
    }
}

async function showShops(req,res){
    const doc = await Shop.find({});
    res.json(doc);
}

//-------------show Data-----------------


module.exports = {addShops,updateShops,deleteShops,showShops};