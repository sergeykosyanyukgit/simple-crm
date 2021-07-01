module.exports = (sequelize, DataTypes) => {
  const Telegram = sequelize.define('Telegram', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    ChatId: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: true
    },
    MessageId: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: true
    }
  })
  return Telegram
}
