module.exports = (sequelize, DataTypes) => {
  const TaskTypes = sequelize.define('tx_task_types', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    status:{
      type: DataTypes.STRING,
    },
    updated_by: {
      type: DataTypes.STRING
    },
    updated_at: {
      type: DataTypes.DATE
    },
  }, {
    timestamps: false,
    tableName: 'tx_task_types',
  });
  
  return TaskTypes;
};
