// import useBasename from 'history/lib/useBasename.js'
var useBasename = require('history/lib/useBasename.js');

// This helper is for setting basename on examples with minimal boilerplate. In
// an actual application, you would build a custom history to set basename.
module.export = function withExampleBasename(history, dirname) {
    return useBasename(() => history)({ basename: `/${dirname}` })
}