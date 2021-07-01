module.exports = (sequelize, DataTypes) => {
  const Child = sequelize.define('Child', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    age: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
      defaultValue: ''
    },
    phone: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true,
      defaultValue: ''
    },
    surname: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    middlename: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    profileimage: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    active: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    }
  })
  return Child
}
