module.exports = (sequelize, DataTypes) => {
  const AlertTable = sequelize.define('AlertTable', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    type: {//danger warning success
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    method: {//alert mail
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    message: {//message
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    status: {//Выполняется Выполнено
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    }
  })
  return AlertTable
}
  