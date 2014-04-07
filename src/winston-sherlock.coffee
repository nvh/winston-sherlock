winston = require 'winston'
sherlock = require 'sherlock'


class Sherlock extends winston.Transport
  constructor: (options) ->
    @name = 'sherlockLogger'
    @level = options.level || 'info';
    @type = options.type

  getCallingFileName: ->
    err = new Error()
    lines = err.stack.split('\n')
    for line in lines
      if new RegExp(process.cwd()).test(line) and !/(Sherlock|node_modules)/.test(line)
        regex = new RegExp(".*#{process.cwd()}/([^\\.]+)\\.\\w+:.*")
        file = line.replace(regex,'$1')
        return file
    return undefined

  log: (level, msg, meta, callback) ->
    filename = @getCallingFileName() || meta?.__filename?.replace(__dirname + '/','').replace('.coffee','')
    name = filename.replace('/',':','g')
    delete meta['__filename']
    name ?= 'unknown'
    debug = sherlock("#{@type}:#{level}:#{name}")
    if Object.keys(meta).length > 0
      debug(msg,meta)
    else
      debug(msg)
    callback(null, true)

module.exports.Sherlock = winston.transports.Sherlock = Sherlock