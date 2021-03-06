const query = require('../../utilities/query')

const ProjectsColumns = [
  'project_id',
  'project_name',
  'project_description'
]

const TABLE_NAME = 'projects'

const getAllProjects = () => `select t3.project_id, t3.project_name,student_id, firstname, lastname, t3.project_description from students_projects as t1
inner join students as t2
on t1.sid = t2.sid
inner join projects as t3
on t1.project_id = t3.project_id`

const filterProjects = (filterList) => {
  return query.transformToSQL.filter(TABLE_NAME, filterList)
}

const insertProject = (dataSet) => {
  return `insert into students_projects (project_id, sid) values ("${dataSet.project_id}", "${dataSet.sid}")`
}

const deleteProject = (dataSet) => {
  return `delete from students_projects 
  where sid = (select sid from students where student_id = "${dataSet.student_id}") and project_id = ${dataSet.project_id}`
}

const updateProject = (dataSet, oldData) => {
  return `update students_projects 
  set project_id = (select project_id from projects where projects.project_id = ${dataSet.project_id} ) 
  where sid = (select sid from students where student_id = "${dataSet.student_id}") and project_id = (select project_id from projects where projects.project_id = ${oldData.project_id} )`
}

const getAllProjectsList = (dataSet) => `select * from projects`

const insertProjectList = (dataSet) => {
  return `insert into projects (project_name, project_description) 
  values ("${dataSet.project_name}" , "${dataSet.project_description}")`
}

const deleteProjectList = (dataSet) => {
  return `delete from projects 
  where project_id = ${dataSet.project_id}`
}

const updateProjectList = (dataSet, oldData) => {
  return `update projects 
  set project_name = "${dataSet.project_name}",
  project_description = "${dataSet.project_description}"
  where project_id = ${dataSet.project_id}`
}



module.exports = {
  ProjectsColumns,
  getAllProjects,
  filterProjects,
  insertProject,
  deleteProject,
  updateProject,
  getAllProjectsList,
  insertProjectList,
  deleteProjectList,
  updateProjectList
}
