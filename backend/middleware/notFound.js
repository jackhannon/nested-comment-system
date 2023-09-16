const notFound = async (req, res) => {
  res.status(404).send("invalid path")
}
export { notFound }