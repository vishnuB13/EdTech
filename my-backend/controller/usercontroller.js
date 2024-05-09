const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')
const mailHelper = require('../helper/mail')
const { file } = require('googleapis/build/src/apis/file/index.js')
const Course = require('../models/courseSchema')
const Category = require('../models/categorySchema')



// Landing Page of Website
const LandingPage = (req, res) => {
    res.json('Hi from Landing Page')
}

// User registration
const userRegister = async (req, res) => {

    try {
        let { name, email, password } = req.body
        const userAlreadyExist = await User.find({ email: email })
        if (userAlreadyExist.length == 0) {
            let hashedpassword = await bcrypt.hash(password, 10)
            let OTP = await mailHelper.sendOTPByEmail(email)
            if (OTP) { res.json({ otpsend: true, email, password: hashedpassword, OTP }) }
            else { res.json({ otpsend: false, email, password: hashedpassword, OTP }) }
        }
        else {
            res.json({ message: "user already registered" })
        }
    } catch (error) {
        res.json({ message: "Network error or catch error" })
        console.log(error, "errrrrrr")
    }
}

// User OTP verification
const verifyOtp = async (req, res) => {
    try {
        const secret_key = process.env.JWT_SECRET
        const { name, email, password, enteredOTP, generatedotp } = req.body
        if (enteredOTP === generatedotp) {
            let hashedpassword = await bcrypt.hash(password, 10)
            let newuser = new User({ name, email: email, password: hashedpassword })
            newuser.save()
            const accesstoken = jwt.sign(email, secret_key)
            res.json({ message: "Successfully registered", accesstoken: accesstoken })
        } else {
            res.json({ message: "Incorrect Otp" })
        }

    } catch (error) {
        res.json({ message: "error occured in registering" })
        console.log(error, "error occured")
    }
}

// User Otp Send
const sendOtp = async (req, res) => {
    try {
        const { email } = req.body
        let OTP = await mailHelper.sendOTPByEmail(email)
        res.json({ message: "Otp send successfully", OTP: OTP })

    } catch (error) {
        res.json({ message: "Otp send failed" })
    }
}

// Password Otp Verify
const passwordOtp = async (req, res) => {
    try {
        const secret_key = process.env.JWT_SECRET

        const { email, OTP, enteredOTP } = req.body
        if (enteredOTP === OTP) {
            let accesstoken = jwt.sign({ email: email }, secret_key)
            res.json({ message: "correct otp", accesstoken: accesstoken })
        }
        else {
            res.json({ message: "incorrect otp" })
        }
    } catch (error) {
        res.json({ message: "error occurred" })
    }
}

// Change Password
const changePassword = async (req, res) => {
    try {
        const { password, email } = req.body
        let user = await User.findOne({ email })
        if (user) {
            let hashedpassword = await bcrypt.hash(password, 10)
            user.password = hashedpassword
            await user.save()
            res.json({ message: "Successfully Changed" })
        } else {
            res.json({ message: "User Not Found" })
        }
    } catch (error) {
        console.log(error, "catch error in usercontroller changePassword")
    }
}


// User Otp Resend
const resendOtp = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const date = Date.now()
        let hashedpassword = await bcrypt.hash(password, 10)
        let OTP = await mailHelper.sendOTPByEmail(email)
        if (OTP) { res.json({ otpsend: true, email, password: hashedpassword, OTP, date }) }
        else { res.json({ otpsend: false, email, password: hashedpassword, OTP, date }) }
    } catch (error) {
        res.json({ message: "error occured in resending otp" })
        console.log(error, "error occured in resending otp")
    }
}

/*Fetching user details */
const getUserDetails = async (req, res) => {
    try {
        const secret_key = process.env.JWT_SECRET
        let email = req.user.email || req.user
        let role = req.user.role 
        console.log(role,"user roleeee")
        let user = await User.findOne({ email: email });
        if (user) {
            user.role=role
            res.json({ user,role });
        } else {
            res.json({ message: "No user found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error occurred in getting details" });
        console.log(error, "Error in getting user details");
    }
};


// User Login
const userLogin = async (req, res) => {
    try {
        const secret_key = 'secret key'
        let { email, password } = req.body
        let user = await User.findOne({ email: email })
        if (!user) {
            res.json({ message: "email not registered" })
        } else {
            let data = await bcrypt.compare(password, user.password)
            if (data) {
                let accesstoken = jwt.sign({email:email, role:'user'}, secret_key)
                res.json({ message: "Successfully Logged", accesstoken: accesstoken })
            }
            else {
                res.json({ message: "Invalid Password" })
            }
        }
    } catch (error) {
        console.log(error, "error in catch")
    }
}

// Google Sign in 
const googleSignIn = async (req, res) => {
    try {
        const secret_key = "secret key"
        const email = req.body.email
        const name = req.body.name
        let userAlreadyExist = await User.findOne({ email: email })
        if (userAlreadyExist) {
            const newtoken = jwt.sign({ email: email }, secret_key)
            res.json({ accesstoken: newtoken, name: userAlreadyExist.name })
        }
        else {
            const newUser = { email, name, password: "password" }
            let googleSign = await User.create(newUser);
            const accesstoken = jwt.sign({ email: email, role:'user' }, secret_key)
            const data = { "accesstoken": accesstoken, name: name }
            res.json(data)

        }
    } catch (error) {
        console.log(error, 'google error')
    }
}

// User Logout
const userLogout = async (req, res) => {
    try {
        const cookies = req.cookies
        for (const cookieName in cookies) {
            res.clearCookie(cookieName);
        }
        res.json({ message: "successfully logged out" })
    } catch (error) {
        res.json({ message: 'error in logout' })
    }
}

const showProfile = async (req, res) => {
    try {
        const userid = req.params.userid
        let user = await User.findOne({ "_id": userid })
        if (user) {
            console.log(user)
            res.json(user)
        }
        else { res.json({ message: "no profile matched" }) }
    } catch (error) {
        console.log(error, "error in show profile") 
        res.json("eroor")
    }
}

const profileEdit = async (req, res) => {
    try {
        const { name, email, gender, image, interests } = req.body
        const userid = req.params.userid
        const result = await User.updateOne({ "_id": userid }, { name, email, gender, image, interests });

        if (result.nModified === 0) {
            return res.status(404).json({ message: "User not found or no changes were made" });
        }
        return res.status(200).json({ message: "User updated successfully", result });
    } catch (error) {
        console.log(error, "error receiving data in put controller")
    }
}

const uploadPhoto = async (req, res) => {
    try {

        const newfile = req.file
        const userid = req.params.userid
        res.json({ message: "image selected", "imagepath": newfile.path })

    } catch (error) {
        console.log(error, "error in upload photo")
    }
}

const getCategories = async (req, res) => {
    try {
        let data = await Category.find({})
        res.json(data)
    } catch (error) {
        console.log(error, "error")
    }
}



module.exports = {
    LandingPage,
    userRegister,
    verifyOtp,
    resendOtp,
    passwordOtp,
    changePassword,
    userLogin,
    googleSignIn,
    getUserDetails,
    userLogout,
    showProfile,
    profileEdit,
    uploadPhoto,
    getCategories,
    sendOtp
}