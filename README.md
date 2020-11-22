
// Start the service and pass the port numbers on which you want to run the service :-

node index.js 8000 8004

Read operations can be run and tested using any ports which you have passed as arguments while starting the service:-

http://localhost:8000/read/:key_CHAI1

http://localhost:8004/read/:key_CHAI1



//Write operations are being tested using Chai/Mocha library. Moreover, testing is being performed on port 8000 by default :-

npm test 

