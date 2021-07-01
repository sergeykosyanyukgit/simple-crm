module.exports = (sequelize, DataTypes) => {
  const Alert = sequelize.define('Alert', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    message: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
    },
    check: {
      type: DataTypes.BOOLEAN,
      unique: false,
      allowNull: false,
      default: true
    }
  })
  return Alert
}
  