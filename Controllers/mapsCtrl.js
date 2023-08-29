const path = require('path');

function getUsersMap(req,res){
    res.sendFile(path.join(__dirname, '..', 'View', 'googleMapsUser.html'));
}

function getAdminMap(req,res){
    res.sendFile(path.join(__dirname, '..', 'View', 'googleMaps.html'));
}


function fetchAPI(req,res){
    const googleApiKey = process.env.GOOGLE_MAPS_API_KEY;
    res.json({ apiKey: googleApiKey });
}

module.exports = {getAdminMap,getUsersMap,fetchAPI};