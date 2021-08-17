module.exports = (sequelize, DataTypes) => {
  const Projects = sequelize.define('tx_projects', {
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
    visibility:{
      type: DataTypes.ENUM(['Everyone', 'Members','Just me']),
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
    tableName: 'tx_projects',
  });
  

  return Projects;
};
