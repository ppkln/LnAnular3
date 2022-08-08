const express = require("express");
const bcryptjs = require("bcryptjs");
let Member = require("../models/members");
let Product = require("../models/products");
const session = require("express-session")
const cookieParser = require("cookie-parser")
const { asyncScheduler, async } = require("rxjs");

const memberRoute = express.Router();

memberRoute.use(cookieParser());
memberRoute.use(session({
    secret:"mykeySessionLN",
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:30000}
}));


//add member
    const addMember = async memObj =>{
        const hash = await bcryptjs.hash(memObj.pwd,5);
        const memBer = new Member({
            e_mail:memObj.e_mail,
            pwd:hash,
            fname:memObj.fname,
            lname:memObj.lname,
            statusWork:memObj.statusWork
        });
        const data = await memBer.save(); 
        return data;
    }
memberRoute.route('/register').post((req,res,next)=>{
    console.log("ค่าของ req.body.e_mail = "+req.body.e_mail);
    let txts = req.body.e_mail;
    const e_mail = txts.toLowerCase();
    const pwd = req.body.pwd;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const statusWork=true;
    const memObj = {
        e_mail:e_mail,
        pwd:pwd,
        fname:fname,
        lname:lname,
        statusWork:statusWork
    };
    addMember(memObj)
    .then(data =>{
        console.log("เพิ่มข้อมูลสมาชิกใหม่ สำเร็จ (Successfully)");
        res.status(201).json(data);
    })
    .catch(err=>{
        console.log("Sorry บันทึกข้อมูลสมาชิกใหม่ ไม่สำเร็จ");
        res.status(500).json(err)
    }) 
})

//get Profile one member
memberRoute.route('/read-profile/:id').get((req,res,next)=>{
    Member.findById(req.params.id,(error,data)=>{
        if (error){
            console.log('ไม่พบข้อมูล id ของสมาชิก');
            return next(error)
        } else {
            console.log('เลข id ของสมาขิก : '+data._id);
            res.status(200).json(data);
        }
    })
});

//Update profile one member
memberRoute.route('/update-profile/:id').put((req,res,next)=>{
    Member.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },(error,data)=>{
        if (error){
            console.log('Update ข้อมูลของสมาชิกไม่สำเร็จ');
            return next(error)
        } else {
            console.log('เสร็จสิ้น Update ข้อมูลของสมาชิกเลข id ที่ : '+data._id);
            res.json(data);
        }
    })
});

//delete member
memberRoute.route('/delete-member/:id').delete((req,res,next)=>{
    Member.findByIdAndRemove(req.params.id,(error,data)=>{
        if (error){
            console.log('Delete ข้อมูลของสมาชิกไม่สำเร็จ');
            return next(error)
        } else {
            console.log('เสร็จสิ้น Delete ข้อมูลของสมาชิกเลข id ที่ : '+data._id);
            res.json(data);
        }
    })
});
//login
memberRoute.route('/login').post((req,res,next)=>{
    //ฟังก์ชัน checkLogin
    const checkLogin = async loginObj =>{
        const User = await Member.findOne({e_mail:loginObj.e_mail})
        if(!User){
            return {id:null, e_mail:null, LoginStatus:false}
        } else {
            const result = await bcryptjs.compare(loginObj.pwd,User.pwd)
            return {id:User._id, e_mail:User.e_mail, LoginStatus:result}
        }
    }
    console.log("e-mail ที่กรอกใน form ",req.body.e_mail)
    console.log("password ที่กรอกใน form ",req.body.pwd)
    if(!req.body.e_mail || !req.body.pwd){
        res.redirect('/login');
        return ;
    }
    //สร้างตัวแปล Object รับข้อมูล login ที่ผู้ใช้กรอกใน form
    const loginObj ={
        e_mail:req.body.e_mail,
        pwd:req.body.pwd
    }
    //เรียกใช้ checkLogin()
    checkLogin(loginObj)
    .then(result=>{
        console.log("ผ่านฟังก์ชัน checkLogin แล้ว")
        console.log("ค่าของ result ที่ผ่านฟังก์ชัน checkLogin ="+result)
        console.log("ค่าของ result.e_mail = "+result.e_mail)
        if(result.LoginStatus == true){
            //สร้างตัวแปล session 
            req.session.userId = result.id
            req.session.e_mail = result.e_mail
            req.session.LoginStatus = result.LoginStatus
            req.session.cookie.maxAge= 120000 //อายุของ session
            console.log("req.session.e_mail ของผู้ใช้ที่ถูกสร้าง : "+req.session.e_mail)
            console.log("การ Login : ผ่าน (member.route.js)")
            console.log(req.session)
            console.log("ผ่านการ Login")
            const sessLogin={
                sessionUserID:req.session.userId,
                sessionUserName:req.session.e_mail,
                sessionLoginStatus:req.session.LoginStatus
            }
            res.status(200).json(sessLogin);
        } else{
            console.log("Login ไม่ผ่าน เพราะค่าของ result.LoginStatus = ",result.LoginStatus)
            const sessLogin={
                sessionUserID:null,
                sessionUserName:null,
                sessionLoginStatus:false
            }
            res.status(500).json(sessLogin);
        }
    })
    .catch(err=>{
        console.log("เกิด error ในขั้นตอน Login (member.route.js) : "+ err)
    });
});

