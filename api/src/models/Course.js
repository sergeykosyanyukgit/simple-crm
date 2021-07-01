module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    }
  })
  return Course
}
  