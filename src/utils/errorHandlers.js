export function globalErrorHandler (error, request, response, next) {
  // console.log(error)

  return response
    .status(402)
    .json({
      message: 'Something went wrong'
    })
    .end(error)
}
