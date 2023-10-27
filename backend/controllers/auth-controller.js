const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");
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
        res.json({hash: hash});
    }
}


module.exports = new AuthController();