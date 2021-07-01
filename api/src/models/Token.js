module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    refreshToken: {
      type: DataTypes.TEXT,
      unique: false
    }
  })
  return Token
}
