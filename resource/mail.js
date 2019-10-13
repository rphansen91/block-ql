const aws = require("aws-sdk");
const nodemailer = require("nodemailer");

const to = process.env.RECIPIENTS || "";
const email = process.env.EMAIL || "";
const from = process.env.FROM || email;
const password = process.env.PASSWORD || "";
const options = getTransportOptions(email, password);

module.exports = function createTransport() {
  try {
    const transporter = nodemailer.createTransport(options);
    return {
      send: mailOptions => {
        const opts = Object.assign(
            {
              from,
              to
            },
            mailOptions
          )
        console.log(opts)
        return new Promise((res, rej) =>
          transporter.sendMail(
            opts,
            (err, info) => {
              if (err) {
                rej(err);
              } else {
                res(info);
              }
            }
          )
        );
      }
    };
  } catch (e) {
    console.log('nodemailer transport', e)
    return {
      send: () => {
        console.warn("Nodemailer configured incorrectly", e.message);
        return Promise.resolve(false);
      }
    };
  }
};

function getTransportOptions(user, pass) {
  if (user && pass) {
    console.log(`Using gmail service, user: ${user}`);
    return {
      service: "gmail",
      auth: {
        user,
        pass
      }
    };
  } else {
    console.log(`Using SES`);
    const SES = new aws.SES({
        apiVersion: '2010-12-01',
        sendingRate: 1
    });
    return { SES };
  }
}
