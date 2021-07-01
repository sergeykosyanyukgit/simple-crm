module.exports = (sequelize, DataTypes) => {
  const Gallery = sequelize.define('Gallery', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    islike: {
      type: DataTypes.BOOLEAN,
      unique: false,
      allowNull: false,
      defaultValue: false
    },
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    format: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    }
  })
  return Gallery
}
