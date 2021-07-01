module.exports = (sequelize, DataTypes) => {
  const Filial = sequelize.define('Filial', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    addres: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    coordsX: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    coordsY: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    }
  })
  return Filial
}
  