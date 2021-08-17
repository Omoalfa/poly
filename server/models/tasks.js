module.exports = (sequelize, DataTypes) => {
  const ProjectTasks = sequelize.define('tx_project_tasks', {
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
    start_date:{
      type: DataTypes.DATE
    },
    end_date:{
      type: DataTypes.DATE
    },
    status:{
      type: DataTypes.STRING
    },
    project_id: {
      type: DataTypes.INTEGER
    },
    task_type_id:{
      type: DataTypes.INTEGER
    },
    created_by: {
      type: DataTypes.STRING,
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
    tableName: 'tx_project_tasks',
  });

  return ProjectTasks;
};
