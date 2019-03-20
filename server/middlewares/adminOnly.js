function adminOnly(req, res, next) {
  const { user } = req.user;

  if (user.role != "admin") {
    return next({ status: 403 });
  }
  next();
};

module.exports = adminOnly;
