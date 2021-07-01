module.exports = (sequelize, DataTypes) => {
  const TrialCourse = sequelize.define('TrialCourse', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    }
  }, {timestamps: false})
  return TrialCourse
}
  