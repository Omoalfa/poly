module.exports = (sequelize, DataTypes) => {
  const ProjectActivities = sequelize.define('tx_project_activities', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    activity_name: {
      type: DataTypes.STRING
    },
    sub_activity: {
      type: DataTypes.STRING
    },
    project_id: {
      type: DataTypes.INTEGER
    },
    task_id: {
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
    tableName: 'tx_project_activities',
  });

  return ProjectActivities;
};
