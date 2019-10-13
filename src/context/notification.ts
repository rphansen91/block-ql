const aws = require("aws-sdk");
const nodemailer = require("nodemailer");

const to = process.env.RECIPIENTS || "";
const email = process.env.EMAIL || "";
const from = process.env.FROM || email;
const password = process.env.PASSWORD || "";
const options = getTransportOptions(email, password);

export function createTransport() {
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


function genArticleTemplate (article) {
    return `<div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid;">
        <img src="${article.urlToImage}" alt="${article.title}" style="max-width: 100%;" />
        <h4>${article.title}</h4>
        <p>${article.description}</p>
        <a href="${article.url}"><button>Read More</button></a>
        <a href="${process.env.SERVER_URI}/articles/activate/${article.publishedAt}"><button>Activat Now (On by default)</button></a>
        <a href="${process.env.SERVER_URI}/articles/deactivate/${article.publishedAt}"><button>Deactivate Now</button></a>
        <a href="${process.env.SERVER_URI}/articles/post/${article.publishedAt}"><button>Publish To Social</button></a>
    </div>`
}

export function sendPublicationNotifications (subject, articles) {
    if (!articles || !articles.length) return
    const html = (articles || []).reduce((acc, article) => {
        return `${acc}${genArticleTemplate(article)}`
    }, `<h1>${subject}</h1>`)
    return createTransport().send({
        subject,
        html
    })
}