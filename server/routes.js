export default function (app, passport) {
		// process the login form
	app.post('/ofer-admin/login', passport.authenticate('local-login', {
		successRedirect : '/ofer-admin/', // redirect to the secure profile section
		failureRedirect : '/ofer-admin/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// ofer-admin SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/ofer-admin/*', isLoggedIn);

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/ofer-admin/logout', function(req, res) {
		req.logout();
		res.redirect('/ofer-admin/login');
	})
}


// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated() || req.path === '/ofer-admin/login') {
		return next();
	}

	// if they aren't redirect them to the home page
	res.redirect('/ofer-admin/login');
}