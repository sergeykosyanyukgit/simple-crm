module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    numbertask: {
      type: DataTypes.INTEGER,
      unique: false,
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
    linkdocs: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    }
  }, {timestamps: false})
  return Task
}
  