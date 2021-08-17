const db = require('../models');
const { sequelize } = require('../models');
const teamMembers = db.tx_team_members;


/**
 * Query for teamMemberData
 * @returns {Promise<QueryResult>}
 */
const getMemberByTeamId = (id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT user.id,user.display_name,
            (SELECT post.guid FROM wp_xy27yf_posts AS post WHERE user.id = post.post_author AND post.post_status IN ('publish','inherit') AND 
                  post.post_title LIKE 'avatar_%') AS guid,team_id,member_id
            FROM wp_xy27yf_users AS user
            INNER JOIN tx_team_members AS tm ON user.id = tm.member_id
            WHERE  tm.team_id = ${id}`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(teamMemberData => {
        resolve(teamMemberData)
      })
      .catch(error => {
        reject(error)
      });
  });
};

/**
 * Query for teamMemberData
 * @returns {Promise<QueryResult>}
 */
const getMemberByTeam = (id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT user.display_name,
            (SELECT post.guid FROM wp_xy27yf_posts AS post WHERE user.id = post.post_author AND post.post_status IN ('publish','inherit') AND 
              post.post_title LIKE 'avatar_%') AS guid
            FROM wp_xy27yf_users AS user
            INNER JOIN tx_team_members AS tm ON user.id = tm.member_id
            WHERE tm.team_id = ${id}`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(teamMemberData => {
        resolve(teamMemberData)
      })
      .catch(error => {
        reject(error)
      });
  });
};


/**
 * @param {object} createTeamMember
 * @return Success : memberData object
 * @return Error : DB error
 */
const createTeamMember = async (createTeamMember) => {
  return new Promise((resolve, reject) => {
    teamMembers.bulkCreate(createTeamMember, { raw: true })
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
  const taskMemberfilter = { where: { team_id: Id } }
  return new Promise((resolve, reject) => {
    teamMembers.destroy(taskMemberfilter)
      .then((memberData) => {
        resolve(memberData);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = {
  getMemberByTeamId,
  createTeamMember,
  deleteMember,
  getMemberByTeam
};


