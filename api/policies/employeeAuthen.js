module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.session.authenticated && (req.session.user_role == "5" || req.session.user_role == "0")  ) {
    next()
  }else{
    res.redirect('/login');
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  // return res.forbidden('You are not permitted to perform this action.');
};