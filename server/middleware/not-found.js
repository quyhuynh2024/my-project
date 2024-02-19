const notFoundMiddleware = (req, res) => {
  res.status(404).send("routes does not exist");
};
export default notFoundMiddleware;
