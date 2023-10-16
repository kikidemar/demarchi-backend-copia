class UserDTO {
  constructor(user) {
    this._id = user._id;
    this.name = user.name;
    this.last_name = user.last_name;
    this.full_name = user.name + " " + user.last_name;
    this.email = user.email;
    this.role = user.role;
    this.cid = user.cid;
  }
}

export default UserDTO;
