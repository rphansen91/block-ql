const generic = templateType('generic')
const quickReply = (title, payload) => ({ content_type: "text", title, payload: payload || title })
const postbackBtn = (title, payload) => buttonType('postback')({ title, payload })
const urlBtn = (title, url) => buttonType('web_url')({ title, url })

function templateType (template_type, elementCb=(v=>v)) {
  return function (elements) {
    return attach(Object.assign({},
      template(),
      payload({
        template_type,
        elements: [].concat(elements).map(elementCb)
      })
    ))
  }
}

function buttonType (type) {
  return function (btn) {
    return Object.assign({ type }, btn)
  }
}

function element (title, subtitle, image_url, buttons) {
  let el = {}
  if (title) el.title = title
  if (subtitle) el.subtitle = subtitle
  if (image_url) el.image_url = image_url
  if (buttons) el.buttons = buttons
  return el
}

function payload (p) {
  return { payload: p }
}

function template () {
  return { type: 'template' }
}

function attach (attachment) {
  return { attachment }
}

function addQrs (quick_replies) {
  return function (obj) {
    return Object.assign({}, obj, { quick_replies })
  }
}

module.exports = {
  generic,
  element,
  postbackBtn,
  urlBtn,
  quickReply,
  addQrs
}
