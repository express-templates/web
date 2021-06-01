exports.get = (req, res, next) => {
  res.render("index", { title: "Hello express" });
}