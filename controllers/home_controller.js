// Import necessary modules
// const path = require('path');

const {ObjectId} = require('mongodb');
const mongoDB = require('../config/dbconfig');



// Define home controller logic
module.exports.homeController = async (req, res) => {
  const collection = await mongoDB();
  const listedProject = await collection.find({ id: 'listedProject' }).toArray();
  return res.render('homepage', {
      title: "Issue Tracker",
      listedProject
  })
}





module.exports.listprojectController = (req, res) => {
  return res.render('listproject', {
      title: "list Project",
      
  })
}

//post data list project 

module.exports.postProjectController = async(req,res) =>  {
  let getformdata = req.body;
  getformdata = { ...getformdata, id:"listedProject"}
  const collection = await mongoDB();
  collection.insertOne(getformdata, (err,data) => {
    if (err)
    throw err
    else if (data) 
    console.log('DATA INSERTED');
  });
  res.redirect('/');
}


module.exports.projectDetails = async (req,res) => {
  const collection = await mongoDB();
  const projectDetails = await collection.find({ id: 'listedProject' }).toArray();
  return res.render('projectdetails', {
      title: "projectdetails",
      projectDetails
  })

}

module.exports.riseIssue = async(req,res) => {
  const issueID = req.params;
  console.log(issueID)
  return res.render('riseissue',{
    title :'Rise an Issue',
    issueID
  
  });
}

module.exports.riseIssueADD = async (req, res) => {
  try {
    console.log(req.params);
    console.log(req.body);
    const bugID = req.params.id;
    const issue = req.body;
    const collection = await mongoDB();
    await collection.findOneAndUpdate({ _id: new ObjectId(bugID) }, { $push: { fault: issue } }
    );
    res.redirect('/projectdetails');
  } catch (error) {
    console.error('Error adding issue:', error);
    // Handle the error, e.g., send an error response to the client
    res.status(500).json({ error: 'An error occurred while adding the issue.' });
  }
};

//getAllprojectAPI
module.exports.getAllProjects = async(req,res) => {
try {
  const issueType = req.query.issue_type;
  const query = req.query;
  const filter = {};
  if (issueType) {
    filter['fault.issue_type'] = issueType;
  } else {
    // Use the entire req.query object as the filter if issue_type is not present
   Object.assign(filter, query);
  }
  const collection = await mongoDB();
  const getAllDataCursor = collection.find(filter);
  const getAllDataArray = await getAllDataCursor.toArray();
  console.log('issueType:', issueType);
  console.log('filter:', filter);
  console.log('get user query',req.query);
  res.status(200).json({
    getAllData: getAllDataArray,
  });


} catch (error) { 
  console.log('Error retrieving data from MongoDB :',error);
  res.status(500).json({
    error:'Failed to retrieve data from the database.',
  });
  
}

}


//


function escapeRegExp(string) {
  if (typeof string !== 'string') {
    return '';
  }
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}


module.exports.searchProject = async (req, res) => {
  try {
    const { projectName, description, developerName, issueType } = req.body;

    // Escape special characters in search criteria
    const escapedProjectName = escapeRegExp(projectName);
    const escapedDescription = escapeRegExp(description);
    const escapedDeveloperName = escapeRegExp(developerName);

    const projectsCollection = await mongoDB();
    const searchQuery = {
      $or: [
        { 'projectName': { $regex: escapedProjectName, $options: 'i' } },
        { 'description': { $regex: escapedDescription, $options: 'i' } },
        { 'developerName': { $regex: escapedDeveloperName, $options: 'i' } }
      ]
    };

    // Add issueType filter if provided
    if (issueType && issueType !== "All Issue Types") {
      searchQuery['fault.issue_type'] = issueType;
    }

    const projects = await projectsCollection.find(searchQuery).toArray();

    console.log(projects);
    return res.render('searchproject', {
      title: "project",
      projects: projects
    });

  } catch (error) {
    console.log(error, "Internal Server Error");
    return res.redirect('back');
  }
};