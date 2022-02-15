module.exports = async (err, req, res, next) => {
  if (res.headerSend) next(err);
  res.status(err.code || 500);
  if (!err.code) console.log(err);
  res.json({ message: err.message || "Something failed." });
};
