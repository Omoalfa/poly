const db = require('../models');
const { sequelize } = require('../models');
const projectMembers = db.tx_project_members;

/**
 * Query for memberData
 * @returns {Promise<QueryResult>}
 */
const getMemberByProjectId = (id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT member_id,project_id FROM tx_project_members WHERE project_id = ${id}`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(memberData => {
        resolve(memberData)
      })
      .catch(error => {
        reject(error)
      });
  });
};

/**
 * Query for memberData
 * @returns {Promise<QueryResult>}
 */
const getMemberByProject = (id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT user.display_name,
            (SELECT post.guid FROM wp_xy27yf_posts AS post 
                  WHERE user.id = post.post_author AND 
                      post.post_status IN ('publish','inherit') AND 
                      post.post_title LIKE 'avatar_%') AS guid
                FROM wp_xy27yf_users AS user
                INNER JOIN tx_project_members AS pm ON user.id = pm.member_id
                WHERE project_id  = ${id}`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(memberData => {
        resolve(memberData)
      })
      .catch(error => {
        reject(error)
      });
  });
};

/**
 * @param {object} createProjcetMember
 * @return Success : memberData object
 * @return Error : DB error
 */
const createProjcetMember = async (createProjcetMember) => {
  return new Promise((resolve, reject) => {
    projectMembers.bulkCreate(createProjcetMember, { raw: true })
      .then((memberData) => {
        resolve(memberData)
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
const deleteMember = async (Id) => {
  const projectMemberfilter = { where: { project_id: Id } }
  return new Promise((resolve, reject) => {
    projectMembers.destroy(projectMemberfilter)
      .then((memberData) => {
        resolve(memberData);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = {
  createProjcetMember,
  getMemberByProjectId,
  deleteMember,
  getMemberByProject
};


