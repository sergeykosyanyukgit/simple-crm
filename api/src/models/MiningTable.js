module.exports = (sequelize, DataTypes) => {
  const MiningTable = sequelize.define('MiningTable', {
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
    time: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
  })
  return MiningTable
}
