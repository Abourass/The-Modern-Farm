const Project = require('../models/projectModel.js');
const {myGetDate} = require('../modules/date.js');

class ProjectController {
  async find(ctx) { ctx.body = await Project.find();} // Get all projects
  async findByClient(client) { // Find a Client
    try {
      if(process.env.logging === 'verbose'){console.log(`${'->'.cyan} projectController${'.findByClient'.cyan}\(client: ${client.toString().blue}\)`);}
      const project = await Project.findOne({client: client});
      if (!project) { console.error(`${'->'.cyan} No projects found for this client, sending null profile to ProjectController.add ${'->'.red}`) } else { console.log(`${'->'.cyan} ${JSON.stringify(await project)} sending to ProjectController.add ${'->'.red}`); }
      return project;
    } catch (err) { console.error(err) }
  }
  async findOneAndUpdate(clientID, clientName, currentProjects){
    try {
      const filter = {client: clientID};
      const newProj = {
        name: `${clientName}-${myGetDate()}`,
        date: Date.now(),
      };
      return await Project.findOneAndUpdate(filter, {projects: currentProjects.unshift(newProj)}, {new: true});
    }catch (err) {console.error(err)}
  }
  async add(clientID, clientName) { // Create a new project
    try {
      let currentProject = {};
      console.log(`${'->'.red} projectController${'.add'.red}\(clientID: ${clientID.toString().blue}, clientName: ${clientName.cyan}\)`);
      if(process.env.logging === 'verbose'){console.log(`${'->'.red} projectController${'.add'.red} | requesting clientProjects`);}
      const clientProjects = await Project.findOne({client: clientID});
      if (!clientProjects){
        console.log(`${'->'.red} No projects found for this clientProjects, creating a new projectStack`);
        const newProject = new Project({
          projects: [{
            name: `${clientName}-${myGetDate()}`,
            date: Date.now(),
          }],
          client: clientID
        });
        await newProject.save();
        currentProject.id = await newProject.projects[0]._id;
        currentProject.stackID = await newProject._id;
      } else {
        if(process.env.logging === 'verbose'){console.log(`${'->'.red} projectController${'.add'.red} | requesting currentProject from ProjectController${'.check'.yellow}`);}
        currentProject = await this.check(clientProjects); // Return the project record if there is one

        if (process.env.logging === 'verbose'){console.log(`${'->'.red} projectController${'.check'.red} returned: ${'->'.red} ${JSON.stringify(currentProject)}`);}

        if (currentProject.index == null && currentProject.id == null){
          console.log(`${'->'.red} currentProject is null, but the client was found so insert a new project to the project stack`);
          if(process.env.logging === 'verbose'){console.log(`${'->'.red} clientProjects is currently: ${JSON.stringify(clientProjects)}`);}
          clientProjects.projects.unshift({
            name: `${clientName}-${myGetDate()}`,
            date: Date.now(),
          });
          await clientProjects.save();
          if(process.env.logging === 'verbose'){console.log(`${'->'.red} clientProjects is now: ${JSON.stringify(clientProjects)}`);}
          currentProject.id = await clientProjects.projects[0]._id;
          currentProject.stackID = await newProject._id;
        }
        console.log(`${'->'.red} currentProject.${'id'.cyan}: ${currentProject.id.toString()}`);
      }
      return {projectID: currentProject.id.toString(), projectStackID: currentProject.stackID.toString()};
    } catch (err) { console.error(err) }
  }
  async check(client) {
    if(process.env.logging === 'verbose'){console.log(`${'->'.yellow} projectController${'.check'.yellow}`);}
    let projectIndex, projectID;
    if(process.env.logging === 'verbose'){console.log(`${'->'.yellow} projects: `, client.projects);}
    const humanTime = timeStr => {
      const now = new Date(timeStr);
      return {
        hour: now.getUTCHours(),
        minute: now.getUTCMinutes(),
        day: now.getUTCDate(),
        month: now.getUTCMonth(),
        year: now.getUTCFullYear()
      }
    };
    client.projects.forEach((project, i) => {
      const time = humanTime(project.date);
      const today = humanTime(Date.now());
      if (time.year === today.year
        && time.month === today.month
        && time.day === today.day
        && time.hour === today.hour){
        console.log('Times match! At iterator: ', i);
        projectIndex = i;
        projectID = project._id;
      } else {
        projectIndex = null;
        projectID = null;
      }
    });
    return {index: projectIndex, id: projectID};
  }
  async update(client) { // Update client
    try {
      const currentProjects = await this.findByClient(client);
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') { client.throw(404, err.name);}
      client.throw(500, err);
    }
  }
  async delete(client) { // Delete a client
    try {
      const client = await Project.findByIdAndRemove(client.params.id);
      if (!client) { client.throw(404); }
      client.body = client;
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') { client.throw(404, err.name);}
      client.throw(500, err);
    }
  }
}
module.exports = new ProjectController();
