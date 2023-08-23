const path = require('path');
const bcrypt = require("bcryptjs");
const User = require("../Backend/models/User");
//----------------signUp page-----------------------//
function getSignUpPage(req, res) {
    res.sendFile(path.join(__dirname, '..', 'View', 'signUp.html'));
}

async function setNewUsser(req,res){
    const errorsArr = [];
    const fullname = req.body.fullname;
    const email = req.body.email;
    const password = req.body.password;
    console.log("email is: " + email);
    console.log("name is: " + fullname);
    console.log("PW is: " + password);
    
    let user = await User.findOne({ email });
    if (user) {
        console.log("already exists -> sign in");
        const errorResponse = { text: "User already exists" };
        return res.redirect(`/signup?error=${encodeURIComponent(JSON.stringify(errorResponse))}`);
    }
    if (/^[a-zA-Z\s]*[a-zA-Z][a-zA-Z\s]*$/.test(fullname) && fullname.includes(" ") && email.includes("@") && email.includes(".") && password.length >= 6 
    && password.length <= 12 && !(password.length === 0) ){
        const hasdPsw = await bcrypt.hash(password, 12);
        user = new User({
            fullname,
            email,
            password: hasdPsw,
            admin:false,
            listOfOrders: null
        });
        if(email == "lovton13@gmail.com"){
            user.admin = true;
        }
        await user.save();
        console.log("user was sucssefully created");
        const date = new Date(); 
        date.setDate(date.getDate() + 30); // set the cookie to expire in 30 days
        res.cookie("myCookie", "", { expires: new Date(date) }); 
        res.redirect("/signin");
    }else{
        console.log("User was not created");
		setTimeout(() => {
            return res.redirect("/signup");
        }, 2000);
       
    }
    
}
module.exports = {getSignUpPage,setNewUsser};