module.exports = (sequelize, DataTypes) => {
  const Childschedule = sequelize.define('Childschedule', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    }
  }, {timestamps: false})
  return Childschedule
}
