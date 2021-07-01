module.exports = (sequelize, DataTypes) => {
  const ViewDashboard = sequelize.define('ViewDashboard', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    profileimage: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    elementcolorlight: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    elementcolordark: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    elementcolorshadow: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    buttoncolor: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    buttoncolorshadow: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    selected: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'false'
    }
  })
  return ViewDashboard
}
