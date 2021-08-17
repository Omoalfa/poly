module.exports = (sequelize, DataTypes) => {
  const TaskStatusType = sequelize.define('tx_task_status_types', {
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
    created_by: {
      type: DataTypes.STRING
    },
    created_at: {
      type: DataTypes.DATE
    },
    updated_by: {
      type: DataTypes.STRING
    },
    updated_at: {
      type: DataTypes.DATE
    },
  }, {
    timestamps: false,
    tableName: 'tx_task_status_types',
  });
  
  return TaskStatusType;
};
