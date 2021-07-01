module.exports = (sequelize, DataTypes) => {
  const CourseTable = sequelize.define('CourseTable', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    }
  })
  return CourseTable
}
