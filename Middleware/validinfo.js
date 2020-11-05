module.exports = (req,res,next) => {
    const {email, user_name, user_password} = req.body;

    function validEmail(email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    if(req.path === "/register"){
        console.log(!email.length);
        if(![email, user_name, user_password].every(Boolean)){
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    } 
    
    else if (req.path === "/login"){
        if(![email, user_password].every(Boolean)){
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(email)){
            return res.status(401).json("Invalid Email");
        }
    }

    next();
};