const projectData = require('../data/projectData');
const sectorData = require('../data/sectorData');

let projects = [];

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      projects = projectData.map(project => {
        const sector = sectorData.find(item => item.id === project.sector_id);
        return { ...project, sector: sector ? sector.sector_name : undefined };
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

function getAllProjects() {
  return new Promise(resolve => resolve(projects));
}

function getProjectById(projectId) {
  return new Promise((resolve, reject) => {
    const project = projects.find(item => item.id === Number(projectId));
    if (project) resolve(project);
    else reject('Unable to find requested project');
  });
}

function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    const matches = projects.filter(item =>
      typeof item.sector === 'string' && item.sector.toLowerCase().includes(String(sector).toLowerCase())
    );
    if (matches.length) resolve(matches);
    else reject('Unable to find requested projects');
  });
}

module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };
