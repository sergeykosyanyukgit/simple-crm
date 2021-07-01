module.exports = (sequelize, DataTypes) => {
  const TeacherTable = sequelize.define('TeacherTable', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    }
  })
  return TeacherTable
}
  