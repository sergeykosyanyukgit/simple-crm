module.exports = (sequelize, DataTypes) => {
  const TimeTable = sequelize.define('TimeTable', {
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
    timestart: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    timefinish: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    day: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    maxsize: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: false
    },
    timelong: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    show: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  })
  return TimeTable
}
  