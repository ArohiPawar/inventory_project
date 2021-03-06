const User=require("../models/User");
const {passwordCompare,jwtGen} =require("../utils/utils");

const signUp=(req,res)=>{
  const user=new User({
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      email:req.body.email,
      password:req.body.password,
      company:req.body.company
  })

  user.save().then(data=>{
      res.send(data)
  }).catch(err=>{
    res.json({
        message:err.message
    })
  })
}

const login=(req,res)=>{
    console.log('login');
    User.findOne({ email:req.body.email }).then(result=>{
    console.log('req.body.email');
    console.log(req.body.email);
        passwordCompare(result.password,req.body.password).then(data=>{

            if(data){
                jwtGen({username:result.email}).then(token=>{
                    res.json({
                        message:"Login success",
                        token:token,
                        user:result.user,
                        res:result,
                        id:result._id,
                        email:req.body.email
                    })
                })
            }
            else{
                res.json({
                    message:"Login Failed,Passwords Does Not Match",
                })
            }
        })
    }).catch(err=>{
        res.json({
            message:"No user Found !!"
        })
    })
  }

const profileUpdate = async(req,res) => {

    console.log('req')
    console.log(req.body)

    let getUser =await User.updateOne({_id:req.params.id},req.body);
    User.findOne({ email:req.body.email }).then(result=>{
        res.json({
            message:"Profile Updated !!",
            data:result
        })
    }).catch(err=>{
        res.json({
            message:"No user Found !!"
        })
    })
}

module.exports={
    signUp,
    login,
    profileUpdate
}