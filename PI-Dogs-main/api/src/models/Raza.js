const { DataTypes, Model, UUIDV4 } = require("sequelize");

class Raza extends Model {} // Use la Model class para hacer la db, otra forma que con describe

module.exports = (sequelize) => {
  return Raza.init(
    {
      id: {
        type: DataTypes.UUID,   //valor unico de ID
        defaultValue: DataTypes.UUIDV4, //tipo de ID
        primaryKey: true, // que sea clave primaria
        allowNull: false, // No puede estar vacio

      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height: {
        type: DataTypes.STRING, //No uso max ni min ya que lo guardo como string
        allowNull: false,
      },
      weight: {
        type: DataTypes.STRING, //Same
        allowNull: false,
      },

      life_span: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT, // Text ya que puede tener mas de 255 caracteres
        allowNull: false,
      },
      created_in_dogs: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    { sequelize, modelName: "Raza" }
  );
};
