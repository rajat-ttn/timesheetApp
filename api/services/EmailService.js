/**
 * Created by pawangoyal on 12/09/17.
 */
/**
 * Created by ttnd on 8/9/17.
 */

const nodemailer = require("nodemailer")
    , smtpTransport = nodemailer.createTransport(sails.config.smtpConfig)
    , fs = require('fs')
    ;

module.exports = {
    sendEmail: function (payload) {
        sails.log.info("sending email");
        var mailOptions = {
            from: 'MaxLife <'+payload.fromEmail+'>',
            to: payload.to,
            subject: payload.subject,
            html: `<html><head></head><body>${ payload.message }</body></html>`,
            attachments: [{
                path: sails.config.documentsPath +payload.fileName
            }
            ]
        };
        return smtpTransport.sendMail(mailOptions);
    }
}

