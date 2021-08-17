module.exports = (sequelize, DataTypes) => {
  const TeamMembers = sequelize.define('tx_team_members', {
    team_id: {
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
    tableName: 'tx_team_members',
  });
  
  TeamMembers.removeAttribute('id');
  return TeamMembers;
};
