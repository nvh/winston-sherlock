# winston-sherlock

A [sherlock](https://github.com/qualiancy/sherlock) transport for [winston](https://www.npmjs.org/package/winston).

## Getting Started
Install the module with: `npm install winston-sherlock`

Save it to your package.json with `npm install winston-sherlock --save`

```javascript
var winston   = require('winston');
var Sherlock  = require('winston-sherlock').Sherlock;
winston.add(Sherlock, options);

winston.debug("Debug message");
```
This transport will try to figure out what the file was from which the log function was called and create a sherlock scheme from it, but you can give it a specific filename like this:

```javascript
winston.debug("Debug message", {__filename: __filename});
```

## Contributing
Compile the coffeescript source with `grunt coffee`

In lieu of a formal styleguide, take care to maintain the existing coding style.

## Release History
0.1.0 First public release

## License
Copyright (c) 2014 Niels van Hoorn  
Licensed under the MIT license.
