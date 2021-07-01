const uuid = require('uuid')
const { User, Child, Feedback, Alert, Trial, Course, TimeTable, Filial, Gallery, Childschedule, Schedule, Task } = require('./db-service').models
const ApiError = require('../exceptions/api-error')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const viewDashboardService = require('./view-dashboard-service')
const helperService = require('./helper-service')
const UserDto = require('../dtos/user-dto')
const bcrypt = require('bcrypt')
const generator = require('../generator')

const Sequelize = require('sequelize')
const Op = Sequelize.Op

class UserService {

  async restore(email) {
    try {
      const userData = await User.findOne({where: {email}})
      if(!userData) {
        throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} не существует`)
      }
      const genPass = await generator.customPassword()
      const hashGenPass = await bcrypt.hash(genPass, 3)
      await User.update({password: hashGenPass},{where: {email}})
      userData.newPass = genPass
      await mailService.sendRestorePasswordMail(userData)
      return {message: 'На вашу почту был отправлен новый пароль для авторизации'}
    } catch (error) {
      throw ApiError.BadRequest(`Сбросить пароль не удалось`)
    }
  }

  async refresh(refreshToken) {
    if(!refreshToken) {
      throw ApiError.UnathorizedError()
    }
    const userData = tokenService.verifyRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if(!tokenFromDb || !userData) {
      throw ApiError.UnathorizedError()
    }
    const user = await User.findOne({where: {id: userData.id}})
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    const viewDashboard = await viewDashboardService.getSelectedView()
    const fullUserData = await helperService.getFullUserInfo(user.email)

    return {
      ...tokens,
      user: fullUserData,
      theme: viewDashboard
    }
  }

  async registration(email, password, phone, name) {
    const candidate = await User.findOne({
      where: {
        [Op.or]: [
          {
            email
          },
          {
            phone
          }
        ]
      }
    })
    if(candidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} или номером ${phone} уже существует`)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()
    console.log(name)
    const user = await User.create({email, password: hashPassword, activationLink, phone, name})
    await mailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`)
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})

    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  async activate(activationLink) {
    const user = await User.findOne({activationLink})
    if(!user) {
      throw ApiError.BadRequest('Неккоректная ссылка активации')
    }
    await User.update({isActivated: true}, {where: {id: user.id}})
  }

  async login(email, password) {
    const user = await User.findOne(
      {where: {email},
      include: [
        {
          model: Feedback
        },
        {
          model: Alert,
          attributes: ['id','type', 'message', 'check', 'createdAt', 'updatedAt']
        },
        {
          model: Child,
          attributes: ['id', 'phone', 'surname', 'name', 'middlename', 'profileimage', 'UserId', 'age'],
          include: [
            {
              model: Trial,
              attributes: ['id', 'check', 'name', 'phone', 'description', 'commit', 'createdAt', 'updatedAt', 'date'],
              include: [
                {
                  model: Course,
                  attributes: ['id', 'name', 'description', 'image']
                },
                {
                  model: TimeTable,
                  attributes: ['id', 'name', 'timestart', 'timefinish', 'day', 'maxsize', 'timelong', 'show'],
                  include: [
                    {
                      model: Filial,
                      attributes: ['id', 'name', 'image', 'addres', 'phone', 'description', 'coordsX', 'coordsY']
                    }
                  ]
                },
                {
                  model: User,
                  attributes: ['id', 'surname', 'name', 'middlename', 'email', 'phone', 'profileimage']
                }
              ]
            },
            {
              model: Course,
              attributes: ['id', 'name', 'description', 'image']
            },
            {
              model: Gallery,
              attributes: ['id', 'islike', 'name', 'description', 'image', 'format'],
              include: [
                {
                  model: Course,
                  attributes: ['id', 'name', 'description', 'image']
                }
              ]
            },
            {
              model: Childschedule,
              attributes: ['id'],
              include: [
                {
                  model: Course,
                  attributes: ['id', 'name', 'description', 'image']
                },
                {
                  model: Schedule,
                  attributes: ['id', 'date', 'commit', 'check'],
                  required: false,
                  include: [
                    {
                      model: User,
                      attributes: ['id', 'surname', 'name', 'middlename', 'email', 'phone', 'profileimage']
                    },
                    {
                      model: TimeTable,
                      attributes: ['id', 'name', 'timestart', 'timefinish', 'day', 'maxsize', 'timelong', 'show'],
                      include: [
                        {
                          model: Filial,
                          attributes: ['id', 'name', 'image', 'addres', 'phone', 'description', 'coordsX', 'coordsY']
                        }
                      ]
                    },
                    {
                      model: Task,
                      attributes: ['id', 'numbertask', 'name', 'description', 'linkdocs'],
                      include: [
                        {
                          model: Course,
                          attributes: ['id', 'name', 'description', 'image']
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              model: TimeTable,
              attributes: ['id', 'name', 'timestart', 'timefinish', 'day', 'show'],
              include: [
                {
                  model: Filial,
                  attributes: ['name']
                }
              ]
            },
          ]
        }
      ]
    })
    if(!user) {
      throw ApiError.BadRequest('Пользователь с таким email не найден')
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid) {
      throw ApiError.BadRequest('Неверный пароль')
    }
    if(!user.isActivated) {
      throw ApiError.BadRequest('Почта не была подтверждена')
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    const viewDashboard = await viewDashboardService.getSelectedView()
    
    return {
      ...tokens,
      user: user,
      theme: viewDashboard
    }
  }

  async logout(refreshToken) {
    if(!refreshToken) {
      throw ApiError.UnathorizedError()
    }
    const token = await tokenService.removeToken(refreshToken)
    return token
  }
  
  async passwordUpdate(password, id) {
    try {
      const result = await User.update({password},{where: {id}})
      return result
    } catch (error) {
      throw ApiError.BadRequest('Пароль изменить не удалось')
    }
  }

  async fullUpdateUser(user) {
    try {
      const result = await User.update({
        email: user.email, 
        name: user.name,
        surname: user.surname,
        middlename: user.middlename,
        profileimage: user.profileimage,
        phone: user.phone
      },{where: {id: user.id}})
      return result
    } catch (error) {
      throw ApiError.BadRequest('Пользователя отредактировать не удалось')
    }
  }
  async getAllUsersFyllInfo() {
    try {
      const users = await User.findAll({
        where: {
          isTeacher: 0,
          isAdmin: 0
        },
        attributes: ['id', 'surname', 'name', 'middlename', 'email', 'phone', 'profileimage'],
        include: [
          {
            model: Child,
            attributes: ['id', 'phone', 'surname', 'name', 'middlename', 'profileimage', 'UserId', 'age'],
            include: [
              {
                model: Course,
                attributes: ['id', 'name', 'description', 'image']
              }
            ]
          }
        ]
      })
      return users
    } catch (error) {
      throw ApiError.BadRequest('Пользователей получить не удалось')
    }
  }
  async allUserFullInfo(id) {
    try {
      const user = await User.findOne({
        where: {
          id
        },
        required: false,
        attributes: ['id', 'surname', 'name', 'middlename', 'email', 'phone', 'profileimage'],
        include: [
          {
            model: Feedback
          },
          {
            model: Alert,
            attributes: ['id','type', 'message', 'check', 'createdAt', 'updatedAt']
          },
          {
            model: Child,
            attributes: ['id', 'phone', 'surname', 'name', 'middlename', 'profileimage', 'UserId', 'age'],
            include: [
              {
                model: Trial,
                attributes: ['id', 'check', 'name', 'phone', 'description', 'commit', 'createdAt', 'updatedAt', 'date'],
                include: [
                  {
                    model: Course,
                    attributes: ['id', 'name', 'description', 'image']
                  },
                  {
                    model: TimeTable,
                    attributes: ['id', 'name', 'timestart', 'timefinish', 'day', 'maxsize', 'timelong', 'show'],
                    include: [
                      {
                        model: Filial,
                        attributes: ['id', 'name', 'image', 'addres', 'phone', 'description', 'coordsX', 'coordsY']
                      }
                    ]
                  },
                  {
                    model: User,
                    attributes: ['id', 'surname', 'name', 'middlename', 'email', 'phone', 'profileimage']
                  }
                ]
              },
              {
                model: Course,
                attributes: ['id', 'name', 'description', 'image']
              },
              {
                model: Gallery,
                attributes: ['id', 'islike', 'name', 'description', 'image', 'format'],
                include: [
                  {
                    model: Course,
                    attributes: ['id', 'name', 'description', 'image']
                  }
                ]
              },
              {
                model: Childschedule,
                attributes: ['id'],
                include: [
                  {
                    model: Course,
                    attributes: ['id', 'name', 'description', 'image']
                  },
                  {
                    model: Schedule,
                    attributes: ['id', 'date', 'commit', 'check'],
                    required: false,
                    include: [
                      {
                        model: User,
                        attributes: ['id', 'surname', 'name', 'middlename', 'email', 'phone', 'profileimage']
                      },
                      {
                        model: TimeTable,
                        attributes: ['id', 'name', 'timestart', 'timefinish', 'day', 'maxsize', 'timelong', 'show'],
                        include: [
                          {
                            model: Filial,
                            attributes: ['id', 'name', 'image', 'addres', 'phone', 'description', 'coordsX', 'coordsY']
                          }
                        ]
                      },
                      {
                        model: Task,
                        attributes: ['id', 'numbertask', 'name', 'description', 'linkdocs'],
                        include: [
                          {
                            model: Course,
                            attributes: ['id', 'name', 'description', 'image']
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                model: TimeTable,
                attributes: ['id', 'name', 'timestart', 'timefinish', 'day', 'show'],
                include: [
                  {
                    model: Filial,
                    attributes: ['name']
                  }
                ]
              },
            ]
          }
        ]
      })
      return user
    } catch (error) {
      throw ApiError.BadRequest('Пользователя получить не удалось')
    }
  }
  async allTeachersFullInsfo() {
    try {
      const teachers = await User.findAll({
        where: {
          isTeacher: 1
        },
        attributes: ['id', 'surname', 'name', 'middlename', 'email', 'phone', 'profileimage'],
        include: [
          {
            model: Alert,
            attributes: ['id','type', 'message', 'check', 'createdAt', 'updatedAt']
          },
          {
            model: Schedule,
            attributes: ['id', 'date', 'commit', 'check'],
            include: [
              {
                model: Task,
                attributes: ['id', 'numbertask', 'name', 'description', 'linkdocs'],
                include: [
                  {
                    model: Course,
                    attributes: ['id', 'name', 'description', 'image']
                  }
                ]
              },
              {
                model: TimeTable,
                attributes: ['id', 'name', 'timestart', 'timefinish', 'day', 'maxsize', 'timelong', 'show'],
                include: [
                  {
                    model: Filial,
                    attributes: ['id', 'name', 'image', 'addres', 'phone', 'description', 'coordsX', 'coordsY']
                  }
                ]
              },
              {
                model: Childschedule,
                attributes: ['id'],
                include: [
                  {
                    model: Course,
                    attributes: ['id', 'name', 'description', 'image']
                  },
                  {
                    model: Child,
                    attributes: ['id', 'phone', 'surname', 'name', 'middlename', 'profileimage', 'age']
                  }
                ]
              }
            ]
          },
          {
            model: Trial,
            include: [
              {
                model: TimeTable,
                attributes: ['id', 'name', 'timestart', 'timefinish', 'day', 'maxsize', 'timelong', 'show'],
              }
            ]
          }
        ]
      })
      return teachers
    } catch (error) {
      throw ApiError.BadRequest('Пользователей получить не удалось')
    }
  }

  async allTeachers() {
    try {
      const teachers = await User.findAll({where: {isTeacher: 1}})
      return teachers
    } catch (error) {
      throw ApiError.BadRequest('Пользователей получить не удалось')
    }
  }

  async allAdmins() {
    try {
      const admins = await User.findAll({where: {isAdmin: 1},
        attributes: ['id', 'surname', 'name', 'middlename', 'email', 'phone', 'profileimage']})
      return admins
    } catch (error) {
      throw ApiError.BadRequest('Пользователей получить не удалось')
    }
  }

  async allUsers() {
    try {
      const users = await User.findAll()
      return users
    } catch (error) {
      throw ApiError.BadRequest('Пользователей получить не удалось')
    }
  }

  async getUser(id) {
    try {
      const users = await User.findOne({where: {id}})
      return users
    } catch (error) {
      throw ApiError.BadRequest('Пользователя получить не удалось')
    }
  }

  async updateUser(user) {
    try {
      const updated = await User.update(user, {where: {id: user.id}})
      if(updated) {
        let userUpdated = await User.findOne({where: {id: user.id}})
        return userUpdated
      } else {
        return null
      }
    } catch (error) {
      throw ApiError.BadRequest('Пользователя отредактировать не удалось')
    }
  }

  async createUser(user) {
    try {
      let userPhone = await User.findOne({where: {phone: user.phone}})
      if (!userPhone) {
        const userNew = await User.create(user)
        return userNew
      } else {
        return null
      }
    } catch (error) {
      throw ApiError.BadRequest('Пользователя создать не удалось')
    }
  }
}

module.exports = new UserService()