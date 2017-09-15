if (process.env.NODE_ENV === 'production') {
	module.exports = require('./dashboardActions.prod');
} else {
	module.exports = require('./dashboardActions.dev');
}
