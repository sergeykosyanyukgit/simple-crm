const Joi = require('joi')

module.exports = {
  password: Joi
    .string()
    .min(5).max(25)
    .error(new Error('Пароль должен содержать от 5 до 25 символов')),
  id: Joi
    .number()
    .min(1)
    .error(new Error('Ошибка подтверждения id')),
  name: Joi
    .string()
    .min(2, 'utf8')
    .max(50, 'utf8')
    .error(new Error('Имя должно содержать от 2 до 50 символов')),
  middlename: Joi
    .string()
    .min(2, 'utf8')
    .max(25, 'utf8')
    .error(new Error('Отчество должно содержать от 2 до 25 символов')),
  surname: Joi
    .string()
    .min(2, 'utf8')
    .max(25, 'utf8')
    .error(new Error('Фамилия должна содержать от 2 до 25 символов')),
  profileimage: Joi
    .string()
    .min(3)
    .max(100)
    .error(new Error('Укажите картинку')),
  elementcolorlight: Joi
    .string()
    .min(1)
    .max(30)
    .error(new Error('Укажите светлый цвет для градиента')),
  elementcolordark: Joi
    .string()
    .min(1)
    .max(30)
    .error(new Error('Укажите темный цвет для градиента')),
  elementcolorshadow: Joi
    .string()
    .min(1)
    .max(30)
    .error(new Error('Укажите цвет теней')),
  buttoncolor: Joi
    .string()
    .min(1)
    .max(30)
    .error(new Error('Укажите цвет для кнопки')),
  buttoncolorshadow: Joi
    .string()
    .min(1)
    .max(30)
    .error(new Error('Укажите цвет теней для кнопки')),
  token: Joi
    .string()
    .error(new Error('Ошибка подтверждения токена')),
  email: Joi
    .string()
    .email()
    .error(new Error('Почтовый адрес введен некорректно!')),
  verifyCode: Joi
    .string()
    .min(1)
    .max(25)
    .error(new Error('Код подтверждения введен некорректно!')),
  phone: Joi
    .string()
    .regex(/^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/, { invert: false })
    .error(new Error('Номер телефона введен некорректно!')),
  topic: Joi
    .string()
    .min(1)
    .max(50)
    .error(new Error('Тема введена некорректно!')),
  description: Joi
    .string()
    .min(1)
    .max(50)
    .error(new Error('Описание введено некорректно!')),
  stars: Joi
    .number()
    .min(1)
    .max(10)
    .error(new Error('Укажите корректную оценку')),
  date: Joi
    .string()
    .min(1)
    .max(50)
    .error(new Error('Укажите корректную дату')),
  time: Joi
    .string()
    .min(1)
    .max(50)
    .error(new Error('Укажите корректное время')),
  payhours: Joi
    .number()
    .min(1)
    .error(new Error('Укажите корректную зп в час')),
  paychilds: Joi
    .number()
    .min(1)
    .error(new Error('Укажите корректную зп за ученика')),
  timestart: Joi
    .date()
    .error(new Error('Укажите корректную дату начала')),
  timefinish: Joi
    .date()
    .error(new Error('Укажите корректную дату окончания')),
  discount: Joi
    .number()
    .min(0)
    .max(5000)
    .error(new Error('Укажите корректную скидку')),
  course: Joi
    .string()
    .min(1)
    .max(50)
    .error(new Error('Укажите корректное имя курса')),
  commit: Joi
    .string()
    .min(1)
    .max(100)
    .error(new Error('Укажите корректный коментарий')),
  res: Joi
    .string()
    .min(1)
    .max(30)
    .error(new Error('Укажите корректный резульатат пробного занятия')),
  check: Joi
    .string()
    .min(1)
    .max(50)
    .error(new Error('Укажите корректное подтвердение')),
  comment: Joi
    .string()
    .min(1)
    .max(100)
    .error(new Error('Укажите корректный коментарий')),
  Labeled: Joi
    .string()
    .min(1)
    .max(50)
    .error(new Error('Укажите корректный Label')),
  day: Joi
    .string()
    .min(2)
    .max(30)
    .error(new Error('Укажите корректный день недели')),
  maxsize: Joi
    .number()
    .min(1)
    .max(50)
    .error(new Error('Укажите корректный размер группы')),
  timelong: Joi
    .number()
    .min(1)
    .max(6)
    .error(new Error('Укажите корректную длину занятия')),
  Users: Joi
    .array()
    .min(1)
    .max(30)
    .error(new Error('Укажите преподавателей')),
  Courses: Joi
    .array()
    .min(1)
    .max(30)
    .error(new Error('Укажите курсы')),
  numbertask: Joi
    .number()
    .min(1)
    .max(100)
    .error(new Error('Укажите корректный номер занятия')),
  linkdocs: Joi
    .string()
    .min(3)
    .max(200)
    .error(new Error('Укажите корректную ссылку на документ')),
  status: Joi
    .string()
    .min(1)
    .max(30)
    .error(new Error('Укажите корректный статус')),
  format: Joi
    .string()
    .min(1)
    .max(10)
    .error(new Error('Укажите корректный формат')),
  addres: Joi
    .string()
    .min(1)
    .max(30)
    .error(new Error('Укажите корректный адрес')),
  coords: Joi
    .string()
    .min(3)
    .max(50)
    .error(new Error('Укажите корректные координаты')),
  age: Joi
    .string()
    .min(10)
    .max(10)
    .error(new Error('Укажите корректную дату рождения')),
  ChildTables: Joi
    .array()
    .min(1)
    .max(4)
    .error(new Error('Укажите от 1 до 4 группп')),
  Schedules: Joi
    .array()
    .min(12)
    .max(24)
    .error(new Error('Укажите от 12 до 24 занятий')),
  money: Joi
    .number()
    .min(-24)
    .max(24)
    .error(new Error('Укажите от -24 до 24 оплаченных занятий')),
  type: Joi
    .string()
    .min(1, 'utf8')
    .max(20, 'utf8')
    .error(new Error('Укажите тип объявления')),
  message: Joi
    .string()
    .min(1, 'utf8')
    .max(20, 'utf8')
    .error(new Error('Укажите сообщение объявления')),
  acive: Joi
    .string()
    .min(1)
    .max(50)
    .error(new Error('Укажите активность объявления')),
  courses: Joi
    .array()
    .min(1)
    .max(100)
    .error(new Error('Укажите курсы')),
}