module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define('Feedback', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    topic: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    stars: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: false
    }
  })
  return Feedback
}
