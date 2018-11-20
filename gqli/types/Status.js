function Status () {}

Status.prototype.typing = () =>
`type Status {
	version: Int
	protocolversion: Float
	blocks: Int
	timeoffset: Int
	connections: Int
	proxy: String
	difficulty: Float
	relayfee: Float
	errors: String
	network: String
}`

module.exports = Status
