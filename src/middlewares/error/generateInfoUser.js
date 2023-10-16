const generateUserErrorsInfo = (user) => {
  return `One or more properties were incomplete or not valid.
  List of required properties:
  *name: need to be a String, received ${user.name}
  *last_name: need to be a String, received ${user.last_name}
  *email: need to be a String, received ${user.email}
  *password: need to be a String, received ${user.password}
  `
}

export default generateUserErrorsInfo