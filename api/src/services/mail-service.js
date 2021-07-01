const nodemailer = require('nodemailer')
const configMailServices = require('../config').mailServices
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      }
    })
  }

  async sendActivationMail(to, link){
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Активация аккаунта на ' + process.env.API_URL,
      text: '',
      html:
      `
        <div>
          <h4>Здравствуйте!</h4><br> <p>Вы получили это письмо, потому что подали запрос на регистрацию аккаунта.</p>
          <h2>Для активации перейдите по ссылке:</h2>
          <p>Код-пароль: <a href="${link}">${link}</a></p>
        </div>
      `
    })
  }

  async sendRestorePasswordMail(user){
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: user.email,
      subject: 'Активация аккаунта на ' + process.env.API_URL,
      text: '',
      html:
      `
        <div>
          <h4>Здравствуйте ${user.name} ${user.middlename}!</h4><br> <p>Вы получили это письмо, потому что подали запрос на восстановление доступа к аккаунту.</p>
          <p>Вам предоставлен временный пароль: <h1>${user.newPass}</h1> Используйте его для доступа к аккаунту, однако рекомендуем установите новый пароль из личного кабинета!</p>
        </div>
      `
    })
  }

  async sendTrialMail(course, phone){
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: configMailServices.getters,
      subject: 'Новое пробное занятие!',
      text: '',
      html:
      `
        <div>
          <p>Поступила новая заявка с сайта на курс <h4>${course},</h4> <br> номер телефона: <h4>${phone}</h4></p>
        </div>
      `
    })
  }

  async sendReferalMail(referal, name, phone){
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: configMailServices.getters,
      subject: 'Новое реферальное пробное занятие!',
      text: '',
      html:
      `
        <div>
          <p>Поступила новая реферальная заявка. Отправил приглашение<h4>${referal}.</h4> <br>Приглашают: <h4>${name},</h4> <br> номер телефона <h4>${phone}</h4></p>
        </div>
      `
    })
  }
}

module.exports = new MailService()