const fetch = require('node-fetch');
const cache = require('memory-cache');

module.exports = (url, opts, time) => {
  const reqId = url + JSON.stringify(opts)
  return Promise.resolve()
  .then(() => {
    const data = cache.get(reqId);
    if (data) {
      console.log("Using cache", reqId);
      return data;
    }

    return fetch(url, opts)
    .then((r) => r.json())
    .then((r) => {
      console.log("Caching", reqId);
      cache.put(reqId, r, time);
      return r;
    })
  })
}