const ensureLogin = (req, res, next) => {
  if (req.session.isLoggedIn && req.session.user !== undefined) {
    next();
  } else {
    return res.render('login', { layout: false, errorMsg: 'You must login first to view dashboard' });
  }
};

module.exports = {
  ensureLogin,
};
