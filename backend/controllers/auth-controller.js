const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");
const userModel = require("../services/user-service");
const tokenService = require("../services/token-service");
const UserDto = require('../dtos/user-dto');

class AuthController{
    async sendOtp(req,res){
        const {phone} = req.body;
        if(!phone){
            res.status(400).json({message: 'PHONE filed required'});
        }

        const otp = await otpService.generateOtp();
        //hash the otp
        const ttl = 1000 * 60 * 2;          //ttl- time to leave
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data);

        try{
            // await otpService.sendBySms(phone, otp);   //this line commented only for sending otp on dummy number after testing we should uncomment this line
            return res.json({
                hash: `${hash}.${expires}`,
                phone,
                otp
            });
        }catch(err){
            console.log(err);
            return res.status(500).json({message:'OTP Send Failed.!'});
        }
    }

    async verifyOtp(req,res ){
        const { phone, otp ,hash }= req.body;
        if(!phone || !otp || !hash){
            return res.status(400).json({message:"All Fields Are Required.!"});
        }
        const [hashedOtp, expires] = hash.split(".");
        if(Date.now() > +expires){
            res.status(400).json({message:"OTP expired"});
        }

        const data = `${phone}.${otp}.${expires}`;
        const isValid = otpService.verifyOtp(hashedOtp, data)

        if(!isValid){
            res.status(400).json({message:"Invalid OTP.!"});
        }

        let user;
        try {
            user = await userModel.findUser({phone: phone});
            if(!user){
                user = await userModel.createUser({phone: phone});
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({message:"DB Error.!"});
        }
        console.log(user);

        const {accessToken, refreshToken} = tokenService.generateTokens({
            _id: user._id,
            activated: false,
        });

        await tokenService.storeRefreshToken(refreshToken, user._id);
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        const userDto = new UserDto(user);
        res.json({ user: userDto, auth: true});
    }
}


module.exports = new AuthController();