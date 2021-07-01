module.exports = class UserDto {

  constructor(model) {
    this.email = model.email
    this.id = model.id
    this.isActivated = model.isActivated
    this.isTeacher = model.isTeacher
    this.isAdmin = model.isAdmin
    this.name = model.name
    this.middlename = model.middlename
    this.surname = model.surname
  }
}