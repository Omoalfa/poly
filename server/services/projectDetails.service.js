const db = require('../models');
const { sequelize } = require('../models');
const projectDetail = db.tx_project_details;
/**
 * Query for data
 * @returns {Promise<QueryResult>}
 */
const getHomePageDetails = () => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT title,description,id FROM knowledge_base_poly186_i.tx_project_details;`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
      });
  });
};

/**
 * Query for data
 * @returns {Promise<QueryResult>}
 */
const getHomePageDetail = (id) => {
  return new Promise((resolve, reject) => {
    sequelize
      .query(
        `SELECT title,description,id FROM knowledge_base_poly186_i.tx_project_details WHERE id=${id};`,
        { type: sequelize.QueryTypes.SELECT }
      )
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
      });
  });
};

/**
 * @param {object} ResponseData
 * @param {filter} filter
 * @return Success : { result: [1] }
 * @return Error : DB error
 */
 const updateDetail = async (Data, filter) => {
  return new Promise((resolve, reject) => {
    projectDetail.update(Data, filter)
      .then((ResponseData) => {
        resolve(ResponseData)
      }).catch((error) => {
        reject(error);
      });
  });
}


module.exports = {
  getHomePageDetails,
  getHomePageDetail,
  updateDetail
};


