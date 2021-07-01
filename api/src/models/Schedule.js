module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      unique: false,
      allowNull: false
    },
    commit: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: false
    },
    check: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: false
    }
  }, {timestamps: false})
  return Schedule
}
  