module.exports = (sequelize, DataTypes) => {
  const Register = sequelize.define('registers', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING,
      required: true
    },
    lastName: {
      type: DataTypes.STRING,
      required: true
    },
    email:{
      type: DataTypes.STRING,
      unique: true
    },
    password:{
      type: DataTypes.STRING
    },
  }, {
    timestamps: true,
    tableName: 'registers',
  });
  

  return Register;
};
