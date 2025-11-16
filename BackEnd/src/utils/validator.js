const validator=require('validator');
const validate=(data)=>{
    const mandatoryfield=['firstName','emailId','phoneNumber','password'];
    const IsAllowed=mandatoryfield.every((userValidation)=>Object.keys(data).includes(userValidation));
    if(!IsAllowed){
        throw new Error('Some fields are missing');
    }
    if(!validator.isEmail(data.emailId)){
        throw new Error('Invalid Email format');
    }
    if(!validator.isMobilePhone(data.phoneNumber)){
        throw new Error('Invalid phone number');
    }
    // if(!validator.isStrongPassword(data.password)){
    //     throw new Error('Really weak password');
    // }
}
module.exports=validate;