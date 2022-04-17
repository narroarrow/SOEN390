## Steps to Set Up the Project Locally :notebook: 

  1. Install Node.js with npm
  2. Clone the repository onto your local device
  3. Open the terminal and change directories to the client folder
  4. In the terminal, run the command: "npm install"
  5. Start the server (refer to the servers README to start the server)
  6. After starting the server, in the terminal, run the command: "npm start"
  7. This will open a browser with the application running on localhost.
  
## Troubleshooting / Common Issues :notebook: 

As the GitIgnore contains the modules, often specific modules do not get pushed and will need to be installed on your localhost. If this is the case and the module cannot be found, copy the name of the module and run the command "npm i {module_name}". 

## Frontend Coding Explanation :notebook:

To develop this project our team used React which is an open-source Javascript library to develop web applications. Further, to maintain style consistencies across the entire project, we implemented MUI which is a materials library that allows you to access many predefined components and styles in React. All pages related to frontend can be found in the client folder, which contains all the pages, components, and tests. Generally, each page is developed through constants, variables and functions which return the page that will be displayed. Further, React implements hooks to avoid the use of classes, throughout the project, we implement useState() and useEffect() to initialize the states and then perform specific operations based off of each render.

## Testing Explanation :notebook: 

Testing methodologies include rendering each page to ensure that the page renders correctly. Additionally, unit tests were written for each function of a specific page. Initially, the test renders the specific component related to the function. After rendering the component, the specific function is called to ensure that it executes. Once the function is called, the test checks to see if the function was called properly.


