const axios = require("axios");
const debug = require("debug")("app:debug");
const sendGrid = require("@sendgrid/mail");
sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

// SendGrid templates
const templates = {
  password_reset_request : "d-c564b62c8243444bbc5eaf7787e7db7a",
   account_registration : "d-bea9f8418a5a468a87682729c4f1e41a",

};
class EmailService{
    constructor(){
        this.from  = process.env.SENDGRID_EMAIL
    }

    async sendEmail(data) {
        debug(data)
    
        const msg = {
          to: data.to,
          from: process.env.SENDGRID_EMAIL,
          templateId: templates[data.template_name],
    
          dynamic_template_data: {
            first_name: data.name,
            code: data.code,
    
         }
        };
    
        console.log("SENDGRID", msg)
        const ss =  await  sendGrid.send(msg)
          .then(() => {
              console.log("SENT")
                return {data: "Email sent successfully"};
          }).catch(error=> {
                return {error: error};
            });
        const {sendgrid_data, error} = ss;
        if(error) {
          console.log("ERROR", error.response.body)
          return {error: error.response.body};
        };
    
        return {sendgrid_data};
    }
}
module.exports = (new EmailService())