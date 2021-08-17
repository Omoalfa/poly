module.exports = (sequelize, DataTypes) => {
  const TaskMembers = sequelize.define('tx_task_members', {
    task_id: {
      type: DataTypes.INTEGER
    },
    member_id: {
      type: DataTypes.INTEGER
    },
    created_by: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE
    }
  }, {
    timestamps: false,
    tableName: 'tx_task_members',
  });
  
  TaskMembers.removeAttribute('id');
  return TaskMembers;
};
