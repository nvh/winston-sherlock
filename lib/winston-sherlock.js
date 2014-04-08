(function() {
  var Sherlock, sherlock, winston,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  winston = require('winston');

  sherlock = require('sherlock');

  Sherlock = (function(_super) {
    __extends(Sherlock, _super);

    function Sherlock(options) {
      this.name = 'sherlockLogger';
      this.level = options.level || 'info';
      this.type = options.type;
    }

    Sherlock.prototype.getCallingFileName = function() {
      var err, file, line, lines, regex, _i, _len;
      err = new Error();
      lines = err.stack.split('\n');
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        if (new RegExp(process.cwd()).test(line) && !/(Sherlock|node_modules)/.test(line)) {
          regex = new RegExp(".*" + (process.cwd()) + "/([^\\.]+)\\.\\w+:.*");
          file = line.replace(regex, '$1');
          return file;
        }
      }
      return void 0;
    };

    Sherlock.prototype.log = function(level, msg, meta, callback) {
      var debug, filename, name, _ref;
      filename = this.getCallingFileName() || (meta != null ? (_ref = meta.__filename) != null ? _ref.replace(__dirname + '/', '').replace('.coffee', '') : void 0 : void 0);
      name = filename != null ? filename.replace('/', ':', 'g') : void 0;
      delete meta['__filename'];
      if (name == null) {
        name = 'unknown';
      }
      debug = sherlock("" + this.type + ":" + level + ":" + name);
      if (Object.keys(meta).length > 0) {
        debug(msg, meta);
      } else {
        debug(msg);
      }
      return callback(null, true);
    };

    return Sherlock;

  })(winston.Transport);

  module.exports.Sherlock = winston.transports.Sherlock = Sherlock;

}).call(this);
