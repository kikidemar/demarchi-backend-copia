const notFoundHandler = (req, res, next) => {
  console.log(`not found ${req.method} ${req.url}`)
  return res.json ({
    status: 404,
    method: req.method,
    path: req.url,
    response: 'not found'
  })
}

export default notFoundHandler