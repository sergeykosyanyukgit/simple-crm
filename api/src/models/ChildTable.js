module.exports = (sequelize, DataTypes) => {
  const ChildTable = sequelize.define('ChildTable', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    }
  })
  return ChildTable
}
  