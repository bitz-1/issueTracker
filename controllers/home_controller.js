// Import necessary modules
// const path = require('path');

// Define home controller logic
const homeController = (req, res) => {
  // You can pass data to the EJS template if needed
  const data = {
    title: 'Home Page',
   
  };

  // Render the 'home.ejs' view with the 'layout.ejs' layout and pass the data
  res.render('home', { ...data, body: '' }); // We pass an empty body for now
};

// Export the controller function
module.exports = homeController; 


module.exports.listprojectController = (req, res) => {
  return res.render('listproject', {
      title: "list Project",
      
  })
}

