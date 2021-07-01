const nodemailer = require('nodemailer')
const configMailServices = require('../config').mailServices
module.exports = {
  async send(req, res) {
    let transporter = nodemailer.createTransport({
      service: configMailServices.service,
      auth: {
        user: configMailServices.auth.user,
        pass: configMailServices.auth.pass
      }
    },
    {
      from: `Старт Робот <${configMailServices.auth.user}>`,
      headers: {
        'X-Laziness-level': 1000
      }
    })
    let message = null
    if (req.type == 'Restore') {
      message = {
        to: req.email,
        subject: 'Восстановление доступа к учетной записи!',
        html:
          `<h4>Здравствуйте ${req.name} ${req.middlename}!</h4><br> <p>Вы получили это письмо, потому что подали запрос на восстановление доступа к аккаунту.</p>` +
          `<p>Вам предоставлен временный пароль: <h1>${req.newPass}</h1> Используйте его для доступа к аккаунту, однако рекомендуем установите новый пароль из личного кабинета!</p>`+ 
          '<p>С уважением <b> команда Старт Робот!</b></p>'
      }
    } else if (req.type == 'RegistrationStart') {
      message = {
        to: req.email,
        subject: 'Регистрация нового пользователя!',
        html:
          `<h4>Здравствуйте!</h4><br> <p>Вы получили это письмо, потому что подали запрос на регистрацию аккаунта.</p>` +
          `<p>Код-пароль: <h1>${req.newPass}</h1> Используйте его для продолжения регистрации!</p>`+ 
          '<p>С уважением <b> команда Старт Робот!</b></p>'
      }
    } else if (req.type == 'RegistrationEnd') {
      message = {
        to: req.email,
        subject: 'Добро пожаловать!',
        html:
          `<h4>Здравствуйте ${req.name} ${req.middlename}!</h4><br> <p>Вы получили это письмо, потому что подали запрос на восстановление доступа к аккаунту.</p>` +
          `<p>Вам предоставлен временный пароль: <h1>${req.newPass}</h1> Используйте его для доступа к аккаунту, однако рекомендуем установите новый пароль из личного кабинета!</p>`+ 
          '<p>С уважением <b> команда Старт Робот!</b></p>'
      }
    } else if (req.type == 'NewTrial') {
      message = {
        to: configMailServices.getters,
        subject: 'Новое пробное занятие с сайта!',
        html:
          `<p>Поступила новая заявка с сайта на курс <h4>${req.course},</h4> <br> номер телефона: <h4>${req.phone}</h4></p>`
      }
    } else if (req.type == 'NewReferalTrial') {
      message = {
        to: configMailServices.getters,
        subject: 'Новое реферальное пробное занятие!',
        html:
          `<p>Поступила новая реферальная заявка. Отправил приглашение<h4>${req.referal}.</h4> <br>Приглашают: <h4>${req.name},</h4> <br> номер телефона <h4>${req.phone}</h4></p>`
      }
    }
    try {
      let info = await transporter.sendMail(message)
      transporter.close()
      console.log(info.response)
      return({'status':info.response})
    } catch (err) {
      console.log(err)
      return(err)
    }
  }
}