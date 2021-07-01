module.exports = (sequelize, DataTypes) => {
  const ReferalParentTrial = sequelize.define('ReferalParentTrial', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    discount: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: false
    },
  })
  return ReferalParentTrial
}
    