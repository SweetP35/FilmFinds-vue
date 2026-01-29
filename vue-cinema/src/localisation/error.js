const errors = {
  ApplicationError: 'Данный пользователь уже зарегистрирован',
  ValidationError: 'Неверно введены данные'
}

export function error(code) {
  return errors[code] ? errors[code] : 'Что-то пошло не так'
}
