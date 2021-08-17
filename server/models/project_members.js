module.exports = (sequelize, DataTypes) => {
  const ProjectMembers = sequelize.define('tx_project_members', {
    member_id: {
      type: DataTypes.INTEGER,
    },
    project_id: {
      type: DataTypes.INTEGER,
    },
    created_by: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE
    }
  }, {
    timestamps: false,
    tableName: 'tx_project_members',
  });
  
  ProjectMembers.removeAttribute('id');
  
  return ProjectMembers;
};


