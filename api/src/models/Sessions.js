module.exports = (sequelize, DataTypes) => {
  const Sessions = sequelize.define('Sessions', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    refreshToken: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  })
  return Sessions
}
