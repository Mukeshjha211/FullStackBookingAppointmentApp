const path = require('path');

const express = require('express');
const User = require('./models/User');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

var cors = require('cors');

const sequelize= require('./util/database');

const { error } = require('console');

const app = express();
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', 'views');

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
// const { Json } = require('sequelize/types/utils');
// const sequelize = require('./util/database');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.post('/user/add-user', async(req,res, next)=>{

    try{

        if(!req.body.contactNo){
            throw new Error(
                'Phone number is Mandatory'
            )
        }
    const username = req.body.username;
    const email = req.body.email;
    const contactNo = req.body.contactNo;

    const data = await User.create({
        username: username, email: email, contactNo: contactNo
    });
    res.status(201).json({newUserDetail: data})
}catch(err){
    console.log(err, 'Post Request is not working');
    res.status(500).json({
        
        error:err
    })
}
})


app.get('/user/get-users', async(req,res,next)=>{
    try{
    const users = await User.findAll();
    res.status(200).json({allUsers: users});
    }catch(error){
        console.log('Get user is failing');
        res.status(500).json({error:error})
    }

})

app.delete('/user/delete-user/:id', async(req,res)=>{
    try{
        if(req.params.id == 'undefined'){
            console.log('ID is missing');{
            return res.status(400).json({err:'ID is missing'})
            }
const uId = req.params.id;
await User.destroy({where:{id:uId}});
res.sendStatus(200);
}
    }
        catch(err){
            console.log(err);
            res.status(500).json(err)}
})
// app.use(errorController.get404);

sequelize
.sync()
.then(result =>{
    // console.log(result)
    app.listen(3000);
})
.catch(err =>{
    console.log(err)
});

