module.exports = (sequelize, DataTypes) => {
  const TeamProjects = sequelize.define('tx_team_projects', {
    project_id: {
      type: DataTypes.INTEGER,
    }, 
    team_id: {
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
    tableName: 'tx_team_projects',
  });
  
  TeamProjects.removeAttribute('id');
  
  return TeamProjects;
};


