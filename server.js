/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Aliza Asher  Student ID: 177767233  Date: 2026-11-13
* Published URL: https://web322-assignment-2-vert.vercel.app/
********************************************************************************/
const express = require('express');
const projectData = require('./modules/projects');
const app = express();
const PORT = process.env.PORT || 8080;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', async (req, res) => {
  try { const all = await projectData.getAllProjects(); res.render('home', { projects: all.slice(0,3) }); }
  catch (err) { res.status(500).render('404',{message:String(err)}); }
});
app.get('/about', (req,res) => res.render('about'));
app.get('/solutions/projects', async (req,res) => {
  try {
    const projects = req.query.sector ? await projectData.getProjectsBySector(req.query.sector) : await projectData.getAllProjects();
    if (!projects.length) return res.status(404).render('404',{message:`No projects found for sector: ${req.query.sector}`});
    res.render('projects',{projects});
  } catch (err) { res.status(404).render('404',{message:req.query.sector ? `No projects found for sector: ${req.query.sector}` : String(err)}); }
});
app.get('/solutions/projects/:id', async (req,res) => {
  try { const project = await projectData.getProjectById(req.params.id); res.render('project',{project}); }
  catch(err) { res.status(404).render('404',{message:String(err)}); }
});
app.use((req,res)=>res.status(404).render('404',{message:"I'm sorry, we're unable to find what you're looking for."}));
projectData.initialize().then(()=>app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`))).catch(err=>{console.error('Unable to initialize project data:',err.message||err);process.exitCode=1;});
