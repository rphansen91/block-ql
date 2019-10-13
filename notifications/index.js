const createTransport = require('../resource/mail')

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

function sendPublicationNotifications (subject, articles) {
    if (!articles || !articles.length) return
    const html = (articles || []).reduce((acc, article) => {
        return `${acc}${genArticleTemplate(article)}`
    }, `<h1>${subject}</h1>`)
    return createTransport().send({
        subject,
        html
    })
}

module.exports = {
    sendPublicationNotifications
}