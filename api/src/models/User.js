module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    middlename: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    email: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
      defaultValue: ''
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      defaultValue: ''
    },
    profileimage: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    isActivated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    activationLink: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isTeacher: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    TelegramId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    }
  })
  return User
}