const User = require("../models/user.js");

module.exports.renderSignUpPage = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome To JustWander");
        res.redirect("/listings");
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }

}

module.exports.renderLoginPage = (req, res) => {
    if(req.isAuthenticated()){
       req.flash("success" , "You're Already Logged In");
       res.redirect("/listings"); 
    }
    res.render("users/login.ejs");
}

module.exports.login =  async (req, res) => {
    // We Are Saving The OriginalURL in Locals Because Passport Resets The property Of session After Authenticating
    req.flash("success", "Welcome Back, You're Successfully Logged In");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success" , "You're Logged Out!");
        res.redirect("/listings");
    });
}