const db = require('../models');
const { sequelize } = require('../models');
const projectFiles = db.tx_project_files;

/**
 * Query for fileData
 * @returns {Promise<QueryResult>}
 */
const getFileDataByProjectId = (id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT files.id,name,size,type,data,user.display_name, 
        (SELECT post.guid FROM wp_xy27yf_posts AS post 
          WHERE user.id = post.post_author AND  
              post.post_status IN ('publish','inherit') 
                    AND post.post_title LIKE 'avatar_%') AS guid
        FROM tx_project_files AS files
        INNER JOIN wp_xy27yf_users AS user ON files.created_by = user.id
        WHERE files.project_id = ${id}`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(fileData => {
        resolve(fileData)
      })
      .catch(error => {
        reject(error)
      });
  });
};

/**
 * Query for fileData
 * @returns {Promise<QueryResult>}
 */
const getFileById = (id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT id,name,size,type,data
            FROM tx_project_files 
          WHERE id = ${id}`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(fileData => {
        resolve(fileData)
      })
      .catch(error => {
        reject(error)
      });
  });
};

/**
 * Query for fileData
 * @returns {Promise<QueryResult>}
 */
const getFileDataBytaskId = (id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT files.id,name,size,type,data,user.display_name, 
        (SELECT post.guid FROM wp_xy27yf_posts AS post 
          WHERE user.id = post.post_author AND  
              post.post_status IN ('publish','inherit') 
                    AND post.post_title LIKE 'avatar_%') AS guid
        FROM tx_project_files AS files
        INNER JOIN wp_xy27yf_users AS user ON files.created_by = user.id
        WHERE files.task_id = ${id}`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(fileData => {
        resolve(fileData)
      })
      .catch(error => {
        reject(error)
      });
  });
};

/**
 * Query for fileData
 * @returns {Promise<QueryResult>}
 */
const getFileDataById = (id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT files.id,name,size,type,data,user.display_name, 
        (SELECT post.guid FROM wp_xy27yf_posts AS post 
          WHERE user.id = post.post_author AND  
              post.post_status IN ('publish','inherit') 
                    AND post.post_title LIKE 'avatar_%') AS guid
        FROM tx_project_files AS files
        INNER JOIN wp_xy27yf_users AS user ON files.created_by = user.id
        WHERE files.id = ${id}`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(fileData => {
        resolve(fileData)
      })
      .catch(error => {
        reject(error)
      });
  });
};


/**
 * @param {object} uploadFile
 * @return Success : fileData object
 * @return Error : DB error
 */
const uploadFileByProject = async (uploadFile) => {
  return new Promise((resolve, reject) => {
    const {
      name,
      size,
      type,
      data,
      projectId,
      taskId,
      userId
    } = uploadFile

    projectFiles.create({
      name: name,
      size: size,
      type: type,
      data: data,
      project_id: projectId,
      task_id: taskId,
      created_at: Date.now(),
      created_by: userId
    }, { raw: true })
      .then((fileData) => {
        resolve(fileData)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * @param {Number} Id
 * @return Success : [result:1]
 * @return Error : DB error
 */
const deleteFile = async (Id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `DELETE FROM tx_project_files WHERE id = '${Id}' `,
        { type: sequelize.QueryTypes.DELETE }
      )
      .then(fileData => {
        resolve(fileData)
      })
      .catch(error => {
        reject(error)
      });
  });
}

module.exports = {
  getFileById,
  uploadFileByProject,
  getFileDataBytaskId,
  getFileDataByProjectId,
  getFileDataById,
  deleteFile
};


