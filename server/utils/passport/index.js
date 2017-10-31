import  { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'

let admin = {
	id: 'JGO2017*',
	pwd: bcrypt.hashSync('Cdo_2017*', bcrypt.genSaltSync(), null),
	userName: 'ofertadeo@gmail.com'
}


export default function(passport) {
	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
      done(null, admin);
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
	    },
	    function(req, email, password, done) { // callback with email and password from our form

				// if no user is found, return the message
	      if (admin.userName !== email) {
	      	return done(null, false, req.flash('loginMessage', 'Usuario no existe.')); // req.flash is the way to set flashdata using connect-flash
	      }

	      // if the user is found but the password is wrong
	      if (!bcrypt.compareSync(password, admin.pwd)) {
	      	return done(null, false, req.flash('loginMessage', 'Contraseña incorrecta')); // create the loginMessage and save it to session as flashdata
	      }
	      

	      // all is well, return successful user
	      return done(null, admin);
    }));

};