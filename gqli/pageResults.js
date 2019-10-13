module.exports = function pages (prop, cb) {
  return function (obj, args={}, context, info) {
    const { limit, skip=0 } = args
    obj[prop] = (function (list=[]) {
      if (typeof limit === 'number') return list.slice(skip, skip + limit)
      return list.slice(skip)
    })(obj[prop])

    return cb(obj, args, context, info)
  }
}
