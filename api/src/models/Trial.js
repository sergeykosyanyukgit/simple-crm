module.exports = (sequelize, DataTypes) => {
  const Trial = sequelize.define('Trial', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    parentname: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    time: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    comment: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      unique: false,
      allowNull: true
    },
    commit: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true
    },
    check: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true
    },
    res: {
      type: DataTypes.TEXT,
      unique: false,
      allowNull: true
    }
  })
  return Trial
}
