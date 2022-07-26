const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, `${process.env.SECRET_KEY}`);
    req.userId = data.id;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

module.exports = { authorization };