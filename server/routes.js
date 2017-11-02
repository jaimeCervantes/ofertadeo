export default function (app, passport) {

	let loginPath = '/ofer-admin/login'
	let adminPath = '/ofer-admin'
	let logoutPath = '/ofer-admin/logout'
		// process the login form
	app.post(loginPath + '/?', passport.authenticate('local-login', {
		successRedirect : adminPath, // redirect to the secure profile section
		failureRedirect : loginPath, // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// ofer-admin SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get(adminPath + '*', isLoggedIn);

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get(logoutPath +'/?', function(req, res) {
		req.logout();
		res.redirect(loginPath);
	})


	// route middleware to make sure
	function isLoggedIn(req, res, next) {

		// if user is authenticated in the session, carry on
		if (req.isAuthenticated() || /^\/ofer-admin\/login\/{0,1}$/i.test(req.path)) {
			return next();
		}

		// if they aren't redirect them to the home page
		res.redirect(loginPath);
	}
}