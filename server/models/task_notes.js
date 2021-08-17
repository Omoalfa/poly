module.exports = (sequelize, DataTypes) => {
  const TaskNotes = sequelize.define('tx_task_notes', {
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
      type: DataTypes.TEXT,
    },
    task_id:{
      type: DataTypes.INTEGER,
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
    tableName: 'tx_task_notes',
  });
  
  return TaskNotes;
};
