module.exports = (sequelize, DataTypes) => {
  const ProjectFiles = sequelize.define('tx_project_files', {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name:{
      type: DataTypes.STRING,
    },
    size:{
      type:DataTypes.DECIMAL(11,2)
    },
    type:{
      type:DataTypes.STRING
    },
    data:{
      type:DataTypes.BLOB
    },
    project_id:{
      type: DataTypes.INTEGER,
    },
    task_id:{
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
    tableName: 'tx_project_files',
  });
    
  return ProjectFiles;
};