// get root
memberRoute.route('').get((req,res,next)=>{
   //res.status(200).redirect("404.html");
   res.send(" ระบุ URL ไม่ถูกต้อง ")
});


// ******** Section Products Management ************

// --- Add product ---
const addProduct = async productObj =>{
    console.log("productObj.product_description = "+productObj.product_description)
    const proDuct = new Product({
        product_id:productObj.product_id,
        product_name:productObj.product_name,
        product_price:productObj.product_price,
        product_description:productObj.product_description
        });
        const data = await proDuct.save();
        console.log("data หลังคำสั่ง proDuct.save() = "+data)
        return data;
}
memberRoute.route('/add-product').post((req,res,next)=>{
    //ตรวจสอบว่ายังสิทธิ์เข้าใช้งานคำสั่งนี้หรือไม่ (login) 
    if(1==2){
        console.log("มาถึง method post ไฟล์ member.route.js ส่วนของลิงค์ /add-product")
        console.log("ค่าของ req.body.productId : "+req.body.productId)
        let proId=req.body.productId;
        let productId = req.body.productId;
        let productName = req.body.productName;
        let productPrice = req.body.productPrice;
        let productDescription = req.body.productDescription;
        let productObj = {
            product_id : productId,
            product_name : productName,
            product_price : productPrice,
            product_description:productDescription
        }
        addProduct(productObj)
        .then(data=>{
            console.log("เพิ่มข้อมูล Product ใหม่เข้า MongoDB สำเร็จ (Successfully)");
            res.status(201).json(data);
        })
        .catch(err=>{
            console.log("Sorry บันทึกข้อมูล Product เข้า MongoDB ไม่สำเร็จ");
            res.status(500).json(err)
        })
    } else {
        res.redirect('/login')
    }
});

// get all products
memberRoute.route('/read-product').get((req,res,next)=>{
    Product.find((error,data)=>{
        if(error){
            return next(error)
        } else {
            res.json(data);
        }
    })
})
//delete Product
memberRoute.route('/delete-product/:id').delete((req,res,next)=>{
    Product.findByIdAndRemove(req.params.id,(err,data)=>{
        if(err){
            console.log("ลบข้อมูลสินค้าไม่สำเร็จ");
            return next(err);
        } else {
            console.log("ลบข้อมูลสินค้าสำเร็จ (รหัสสินค้าคือ "+data.product_id+" )")
            res.status(200).json(data);
        }
    })
})


module.exports = memberRoute;