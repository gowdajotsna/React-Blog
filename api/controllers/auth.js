import db from "../db.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
export const register=(req,res)=>{
    console.log(req);
    // CHECK EXISTING USER
    const q="SELECT * from users WHERE email = ? OR username = ?"
    db.query(q,[req.body.email,req.body.name],(err,data)=>{
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("user already exists!")

        // Hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q="INSERT INTO users(`username`,`email`,`password`) VALUES (?) "
        const values=[req.body.username,
                      req.body.email,
                      hash
        ]
        // q:query, [values]=>passed values, returns(err,data)
        db.query(q,[values],(err,data)=>{
            if(err) return res.json(err)
            return res.status(200).json("user has been created")
        });


    
    });

}

export const login=(req,res)=>{
    // check user
    const q= "SELECT * FROM users WHERE username=?"
    db.query(q,[req.body.username], (err,data)=>{
        if (err) return res.json(err);
        if (data.length==0) return res.status(404).json("User not found!");
        // Check Password
        const isPasswordCorrect=bcrypt.compareSync(req.body.password, data[0].password);
        if(!isPasswordCorrect){
            return res.status(400).json("wrong username or password")
        }
            // sent a user information (userid ) that identifies us.
            // This token will be stored in a cookie and will check the user id on the post we are trying to delte if it matches with the user
        const token=jwt.sign({ id:data[0].id },"jwtkey");
        const{password,...other} =data[0]

        res.cookie("access_token",token, {
            // any script in the browser cannot reach this cookie directly ,only appi requests 
             httpOnly:true
        }).status(200).json(other)

         
    });
};

export const logout=(req,res)=>{
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out")
    
};