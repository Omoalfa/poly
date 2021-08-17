module.exports = (sequelize, DataTypes) => {
  const SubTask = sequelize.define('tx_sub_task', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    task_id: {
      type: DataTypes.INTEGER,
    },
    created_by: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM(['Pending', 'done'])
    },
    list_order: {
      type: DataTypes.INTEGER,
      default: 0
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
    tableName: 'tx_sub_task',
  });

  return SubTask;
};
