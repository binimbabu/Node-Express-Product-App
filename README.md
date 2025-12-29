Node.js can run JavaScript anywhere. Google developed V8 machine this machine used by Node.js takes in JavaScript code compiles it and compiles to machine code.

//test.js

const fs = require('fs');
fs.writeFileSync('hello.txt', 'Hello from Node');

import file using 'require('fs')' and will write file to harddrive 'writeFileSync' and the first argument in 'writeFileSync' is path to the file allowing with the file name and second argument is the content of File created here 'hello.txt'.

JavaScript on Server

In Server database will use to store and fetch database, authentication


REPL

REPL stands for R for Read User input, E for val which evaluates user input, P for Print output, L for loop waiting for new input.
Execute Node.js code using REPL


How web works

When user/client/browser enter sa web page url say "http://my-page.com", Browser will look for a domain Server and the browser will sent a url request to Server. Response (eg: HTML page) from Sever to Client. Request and response are through HTTP or HTTPS protocols
HTTP is a protocol for transferring data which is understood by browser and server.
HTTPS = HTTP + Data Encryption for data transmission.



Core Modules

http (launch a sever or send requests, https (http and https useful for creating http requests and responses), fs, path (constructing path to file or file system), os



In Node.js, require() is a built-in function used to import modules, which are self-contained files containing JavaScript code designed to perform a specific task.

Example

const http = require("http");
function rqListener(req, res) {}
http.createServer(rqListener);

imports http module and http object creates a server using 'http.createServer();
'createServer()' takes in argument requestListener where requestListener is a function (here rqListener) that gets invoked for each incoming request. 'rqListener' takes in 2 arguments where first argument is request of type IncomingMessage and second argument is response which is of type ServerResponse. Node.js gives an object (here 'req') that represents incoming request and allow to read data from that request as the first argument and second argument Node.js given an object (here 'res') as response to send requests whoever has sent the request.
'rqListener' will be executed for each incoming requests since given in 'createServer()' . 'rqListener' is executed each time when a requests reaches server.

'createServer()' can be written like follows also


const http = require("http");
const server = http.createServer(function (req, res){
    
});
server.listen(3000);

Can be also written like this:-


const http = require("http");
const server =  http.createServer( (req, res) => {});
server.listen(3000);


'listen()' will tell Node.js to listen before exiting. 'listen()' will have argument where argument is to listen to the port. 



Node.js Program Lifecycle


const http = require("http");
const server =  http.createServer( (req, res) => {});
server.listen(3000);

When we written the above code in app.js file  and run the command 'node app.js' then script gets started. Where Node.js went through entire file where parse the code, register variables and functions. Event loop is a process managed by Node.js which keeps on running as long there is work to do or event listeners are registered. One event listener we registered and not unregistered is  (req, res) => {} inside 'createServer. All code managed by event loop and Node.js uses this event loop for all kind of stuff not only to manage server, but also while accessing a database , register a function and should be executed. Node.js executes this event driven approach because it uses single threaded JavaScript. the entire node process basically uses one thread on our computer its running on. Event loop triggers when an event has taken place. If we want to unregister and then it can be done by process.exit (then the process would end in event loop )

example:-

const http = require("http");
http.createServer((req, res) => {
    console.log(req);
    process.exit();
});

Process exit basically hard exited our event loop and therefore the program shuts down because there was no more work to do and it basically closed the program and gave control back to terminal.

In 'req' there is 'headers' which is metadata which is added to request (header data include port where server is listening the browser where its listening if its google chrome, header information added to request, which kid of response we accept like 'text/html' ), http version added.

In 'req' we have url which here url is '\' here bacuse everything that comes after 'http:localhost:3000' 
If the http:localhost:3000/test was done in the browser then we get 'req.url' as '/test'.

In 'req' we have method is GET

Example:-

const http = require("http");

http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  res.setHeader("Content-Type", 'text/html');
  res.write("<html>");
  res.write("<head><title>My First Node.js page</title></head>");
  res.write("<body>My first Node.js Body</body>");
  res.write("</html>");
  res.end();
});


Here 'res' is set of type text/html.

res.write writes a chunk of data. Here to 'res' a chunk of data is written with html , head , title and body tags. For the res.write to come to an end we need to give res.end() at last where we finish writing into the response ('res'). res.end() will sent back to the client



const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
     res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button>Send</button> </form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Node.js page</title></head>");
  res.write("<body>My first Node.js Body</body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);



Here url === "/" then form with action redirected the form values to '/message'

name="message" in input tag . Will add any input data to the request and make it accessible via the assigned name.

return res.end() will stop res.write execution 


In the below code if the form data we entered in input tag in the above is redirected to '/' with statuscode 302 and placing the data of the form in 'message.txt'


if (url === "/message" && method === "POST") {
    fs.writeFileSync("message.txt", "DUMMY");
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }


Full example:

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button>Send</button> </form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    fs.writeFileSync("message.txt", "DUMMY");
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Node.js page</title></head>");
  res.write("<body>My first Node.js Body</body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);




Streams and Buffers

An incoming request include a stream of data where Node.js read data in chunks and after reading this chunks of data the stream of data is fully parsed. For example when a file being uploaded and this will considerably longer therefore streaming of data and reading data in chunks by Node.js that will allow to start writing this in your disk or hard drive, so to your hard drive when your app runs make the node app runs on server, while the data is coming in. So need not have to parse the entire file which will take a lot of time and you have to wait for being uploaded before you can do anything with it.
The stream of data we can start working on the data early and organize these data in chunks by buffer. A buffer is like a bus stop. If you consider buses they are always driving but for customers or users being able to work with them to climb on the bus and leave the bus you need bus stops where you well can track the bus basically and that is what a buffer is. 
A buffer is a construct which allows you to hold multiple chunks and work with them before they are released once you are done.

Request should listen to an event listener ' req.on('data', (chunk)=>{
body.push(chunk)}) ' here 'on' listens to some events and the event I need to listen is the data event. Data event is fired whenever new chunk is ready to be read. Second argument to 'on' is a function that should be executed for every data event and the function receives a chunk of data.

const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
   
 After data is parsed we can event listener of 'on' with end. (eg: -  req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      fs.writeFileSync("message.txt", message);   
 });


Here Buffer will interact with chunks of data and concat the data and convert to string and toString conversion is donr because 'body' is coming as text.





Full example:-

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button>Send</button> </form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Node.js page</title></head>");
  res.write("<body>My first Node.js Body</body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);



Here in   fs.writeFileSync("message.txt", message);  'writeFileSync' denotes to synchronously write data to the file 'message.txt'. So until this line gets executed (i.e   fs.writeFileSync("message.txt", message);  ) it will block code execution further until the file 'message.txt' is created. But if the data to be written in the file (here message.txt ) is too long and size of file is too high then while writing to file will block the other code execution if we use 'writeFileSync' inorder to resolve this issue we use 'writeFile' instead (so other execution of code will not be blocked). 'writeFile' contains 3 arguments first argument is the path to the file including the file name, second argument is the data to be added to the file, third argument is the callback function which will be executed after the file is created and data is embedded into the file if success, otherwise the callback function triggers an error.

Example:-

fs.writeFile('message.txt', message, (err) => {
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
});



But Node.js is usually asynchronous in nature because when one task is under process it doesn't wait to complete that execution instead it will start executing next task and comes back when the previous task is completed.





Single Thread, Event Loop and Blocking Code


Node.js uses only 1 JavaScript thread. A thread is a process in your operating system.
For example: Let's say we have some code which accessed the file system. But when working with files often is a task that takes longer because files can be very big and it doesn't complete instantly, there fore if we are doing this upon an incoming request, a second request might have to wait because we are not able to handle it yet or it even gets declined. So, webpage is down for that user. Event loop is already started by Node.js when your program starts, user need not have to explicitly start the Event Loop starts when the user runs the program. Event loop is responsible for running the code when a certain event occurs, it's aware of all these callbacks and basically well execute said code. Even though file operation is important its operation is not handled by event loop, just the callback that we might have defined on write file once its done that code will be handled by event loop but that code will finish fast. So, event loop will only handle callbacks that contain fast finishing code. Instead our file system operation and a couple of other long taking operations are sent to a worker pool which is also spin up and managed by Node.js automatically. this worker pool is responsible for all heavy lifting. This worker pool is kind of totally detached of your JavaScript code and it runs on different threads, it can spin up multiple threads. Worker pool is closely intervened with your operating system on which app is running on. If there is task to done something on a file then a worker from the worker pool will take care and will do the job which is totally detached from your code and from the request and from the event loop. The one connection with the event loop though is once the worker is done, as per the example once we read a file , it will trigger the callback for that read file operation and since the event loop is responsible for the events and the callbacks this will in end up in the event loop. So the node.js will then basically execute the appropriate callback.


Event Loop

Event loop is a loop which is run or started by Node.js that keeps Node.js process running and event loop handles all the callbacks and it has a certain order in which it goes through the callbacks. Event loop at the beginning of each new iteration it checks if there are any timer callbacks it should execute. If we haven't set up any timers yet but there is setTimeout and setIntreval. In Node.js we can set a timer and basically you set a timer and always pass a method, a function that should be executed once the timer completes and Node.js is aware of this and at the beginning of each new loop iteration, it executes any due timer callbacks, so any callbacks that have to be executed because  a timer completes. Then as a next step, it checks other callbacks for example if we had write or read file, we might have a callback because that operation finished and it will then also execute these callbacks. Input/output operations that typically is file operations but can also be network operations which takes long blocking taking operations. If there are too many outstanding callbacks, it will continue its loop iteration and postpone these callbacks to the next iteration to execute them. After working on these open callbacks and after finishing them all, it will enter a pull phase. The pull phase is basically a phase where Node.js will look for new IO events and basically do its best to execute their callbacks immediately if possible. But if its not possible, it will defer the execution and basically register this as a pending callback. It will check if there is any timer callbacks due to be executed and if timer exists then it will jump to timer phase and execute them right away, so it can actually jump back there and not finish the iteration, other wise it will continue. set immediate callbacks will be executed in a so called check phase. Set immediate is a bit like setTimeout and setIntreval, just that will execute immediately but always after any open callbacks have always been executed ( at least finish open callbacks that were due to be handled in that current iteration). At end of each iteration cycle and now Node.js will execute all close event callbacks, so if you registered any close events , this would be the point of time where nodejs executes their appropriate callbacks. We exit the whole Node.js program but only if there are no remaining event handlers which are registered. Node.js keeps track of its open event listeners and it basically has a counter, references or refs which it increments by 1 for every new callback that is registered, for every new event listener that is registered, so every new future work that it has to do and it reduces counter by 1 for every event listener that it doesn't need anymore, every callback it finished and since in a server environment we create a server with create server and then listen to incoming requests with listen, this is an event which never is finished by default and therefore we always have at least one reference and therefore we don't exit in a normal node web server program.




Splitting app.js and route.js


app.js

const http = require("http");
const routes = require("./route");
const server = http.createServer(routes);
server.listen(3000);



route.js

const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button>Send</button> </form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Node.js page</title></head>");
  res.write("<body>My first Node.js Body</body>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;




To export we use 'module.exports'.




'  npm init ' command used to create package.json file


Node packages

Node packages include express, body-parser

eg:

npm install nodemon --save-dev

this will install nodemon as production dependency. This above command will give package-lock.json and node_modules.

Delete 'node_modules' and do 'npm install' again which will create dependencies and 'node_modules'

In 'package.json' and in 'scripts' session add "start" : "node app.js" and then change 'start to "start" : "nodemon app.js" and run in the terminal command 'npm start'




Types Of errors

Syntax errors, runtime errors, logical errors



Framework 

Framework is a helper functions, tools and rules that help you build your application.


Express

Express is Node.js framework a package that adds a bunch of utility functions and tools a clear set of rules on how app should be built (middleware). Express is highly extensible by adding other packages into middleware.

Express is highly flexible and actually doesn't add too much functionalities out of the box but it gives a certain way to build your application or work with the incoming requests that makes it highly extensible and there are a lot of third party packages built for express that can then easily add to your node express without having to configure a lot.Command to install express


npm install --save express



import express like below from express library:-

const express = require("express");

Create an express application and store it in a constant named app by running express as a function (like below) :-

const app = express();

Here the above line the express framework will store and manage a lot of things behind the scenes. So, a lot of logic are there in 'app' constant. 'app' can also be a request handler which can be passed in 'createServer'
(like below)

const server = http.createServer(app);


Full example:-

const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);
server.listen(3000);




Middleware

Middleware means that an incoming request is automatically tunneled through a bunch of functions by Express.js. Instead of one request handler, there will be a possibility of hooking in multiple functions which the request will go through until you sent a response. This allows to split the code into multiple blocks or pieces instead of having one huge function. Express.js can add third party packages which give you such middleware functions that you can plug into express.js and add certain functionalities.

Express relies on middleware functions, can easily add them by calling use().
Middleware functions handles a request and should call next() to forward the request to next function in line or send a response.

eg:-

app.use((req, res, next) => {  //one middleware
    next();                   
});
app.use((req, res, next)=>{  //another middleware
   res.send("<h1>Hello from Express</h1>");
    
})

here 'use' allows to add a new middleware function, 'use' accepts an array of request handlers. We pass a function as an argument to 'use' and the function you pass a function as an argument will be executed for every incoming request and this function will receive 3 arguments. 3 arguments include 'req', 'res' and 'next'. the function passing in 'use' is receiving another function in the 'next' argument. The function receiving in 'next' has to be executed to allow the request to travel to next middleware.
If we use 'next();' in one middleware only it will go to the next middleware. If we dont give 'next();' then the middleware where the request handled in present will give back response to the request and dont go to the next middleware.
'  res.send();' in this 'send()' is used to sent the response and send() allows to attach a body of type any.
Here 'res.send("<h1>Hello from Express</h1>");' will pass an html header with content 'Hello from Express' and the content type is set as text/html.
After passing ' res.send("<h1>Hello from Express</h1>");' the request wont goto further middleware as the response is generated from this middleware.

Full example:-

const http = require("http");
const express = require("express");

const app = express();

app.use((req, res, next) => {
  next();
});
app.use((req, res, next) => {
  res.send("<h1>Hello from Express</h1>");
});

const server = http.createServer(app);
server.listen(3000);


In the above code these 2 lines

const server = http.createServer(app);
server.listen(3000);

can be shorthand to the following

app.listen(3000);



In app.use([path,] callback [, callback..])


path - the path for which middleware is invoked, can be any of:
A string representing a path, A path pattern, a regular expression pattern to match paths
callback functions can be a middleware function, a series of middleware functions, an array of middleware functions

example:-
app.use("/", (req, res, next) => {
  next();
});

app.use("/add-product", (req, res, next) => {
  res.send("<h1>Hello World</h1>");
});
app.use("/", (req, res, next) => {
  res.send("<h1>Hello from Express</h1>");
});

for this when the path is '/add-product' then this middleware is called.

for all other routes we call the following middleware

app.use("/", (req, res, next) => {
  res.send("<h1>Hello from Express</h1>");
});


Middleware that allows the request to continue:-

app.use("/", (req, res, next) => {
  next();
});

In the below example when going to '/add-product' and entering the form data then its redirected to '/product' because the action is written link to '/product'. In '/product' middleware we just redirect to '/'.

example:-

const http = require("http");
const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  next();
});
app.use("/add-product", (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});
app.use("/product", (req, res, next) => {
  res.redirect("/");
});
app.use("/", (req, res, next) => {
  res.send("<h1>Hello from Express</h1>");
});

app.listen(3000);


The order in which middleware matters if path is same for those middleware.
parsing of body would be done in a middleware, by typing this command

npm install --save body-parser

eg:-

const http = require("http");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/add-product", (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});
app.use("/product", (req, res, next) => {
 console.log(req.body);
  res.redirect("/");
});
app.use("/", (req, res, next) => {
  res.send("<h1>Hello from Express</h1>");
});

app.listen(3000);



In this 'app.use(bodyParser.urlencoded());'  middleware function call next in the end, so the request also reaches other middleware before this  it will do the whole request body parsing. But this doesn't parse bodies, files , json. But can parse data from a form which we do it here in this example above. To parse non-default features we use 'extended: false' 
The ' console.log(req.body);' will hence get the form value as key 'title' (since we give name as title) and value as value we have entered in the input form field. Like this - '{ title: 'bini' }'


To fire incoming request we use 'get' instead of 'use' like below

app.get("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

It specifies that its a 'get' method. Hence the above middleware will apply only for get request. If 'post' method we use 'post' instead of 'use' like below

app.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

Hence the above middleware will apply only for post request.
Similarly we use other http methods also like 'patch', 'delete' instead of 'use'.



Express Router

Router is a mini express app which we can export and with router we can register. 'router' in below example can call get and post methods.

In routes/admin.js

const express = require("express");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});
router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;


we registered routes here like above example. Here router functions work exactly same as 'app.use'. We import routes/admin get and post routes in app.js file (like const adminRoutes = require("./routes/admin");) and call it in 'app.use(adminRoutes);'

In app.js

const adminRoutes = require("./routes/admin");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);

app.use("/", (req, res, next) => {
  res.send("<h1>Hello from Express</h1>");
});

app.listen(3000);


In routes/shop.js

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("<h1>Hello from Express</h1>");
});

module.exports = router;




Rewriting app.js


const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);

app.use(shopRoutes);
app.listen(3000);


To introduce 404 error in the application we add the below lines in app.js. Here 'status(404)' sets the status code and 'send' shown below sets the message in webpage as 'Page not found'.

app.use((req, res, next)=>{
    res.status(404).send('<h1>Page not found</h1>')
})

When we try to access different page route which isn't registered then we will get the message in webpage as 'Page not found'.

Full app.js

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);

app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found</h1>");
});
app.listen(3000);


Here 'app.use('/admin', adminRoutes);' uses /admin in front of middleware file paths , where here '/admin' is a common path for all the middleware paths in adminRoutes. Hence, app.js is rewritten as follows:-

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found</h1>");
});
app.listen(3000);




And in routes/admin.js ( i.e adminRoutes) we need to change form used in '/add-product' middleware form action as '/admin/product' because '/admin' is common over every middleware in routes/admin.js ( i.e adminRoutes) . Like below



const express = require("express");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.send(
    '<form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});
router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;





Creating HTML pages

views folder is where we store HTML pages (Any name can be given to the folder other than views).


In shop.js the following code

router.get("/", (req, res, next) => {
  res.send("<h1>Hello from Express</h1>");
});


is changed to the following


router.get("/", (req, res, next) => {
  res.sendFile("./views/shop.html");
});
 

Here 'sendFile' will take in file which has HTML code from shop.html. The sendFile first argument is the path location of file. 

//shop.html


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Add Product</title>
  </head>

  <body>
    <header>
      <nav>
        <ul>
          <li><a href="/">Shop</a></li>
          <li><a href="/admin/add-product">Add Product</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <h1>My Products</h1>
      <p>List of all the products...</p>
    </main>
  </body>
</html>




//shop.js

const path = require("path");

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.sendFile("./views/shop.html");
});

module.exports = router;


path.join() returns a path but it constructs this path by concatenating the different segments First segment we pass in 'path.join()' is global variable made available by Node.js, (i.e dirname) is a global variable which holds the absolute path on our operating system to this project folder and then we add a comma and add views because the first segment (i.e dirname) holds the path to whole project folder. Third segment is the folder which holds the html file. Fourth segment is file name 'shop.html'  to html code we want to display.

Like below

 res.sendFile(path.join(__dirname, '../', "views", "shop.html"));


'../' denotes go one level up because '__dirname' points to 'routes' folder since the above line of code lies in routes/shop.js. So, to go to 'views' folder we use '../'

Similarly we change the code for routes/admin.js and app.js

 routes/admin.js

const express = require("express");
const path = require("path");
const router = express.Router();

//     /admin/add-product with GET
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
});
//    /admin/product with POST
router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;



app.js

const path = require("path");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "./", "views", "404.html"));
});
app.listen(3000);



404.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Not Found</title>
  </head>
  <body>
    <h1>Page Not Found</h1>
  </body>
</html>






Helper function for Navigation

util/path.js



const path = require("path");

module.exports = path.dirname(process.mainModule.filename);

here 'mainModule' denotes app.js and filename is file this module file was spun up (gives the path to file which is responsible for the fact that our application is running and this filename is what we put in dirname to get a path to that directory.
Import util/path.js with the following command 'const rootDir = require("../util/path");' in 'routes/admin.js'. And replace the code in 'routes/admin.js' with 'rootDir'

router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});





routes/admin.js

const express = require("express");
const path = require("path");
const router = express.Router();

const rootDir = require("../util/path");

//     /admin/add-product with GET
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});
//    /admin/product with POST
router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;


  

Serving file statically

add css in a different file like public/css/main.css and add css in this file location rather than relying on style tag where css is added in html file.

In app.js

app.use(express.static(path.join(__dirname, "public")));


In app.js we will find for 'public' folder


In shop.html

 <link rel="stylesheet" href="/css/main.css" />



In 'public' folder there is 'css' folder and in 'css' folder we have main.css




Sharing data across requests and users

//    route/admin.js

const express = require("express");
const path = require("path");
const router = express.Router();

const rootDir = require("../util/path");

const products = [];

//     /admin/add-product with GET
router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});
//    /admin/product with POST
router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;



here 'const products = [];' array created to store the form request body in add-product. Which is done above code extracted one shown below

router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});


In shop.js we can use this 'products' array shown below



const path = require("path");

const express = require("express");
const rootDir = require("../util/path");
const adminData = require("./admin");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log(adminData.products);
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;




Templating Engine

Available templating engines include EJS, Pug(Jade), Handlebars

EJS looks something like this:-

<p><%= name %></p>

EJS use normal HTML and plain JavaScript in the template

Pug uses the following syntax:-

p #{name}

Pug uses minimal HTML and custom template language


Handlebars uses the following syntax:-

<p>{{name}}</p>

Handlebars uses normal HTML and custom template language





Installing and implementing pug

npm install --save ejs pug express-handlebars


app.set()

app.set() used to set global values (i.e configuration values, keys) in express.js

app.get() will get the value which is set.

'view engine' tells express for any dynamic templates we render 

'view' allows to tell express where to find these dynamic views.


app.set("view engine", "pug");

'pug' is used here, where the installed pug templating engine and this engine ships built in express support and auto registers with express

tells application where to find the view

app.set('views', 'views')

second argument in set() (i.e views) is the folder 'views' where the views file that is the html file that exists.


app.js

const path = require("path");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);

app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
app.listen(3000);




In 'views' folder create shop.pug file

shop.pug

<!DOCTYPE html>
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        title Shop
        link(rel="stylesheet", href="/css/main.css")
        link(rel="stylesheet", href="/css/product.css")
    body     
        header.main-header
            nav.main-header__nav
                ul.main-header__item-list
                    li.main-header__item
                        a.active(href="/") Shop 
                    li.main-header__item
                        a(href="/admin/add-product") Add Product
        main 
            h1 My Products
            p List of all the products...


In shop.js

this line of code 

router.get("/", (req, res, next) => {
   console.log(adminData.products);
   res.sendFile(path.join(rootDir, "views", "shop.html"));
  });



replaced with

router.get("/", (req, res, next) => {
   res.render("shop");
});


Here 'res' will not have to give path to shop.pug located in 'views' folder which is already given in app.js the 'views' folder ( app.set("views", "views"); )


In shop.js

router.get("/", (req, res, next) => {
  const products = adminData.products;
   res.render("shop", { prods: products, pageTitle: 'Shop' });
});


'products' will get the data we added in admin/add-product page and as the second argument to re.render we pass 'products' because the second argument should be given data which need to be displayed in the screen i.e 'products'. And to refer to the key 'prods' can be done to get the value 'products'. We can pass additional key value pair like ', pageTitle: 'Shop''.
And in 'shop.pug' we use  ' title #{pageTitle}'

routes/shop.js

const path = require("path");

const express = require("express");
const rootDir = require("../util/path");
const adminData = require("./admin");
const router = express.Router();

router.get("/", (req, res, next) => {
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  const products = adminData.products;
  res.render("shop", { prods: products, pageTitle: "Shop" });
});

module.exports = router;




In shop.pug '  each product in prods' we use this where prod return 'products' data from shop.js
we give '#{product.title}' in shop.pug because in routes/admin.js we added ' products.push({ title: req.body.title });' like below . Hence we can give in shop.pug file '#{product.title}'.


router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});



views/shop.pug


<!DOCTYPE html>
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        title #{pageTitle}
        link(rel="stylesheet", href="/css/main.css")
        link(rel="stylesheet", href="/css/product.css")
    body     
        header.main-header
            nav.main-header__nav
                ul.main-header__item-list
                    li.main-header__item
                        a.active(href="/") Shop 
                    li.main-header__item
                        a(href="/admin/add-product") Add Product
        main 
            .grid
                each product in prods
                    article.card.product-item
                        header.card__header
                            h1.product__title #{product.title}
                        div.card__image
                            img(src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAyj6ZVWbzlffOWIpG2Ld2Ud0ajBWHuF1g0A&s.jpeg" alt="A Book")

                        div.card__content
                            h2.product__price $19.99
                            p.product__description A very interesting book about so many even more interesting things!
                        .card__actions
                            button.btn Add to Cart







add-product.pug



<!DOCTYPE html>
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        title #{pageTitle}
    body 
         header.main-header
            nav.main-header__nav
                ul.main-header__item-list
                    li.main-header__item
                        a(href="/") Shop 
                    li.main-header__item
                        a.active(href="/admin/add-product") Add Product
        main 
            form.product-form(action="/admin/add-product", method="POST")
                div.form-control
                    label(for="title") Title
                    input(type="text",  name="title")#title
                button.btn(type="submit") Add Product






In routes/admin.js the following code is changed

 router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});



routes/admin.js


const express = require("express");
const path = require("path");
const router = express.Router();

const rootDir = require("../util/path");

const products = [];

//     /admin/add-product with GET
router.get("/add-product", (req, res, next) => {
  res.render("add-product", { pageTitle: "Add Product" });
});
//    /admin/product with POST
router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;





404.pug

doctype html
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        title Page Not Found
        link(rel="stylesheet", href="/css/main.css")
    body 
        header.main-header
            nav.main-header__nav
                ul.main-header__item-list
                    li.main-header__item
                        a(href="/") Shop 
                    li.main-header__item
                        a.active(href="/admin/add-product") Add Product
        h1 Page Not Found




In app.js the following code is changed


app.use((req, res, next) => {
   res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  });



replaced the app.js code with the following

app.use((req, res, next) => {
    res.status(404).render("404");
});




app.js


const path = require("path");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);

app.use(shopRoutes);

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});
app.listen(3000);









Layout

We can add layout to place the repeated code in the pug file.
For that we will place a 'layouts' folder in 'views' folder and create a file called main-layout.pug


views/layouts/main-layout.pug

doctype html
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        title Page Not Found
        link(rel="stylesheet", href="/css/main.css")
        block styles
    body 
        header.main-header
            nav.main-header__nav
                ul.main-header__item-list
                    li.main-header__item
                        a(href="/") Shop 
                    li.main-header__item
                        a(href="/admin/add-product") Add Product
        block content




Here ' block styles' will add extra styles depending upon page styles and ' block content' will add contents depending upon page contents



404.pug


extends layouts/main-layout.pug

block content 
    h1 Page Not Found

        



add-product.pug



extends layouts/main-layout.pug 

block styles 
    link(rel="stylesheet", href="/css/form.css")
    link(rel="stylesheet", href="/css/product.css")

block content
    main 
        form.product-form(action="/admin/add-product", method="POST")
            .form-control
                label(for="title") Title
                input(type="text",  name="title")#title
            button.btn(type="submit") Add Product






shop.pug




extends layouts/main-layout.pug 

block styles
    link(rel="stylesheet", href="/css/product.css")

block content
  main 
    if prods.length > 0
        .grid
            each product in prods
                article.card.product-item
                    header.card__header
                        h1.product__title #{product.title}
                    div.card__image
                        img(src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAyj6ZVWbzlffOWIpG2Ld2Ud0ajBWHuF1g0A&s.jpeg" alt="A Book")

                    div.card__content
                        h2.product__price $19.99
                        p.product__description A very interesting book about so many even more interesting things!
                    .card__actions
                        button.btn Add to Cart
    else 
        h1 No Products






Changing this code in routes/admin.js by adding path (we can give any path)


router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
});  



And change the following line of codes in views/layout/main-layout.pug to add active


li.main-header__item
                        a(href="/admin/add-product", class=(path==='/admin/add-product' ? 'active' : '')) Add Product







views/layout/main-layout.pug




doctype html
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        title #{pageTitle}
        link(rel="stylesheet", href="/css/main.css")
        block styles
    body 
        header.main-header
            nav.main-header__nav
                ul.main-header__item-list
                    li.main-header__item
                        a(href="/", class=(path==='/' ? 'active' : '')) Shop 
                    li.main-header__item
                        a(href="/admin/add-product", class=(path==='/admin/add-product' ? 'active' : '')) Add Product
        block content










Working with handlebars

install handlebars with the following command

npm install --save express-handlebars@3.0


In app.js import handlebars:-

const expresshbs = require("express-handlebars");

Need to tell the engine used is handlebars witht the following line of code:-

app.engine("handlebars", expresshbs());

Here we named the engine '"handlebars"  an passed the engine to 'expresshbs()'. Then the following line of code

app.engine("handlebars", expresshbs());
app.set("view engine", "handlebars");




app.js


const path = require("path");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const bodyParser = require("body-parser");
const express = require("express");
const expresshbs = require("express-handlebars");

const app = express();

app.engine("handlebars", expresshbs());
app.set("view engine", "handlebars");
// app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);

app.use(shopRoutes);

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});
app.listen(3000);









views/404.handlebars



<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{pageTitle}}</title>
    <link rel="stylesheet" href="/css/main.css" />
  </head>
  <body>
    <header class="main-header">
      <nav class="main-header__nav">
        <ul class="main-header__item-list">
          <li class="main-header__item"><a href="/">Shop</a></li>
          <li class="main-header__item">
            <a href="/admin/add-product">Add Product</a>
          </li>
        </ul>
      </nav>
    </header>
    <h1>Page Not Found</h1>
  </body>
</html>




views/add-product.handlebars


<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>{{pageTitle}}</title>
    <link rel="stylesheet" href="/css/main.css" />
    <link rel="stylesheet" href="/css/forms.css" />
    <link rel="stylesheet" href="/css/product.css" />
  </head>

  <body>
    <header class="main-header">
      <nav class="main-header__nav">
        <ul class="main-header__item-list">
          <li class="main-header__item"><a href="/">Shop</a></li>
          <li class="main-header__item">
            <a class="active" href="/admin/add-product">Add Product</a>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <form class="product-form" action="/admin/add-product" method="POST">
        <div class="form-control">
          <label for="title"><title></title></label>
          <input type="text" id="title" name="title" />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </main>
  </body>
</html>




In shop.js we add a key called 'hasProducts', since in handlebars viewengine we cannot pass a conditional expression. Hence ewe checks if 'products.length > 0' in  'hasProducts' in 'routes/shop.js'


router.get("/", (req, res, next) => {
   const products = adminData.products;
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
  });
});






shop.handlebars


<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>{{pageTitle}}</title>
    <link rel="stylesheet" href="/css/main.css" />
    <link rel="stylesheet" href="/css/product.css" />
  </head>

  <body>
    <header class="main-header">
      <nav class="main-header__nav">
        <ul class="main-header__item-list">
          <li class="main-header__item"><a class="active" href="/">Shop</a></li>
          <li class="main-header__item">
            <a href="/admin/add-product">Add Product</a>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      {{#if hasProducts}}
        <div class="grid">
          {{#each prods}}
            <article class="card product-item">
              <header class="card__header">
                <h1 class="product__title">{{this.title}}</h1>
              </header>
              <div class="card__image">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAyj6ZVWbzlffOWIpG2Ld2Ud0ajBWHuF1g0A&s.jpeg"
                  alt="A Book"
                />
              </div>
              <div class="card__content">
                <h2 class="product__price">$19.99</h2>
                <p class="product__description">A very interesting book about so
                  many even more interesting things!</p>
              </div>
              <div class="card__actions">
                <button class="btn">Add to Cart</button>
              </div>
            </article>
          {{/each}}
        </div>
      {{else}}
        <h1>No Product Found</h1>
      {{/if}}
    </main>
  </body>
</html>






In app.js change the lines to the following 'layoutDir' shows the folder location and 'defaultLayout' is name of file of layout here its 'main-layout' file.

app.engine(
  "handlebars",
  expresshbs({
    layoutDir: "views/layouts/",
    defaultLayout: "main-layout",
  })
);


In 'views/layout/main-layout.handlebars' add  {{{body}}} for adding extra code other than common code as pasted in layout, so add ' {{{body}}}' this in 'views/layout/main-layout.handlebars'


In routes/shop.js we will add 'activeShop' and 'productCSS' key and set to true if '/' link is there in url. layout set to false because otherwise it will take default (like below)


routes/shop.js 


cconst path = require("path");

const express = require("express");
const rootDir = require("../util/path");
const adminData = require("./admin");
const router = express.Router();

router.get("/", (req, res, next) => {
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  const products = adminData.products;
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    productCSS: true,
    activeShop: true,
  });
});

module.exports = router;




views/layouts/main-layout.handlebars   :-


<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{pageTitle}}</title>
    <link rel="stylesheet" href="/css/main.css" />
    {{#if formsCSS}}
      <link rel="stylsheet" href="/css/forms.css" />
    {{/if}}
    {{#if productCSS}}
      <link rel="stylsheet" href="/css/product.css" />
    {{/if}}
  </head>
  <body>
    <header class="main-header">
      <nav class="main-header__nav">
        <ul class="main-header__item-list">
          <li class="main-header__item"><a class="{{#if activeShop }}active{{/if}}" href="/">Shop</a></li>
          <li class="main-header__item">
            <a class="{{#if activeAddProduct }}active{{/if}}" href="/admin/add-product">Add Product</a>
          </li>
        </ul>
      </nav>
    </header>
    {{{body}}}
  </body>
</html>



routes/admin.js

const express = require("express");
const path = require("path");
const router = express.Router();

const rootDir = require("../util/path");

const products = [];

//     /admin/add-product with GET
router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    activeAddProduct: true,
    productCSS: true,
    formCSS: true,
  });
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
});
//    /admin/product with POST
router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;




views/shop.handlebars


<main>
  {{#if hasProducts}}
    <div class="grid">
      {{#each prods}}
        <article class="card product-item">
          <header class="card__header">
            <h1 class="product__title">{{this.title}}</h1>
          </header>
          <div class="card__image">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAyj6ZVWbzlffOWIpG2Ld2Ud0ajBWHuF1g0A&s.jpeg"
              alt="A Book"
            />
          </div>
          <div class="card__content">
            <h2 class="product__price">$19.99</h2>
            <p class="product__description">A very interesting book about so
              many even more interesting things!</p>
          </div>
          <div class="card__actions">
            <button class="btn">Add to Cart</button>
          </div>
        </article>
      {{/each}}
    </div>
  {{else}}
    <h1>No Product Found</h1>
  {{/if}}
</main>









views/add-product.handlebars


<main>
  <form class="product-form" action="/admin/add-product" method="POST">
    <div class="form-control">
      <label for="title"><title></title></label>
      <input type="text" id="title" name="title" />
    </div>

    <button type="submit">Add Product</button>
  </form>
</main>














Working with EJS

In EJS we use <% variable_name %> format to display a variable name in ejs file. Eg:-<%= pageTitle %>



app.js


const path = require("path");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const bodyParser = require("body-parser");
const express = require("express");


const app = express();
app.set("view engine", "ejs");

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);

app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});
app.listen(3000);






views/404.ejs



<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= pageTitle %></title>
    <link rel="stylesheet" href="/css/main.css" />
  </head>
  <body>
    <header class="main-header">
      <nav class="main-header__nav">
        <ul class="main-header__item-list">
          <li class="main-header__item"><a href="/">Shop</a></li>
          <li class="main-header__item">
            <a href="/admin/add-product">Add Product</a>
          </li>
        </ul>
      </nav>
    </header>
    <h1>Page Not Found</h1>
  </body>
</html>




views/add-product.ejs


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title><%= pageTitle %></title>
    <link rel="stylesheet" href="/css/main.css" />
    <link rel="stylesheet" href="/css/forms.css" />
    <link rel="stylesheet" href="/css/product.css" />
  </head>

  <body>
    <header class="main-header">
      <nav class="main-header__nav">
        <ul class="main-header__item-list">
          <li class="main-header__item"><a href="/">Shop</a></li>
          <li class="main-header__item">
            <a class="active" href="/admin/add-product">Add Product</a>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <form class="product-form" action="/admin/add-product" method="POST">
        <div class="form-control">
          <label for="title"><title></title></label>
          <input type="text" id="title" name="title" />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </main>
  </body>
</html>




In views/shop.ejs we are giving a condition and in condition we give '<% if (prods.length > 0) { %>' and closing tag like and adding else block '<% } else { %> <h1>No Products</h1> <% } %>'. For a for loop we use ' <% for(let product of prods) { %>' and closing tag   '<% } %>'


views/shop.ejs


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title><%= pageTitle %></title>
    <link rel="stylesheet" href="/css/main.css" />
    <link rel="stylesheet" href="/css/product.css" />
  </head>

  <body>
    <header class="main-header">
      <nav class="main-header__nav">
        <ul class="main-header__item-list">
          <li class="main-header__item"><a class="active" href="/">Shop</a></li>
          <li class="main-header__item">
            <a href="/admin/add-product">Add Product</a>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <% if (prods.length > 0) { %>
      <div class="grid">
        <% for(let product of prods) { %>
        <article class="card product-item">
          <header class="card__header">
            <h1 class="product__title"><%= product.title %></h1>
          </header>
          <div class="card__image">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAyj6ZVWbzlffOWIpG2Ld2Ud0ajBWHuF1g0A&s.jpeg"
            />
          </div>
          <div class="card__content">
            <h2 class="product__price">$19.99</h2>
            <p class="product__description">
              A very interesting book about so many even more interesting
              things!
            </p>
          </div>
          <div class="card__actions">
            <button class="btn">Add to Cart</button>
          </div>
        </article>
        <% } %>
      </div>
      <% } else { %>
      <h1>No Products</h1>
      <% } %>
    </main>
  </body>
</html>




Common code we place in a folder named 'includes' in 'views' (can be of any name). Created 3 files in 'includes' folder 'head.ejs', 'end.ejs' and 'navigation.ejs'.


views/includes/head.ejs


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= pageTitle %></title>
    <link rel="stylesheet" href="/css/main.css" />
  </head>
</html>


views/includes/navigation.ejs

<header class="main-header">
  <nav class="main-header__nav">
    <ul class="main-header__item-list">
      <li class="main-header__item">
        <a class="<%= path === '/' ? 'active' : '' %>" href="/">Shop</a>
      </li>
      <li class="main-header__item">
        <a
          class="<%= path === '/admin/add-product' ? 'active' : '' %>"
          href="/admin/add-product"
          >Add Product</a
        >
      </li>
    </ul>
  </nav>
</header>



views/includes/end.ejs

 </body>
</html>



To include the above code in every file we can do with this statement '<%- include('includes/head.ejs') %>', where 'include' is the keyword to include the file and 'includes/head.ejs' is the file location, '<%- %>' we use this way in ejs to include a ejs file to reuse.


views/layouts/404.ejs


<%- include('includes/head.ejs') %>
  </head>
  <body>
    <%- include('includes/navigation.ejs') %>
    <h1>Page Not Found</h1>
 <%- include('includes/end.ejs') %>




views/layouts/add-product.ejs



<%- include('includes/head.ejs') %>
 <link rel="stylesheet" href="/css/forms.css" />
    <link rel="stylesheet" href="/css/product.css" />
  </head>

  <body>
  <%- include('includes/navigation.ejs') %>

    <main>
      <form class="product-form" action="/admin/add-product" method="POST">
        <div class="form-control">
          <label for="title"><title></title></label>
          <input type="text" id="title" name="title" />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </main>
 <%- include('includes/end.ejs') %>




views/layouts/shop.ejs



<%- include('includes/head.ejs') %>
   <link rel="stylesheet" href="/css/product.css" />
  </head>

  <body>
    <%- include('includes/navigation.ejs') %>

    <main>
      <% if (prods.length > 0) { %>
      <div class="grid">
        <% for(let product of prods) { %>
        <article class="card product-item">
          <header class="card__header">
            <h1 class="product__title"><%= product.title %></h1>
          </header>
          <div class="card__image">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAyj6ZVWbzlffOWIpG2Ld2Ud0ajBWHuF1g0A&s.jpeg"
            />
          </div>
          <div class="card__content">
            <h2 class="product__price">$19.99</h2>
            <p class="product__description">
              A very interesting book about so many even more interesting
              things!
            </p>
          </div>
          <div class="card__actions">
            <button class="btn">Add to Cart</button>
          </div>
        </article>
        <% } %>
      </div>
      <% } else { %>
      <h1>No Products</h1>
      <% } %>
    </main>
  <% include('includes/end.ejs') %>













Model View Controller

Models - represents your data in your code and allows to work with the data (saving data, fetching data).

Views - responsible for what user sees and are responsible for rendering right content in html documents and sending that back to user so they are decoupled from application code and having some minor integrations regarding the data we inject into templating engine to generate these views.

Controllers - Connection point between models and views. Controllers working with the models, saving that data or triggering save process , also the part they pass data that are fetched to your views. Controller defines which model to work and which view to render.

Routes - defines path for which http method which controller code should
 execute



Controllers

Create 'controllers' folder , and in 'controllers' folder create a product.js. In product.js we cut the code from admin.js and place it here and export it to pass it to 'routes/admin.js'. (like below)

controllers/product.js


const products = [];

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    activeAddProduct: true,
    productCSS: true,
    formCSS: true,
  });
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
};

exports.postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    productCSS: true,
    activeShop: true,
  });
};






const productsController = require("../controllers/products");

router.get("/add-product", productsController.getAddProduct);

router.post("/add-product", productsController.postAddProduct);

module.exports = router;




Full code in 'routes/admin.js'

const express = require("express");
const path = require("path");
const router = express.Router();
const productsController = require("../controllers/products");
router.get("/add-product", productsController.getAddProduct);
router.post("/add-product", productsController.postAddProduct);

module.exports = router;



In app.js change the following code

const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);



Full app.js code


const path = require("path");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();
app.set("view engine", "ejs");

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render("404", { pageTitle: "Page Not Found", path: "" });
});
app.listen(3000);




routes/shop.js


const path = require("path");

const express = require("express");
const rootDir = require("../util/path");
const adminData = require("./admin");
const router = express.Router();

const productsController = require("../controllers/products");

router.get("/", productsController.getProducts);

module.exports = router;






For page not found page we can add controller for that in 'controllers' folder add 'error.js' file and add the following code
In routes/admin.js we change the code like this

exports.pageNotFound = (req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "" });
};



And in app.js

const errorController = require("./controllers/error");
app.use(errorController.pageNotFound);



Full app.js

const path = require("path");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const bodyParser = require("body-parser");
const express = require("express");

const errorController = require("./controllers/error");

const app = express();
app.set("view engine", "ejs");

app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use(errorController.pageNotFound);
app.listen(3000);






Model

Create 'model' folder in root and add 'product.js' file in 'model' folder.

In 'model/product.js' we want to receive a title for the product which will then create from inside my controller
The following code snippet 

constructor(t) {
    this.title = t;
  }

't' is the title we receive from controller

'save' method in class Product (like below) will push product & 'this' refers to the current variable.


const products = [];
module.exports = class Product {
  constructor(t) {
    this.title = t;
  }
  save() {
    products.push(this);
  }
static fetchAll() {
 return this.products;
}
};


'static fetchAll() {}' the method 'fetchAll()' is called static because can call this method on class itself and not on an instantiated object.
the method 'fetchAll()' will return all products.

model/product.js

const products = [];
module.exports = class Product {
  constructor(t) {
    this.title = t;
  }
  save() {
    products.push(this);
  }
  static fetchAll() {
     return products;
  }
};



In controllers/product.js we change the code as shown below when we use model. 'const product = new Product(req.body.title);' will add to the variable the product value and save() method will add all products added.
'const products = Product.fetchAll();' will fetch the products.


controllers/product.js


const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    activeAddProduct: true,
    productCSS: true,
    formCSS: true,
  });
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
 const products = Product.fetchAll();
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    productCSS: true,
    activeShop: true,
  });
};




Storing data into file via model



Storing data into file via model instead of 'products' array shown in the above code (i.e in model/product.js).
Create a folder 'data' in root.

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

the above line to create a file 'products' in folder 'data.

fs.readFile(p, (err, fileContent)=>{
     let products =[];
      if(!err){
            products = JSON.parse(fileContent);
        }   
   products.push(this); 
 fs.writeFile(p, JSON.stringify(products), (err)=>{
        
      })
    });

the above line will read from the file 'products.json' where data was already existing. 'fileContent' is the data and 'err' is when error occurs when file reading. if no error occurs then pase through the file content into the array 'products'. 'fs.writeFile(p, JSON.stringify(products)' write the products array into the file.
JSON parse will convert text to array


model/product.js



const fs = require("fs");
const path = require("path");

const products = [];
module.exports = class Product {
  constructor(t) {
    this.title = t;
  }
  save() {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {});
    });
  }
   static fetchAll(callBack) {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        callBack([]);
      }
      callBack(JSON.parse(fileContent));
    });
    return products;
  }



callback function passed in 'fetchAll' method where I will get data. Therefore in 'controllers/products.js' we change the following code to below

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      productCSS: true,
      activeShop: true,
    });
  });
};


In models/products.js we use a helper function for 'fetchAll' and 'save' with 'getProductFromFile'. 

models/products.js


const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductFromFile = (callBack) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return callBack([]);
    } else {
      return callBack(JSON.parse(fileContent));
    }
  });
};

const products = [];
module.exports = class Product {
  constructor(t) {
    this.title = t;
  }
  save() {
    getProductFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {});
    });
  }
  static fetchAll(callBack) {
    getProductFromFile(callBack);
  }
};



Create 'admin' folder in views and transfer 'add-product.ejs' file to  'admin' folder, create 'edit-product.ejs', 'products.ejs' in 'views/admin' folder. Create 'shop' folder in views and transfer 'product-list.ejs' file to  'shop' folder, create 'index.ejs', 'cart.ejs', 'checkout.ejs' and 'product-detail.ejs' in 'views/shop' folder. 


view/includes/navigation.ejs

<header class="main-header">
  <nav class="main-header__nav">
    <ul class="main-header__item-list">
      <li class="main-header__item">
        <a class="<%= path === '/' ? 'active' : '' %>" href="/">Shop</a>
      </li>
      <li class="main-header__item">
        <a class="<%= path === '/products' ? 'active' : '' %>" href="/products"
          >Products</a
        >
      </li>
      <li class="main-header__item">
        <a class="<%= path === '/cart' ? 'active' : '' %>" href="/cart">Cart</a>
      </li>
      
      <li class="main-header__item">
        <a
          class="<%= path === '/admin/add-product' ? 'active' : '' %>"
          href="/admin/add-product"
          >Add Product</a
        >
      </li>
      <li class="main-header__item">
        <a
          class="<%= path === '/admin/products' ? 'active' : '' %>"
          href="/admin/products"
          >Admin Products</a
        >
      </li>
    </ul>
  </nav>
</header>


Added navigation link to 'products', 'cart', 'checkout' and 'admin/prodcuts'.



In routes/admin.js we add 'router.get('/products');' 



const express = require("express");
const path = require("path");
const router = express.Router();
const productsController = require("../controllers/products");
// const rootDir = require("../util/path");

//     /admin/add-product with GET
router.get("/add-product", productsController.getAddProduct);

//      /admin/products
router.get('/products');
//    /admin/product with POST
router.post("/add-product", productsController.postAddProduct);

module.exports = router;

routes/shop.js

const path = require("path");

const express = require("express");
const rootDir = require("../util/path");
const adminData = require("./admin");
const router = express.Router();

const productsController = require("../controllers/products");

router.get("/", productsController.getProducts);

router.get("/products");

router.get("/cart");

router.get("/checkout");

module.exports = router;



Added path for 'products', 'cart', 'checkout'




Create 2 new files inside 'controllers' file they are 'admin.js', and replacing the name of 'controllers/products.js' to 'controllers/shop.js'. In 'controllers/shop.js' the 'getAddProduct' and 'postAddProduct' transferred to 'controllers/admin.js'.


controllers/admin.js


const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    activeAddProduct: true,
    productCSS: true,
    formCSS: true,
  });
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};




change routes/admin.js as follows



const express = require("express");
const path = require("path");
const router = express.Router();
const adminController = require("../controllers/admin");
// const rootDir = require("../util/path");

//     /admin/add-product with GET
router.get("/add-product", adminController.getAddProduct);

//      /admin/products
router.get("/products");
//    /admin/product with POST
router.post("/add-product", adminController.postAddProduct);

module.exports = router;



In controllers/shop.js add the following 

const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Prodcuts",
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
         });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};


In routes/shop.js we change the following line

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/cart", shopController.getCart);

router.get("/orders", shopController.getOrders);

router.get("/checkout", shopController.getCheckout);

routes/shop.js

const path = require("path");

const express = require("express");
const rootDir = require("../util/path");
const adminData = require("./admin");
const router = express.Router();

const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/cart", shopController.getCart);

router.get("/checkout", shopController.getCheckout);

module.exports = router;



In controllers/admin.js add the following

exports.getProducts = (req, res, next) => {
  Product.fetchAll((product) => {
    res.render("admin/products", {
      prods: product,
      path: "/admin/products",
      pageTitle: "Admin Prodcuts",
    });
  });
};


In 'models' folder in 'product.js' we change the following code


models/product.js

const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductFromFile = (callBack) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return callBack([]);
    } else {
      return callBack(JSON.parse(fileContent));
    }
  });
};

const products = [];
module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save() {
    getProductFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {});
    });
  }
  static fetchAll(callBack) {
    getProductFromFile(callBack);
  }
};



views/admin/add-product.ejs


<%- include('../includes/head.ejs') %>
 <link rel="stylesheet" href="/css/forms.css" />
    <link rel="stylesheet" href="/css/product.css" />
  </head>

  <body>
  <%- include('../includes/navigation.ejs') %>

    <main>
      <form class="product-form" action="/admin/add-product" method="POST">
        <div class="form-control">
          <label for="title">Title</label>
          <input type="text" id="title" name="title" />
        </div>
        <div class="form-control">
          <label for="imageUrl">Image Url</label>
          <input type="text" id="imageUrl" name="imageUrl" />
        </div>
        
        <div class="form-control">
          <label for="price">Price</label>
          <input type="number" id="price" name="price" step="0.01"
 />
        </div>
        <div class="form-control">
          <label for="description">Description</label>
          <textarea id="description" name="description" rows="5"></textarea>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </main>
 <%- include('../includes/end.ejs') %>




In controllers/admin.js add the following code


exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};




Add 'add' link and 'delete' button in 'views/admin/products.ejs'


views/admin/products.ejs


<%- include('../includes/head.ejs') %>
   <link rel="stylesheet" href="/css/product.css" />
  </head>

  <body>
    <%- include('../includes/navigation.ejs') %>

    <main>
      <% if (prods.length > 0) { %>
      <div class="grid">
        <% for(let product of prods) { %>
        <article class="card product-item">
          <header class="card__header">
            <h1 class="product__title"><%= product.title %></h1>
          </header>
          <div class="card__image">
            <img
              src="<%= product.imageUrl %>" alt="<%= product.title %>"
            />
          </div>
          <div class="card__content">
            <h2 class="product__price">$ <%= product.price %></h2>
            <p class="product__description">
             <%= product.description %>
            </p>
          </div>
          <div class="card__actions">
            <a class="btn" href="/admin/edit-product">Add </a>
            <form action="/admin/delete-product" method="POST">
              <button class="btn" type="submit">Delete</button>
            </form>
            
          </div>
        </article>
        <% } %>
      </div>
      <% } else { %>
      <h1>No Products</h1>
      <% } %>
    </main>
  <% include('../includes/end.ejs') %>



In views/shop folder create 'orders.ejs'


views/shop/orders.ejs


<%- include('../includes/head.ejs') %>
  </head>

  <body>
    <%- include('../includes/navigation.ejs') %>
    <main>
        Nothing there
    </main>
    <%- include('../includes/end.ejs') %>






Add Product id


In models/product.js we need to generate unique id hence we give this '    this.id = Math.random().toString();' in 'save()' method

models/product.js

  save() {
    this.id = Math.random().toString();
    getProductFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {});
    });
  }


In 'views/shop/product-list.ejs' we add a details button for a particular product for a particular id. Like shown below


views/shop/product-list.ejs


<div class="card__actions">
   <a href="/products/<%= product.id %>" class="btn">Details</a>
   <form action="/add-to-cart" method="POST">
    <button class="btn">Add to Cart</button>
    </form>
</div>



In the routes folder from the url we will extract the id and that id can be passed to controller for further processing




Extracting Dynamic Params


In 'routes/shop.js' we add the following route path

router.get("/products/:productId", shopController.getProduct);


In controllers/shop.js add new controller and extract 'productId' with this statement 'const prodId = req.params.productId' shown below

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  res.redirect('/')
};




Loading Product detail data


In models/product.js we add a method 'findById' shown below where 'cb' is callback

static findById(id, cb) {
    getProductFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }

Edit the controllers/shop.js as below


exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => console.log(product));
  res.redirect("/");
};





product-detail.ejs

<%- include('../includes/head.ejs') %>
    </head>

    <body>
        <%- include('../includes/navigation.ejs') %>
        <main class="centered">
           <h1><%= product.title %></h1>
           <hr>
           <div>
            <img src="<%= product.imageUrl %>" alt="<%= product.title %>" />
           </div>
           <h2><%= product.price %></h2>
           <p>
            <%= product.description %>
           </p>
           <form action="/cart" method="post">
            <button type="submit" class="btn">Add to Cart</button>
           </form>
        </main>
        <%- include('../includes/end.ejs') %>



In 'controllers/shop.js' change the code for 'getProduct' controller

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render("shop/product-detail", {
      product: product,
      path: "/products",
      pageTitle: product.title,
    });
  });
};




Passing Data with POST requests

For method Post we add all the items in html into body

In 'product-list.ejs' we add the following 'input' tag to div of class 'card__actions', to pass 'product.id'


<div class="card__actions">
  <a href="/products/<%= product.id %>" class="btn">Details</a>
  <form action="/add-to-cart" method="POST">
    <button class="btn">Add to Cart</button>
    <input type="hidden" name="productId" value="<%= product.id %>" />
  </form>
</div>



In controllers/shop.js add new controller, since 'name' given in input tag as above is 'productId' hence we give 'productId'  as shown below


exports.postCart = (req, res, next) => {
  const prodId = res.body.productId;
  res.redirect('/cart')
}; 



In routes/shop.js place the following code


router.post("/cart", shopController.getCart);





create 'cart.js' in 'models' folder



models/cart.js



const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      if (!err) {
        try {
          cart = JSON.parse(fileContent);
        } catch (e) {
          console.error("Invalid cart.json, resetting cart.");
        }
      }

      // Find existing product
      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct, qty: existingProduct.qty + 1 };
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products.push(updatedProduct);
      }

      // Add to total
      cart.totalPrice = cart.totalPrice + +productPrice;

      // Write updated cart
      fs.writeFile(p, JSON.stringify(cart, null, 2), err => {
        if (err) {
          console.error("Error writing to cart.json:", err);
        } else {
          console.log("Cart updated successfully.");
        }
      });
    });
  }
};



controllers/shop.js, 'postCart' edited as follows

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      console.log("Product not found:", prodId);
      return res.redirect("/cart");
    }
    Cart.addProduct(prodId, product.price);
    res.redirect("/cart");
  });
};





Using QueryParam

Query parameters in the url are followed by '?' then separated by '&' each query paramters are a comination of key value pair where key and value separated by '='

eg:

http://localhost:3000/edit-product/123456?edit=true&title=editProduct


where 'edit=true' and 'title=editProduct' are query parameters 

Delete 'add-product.ejs' and make the following change in controllers/admin.js for 'getAddProduct' and add extra controller 'getEditProduct' 


controllers/admin.js


exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
};


exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
  if(!product){
      return res.redirect('/')
    }

    res.render("admin/edit-product", {
      path: "admin/edit-product",
      pageTitle: "Edit Product",
      editing: editMode,
      product: product,
    });
  });
};




For '  const editMode = req.query.edit;' inside 'getEditProduct' above code here 'edit' will be the query parameter key in the url and the value passed to 'edit' will be given to the variable 'editMode'. But the value we get in 'editMode' is a string. 'productId' can be extracted from url paramters then extracting the product for the corresponding 'productId' and pass as 'product' to 'product' key


In routes/admin.js add the new router


router.get("/edit-product/:productId", adminController.getEditProduct);


Prepopulating title of product in views/admin/edit-product as follows


<div class="form-control">
                <label for="title">Title</label>
                <input type="text" name="title" id="title" value="<% if(editing) { %><%= product.title %><% } %>">
            </div>




Entire 'views/admin/edit-product'



<%- include('../includes/head.ejs') %>
    <link rel="stylesheet" href="/css/forms.css">
    <link rel="stylesheet" href="/css/product.css">
</head>

<body>
   <%- include('../includes/navigation.ejs') %>

    <main>
        <form class="product-form" action="/admin/<% if(editing) { %>edit-product<% } else { %>add-product<% } %>" method="POST">
            <div class="form-control">
                <label for="title">Title</label>
                <input type="text" name="title" id="title" value="<% if(editing) { %><%= product.title %><% } %>">
            </div>
            <div class="form-control">
                <label for="imageUrl">Image URL</label>
                <input type="text" name="imageUrl" id="imageUrl" value="<% if(editing) { %><%= product.imageUrl %><% } %>">
            </div>
            <div class="form-control">
                <label for="price">Price</label>
                <input type="number" name="price" id="price" step="0.01" value="<% if(editing) { %><%= product.price %><% } %>">
            </div>
            <div class="form-control">
                <label for="description">Description</label>
                <textarea name="description" id="description" rows="5" ><% if(editing) { %><%= product.description %><% } %></textarea>
            </div>

            <button class="btn" type="submit"><% if(editing) { %>Update Product<% } else { %>Add Product<% } %></button>
        </form>
    </main>
<%- include('../includes/end.ejs') %>






In views/admin/product.ejs


 <div class="card__actions">
  <a href="/admin/edit-product/<%= product.id %>?edit=true" class="btn">Edit</a>
  <form action="/admin/delete-product" method="POST">
    <button class="btn" type="submit">Delete</button>
  </form>
 </div>





Editing the Product data



In routes/admin.js add the following router for post request


router.post("edit-product");


In controllers/admin.js





In models/product.js editing the save method as follows


 save() {
    getProductFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProduct = [...products];
        updatedProduct[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {});
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {});
      }
    });
  }



we add a 'hidden' input in 'edit-product.ejs' to get the product id in the post body of he controller as follows


 <% if (editing) { %>
             <input type="hidden" value="<%= product.id %>" name="productId" />
            <% } %>



Then add 'postEditProduct' controller in 'controllers/admin.js'. Since, its a POST request we get 'title', 'imageUrl', 'price' and 'description' from body then we call the constructor of Product to update the updated product values and then save using 'save()' method shown as follows

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDescription,
    updatedPrice
    
  );
  updatedProduct.save();
  res.redirect("/admin/products");
};



In routes/admin.js add the following


router.post("edit-product", adminController.postEditProduct);



To delete the product


In views/admin/product.ejs edit the code as follows


<form action="/admin/delete-product" method="POST">
  <input type="hidden" value="<%= product.id %>" name="productId" />
  <button class="btn" type="submit">Delete</button>
</form>


In routes/admin.js


router.post('/delete-product', adminController.postDeleteProduct)


In models/product.js


static deletById(id) {
    getProductFromFile((products) => {
      const updatedProducts = products.filter((prod) => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {});
    });
  }




in modes/cart.js

static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) return;

      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find((prod) => prod.id === id);
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart, null, 2), (err) => {
        if (err) {
          console.error("Error writing to cart.json:", err);
        } else {
          console.log("Cart updated successfully.");
        }
      });
    });
  }



In controllers/admin.js



exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deletById(prodId);
  res.redirect('/admin/products')
};




Display Cart Items


models/cart.js

 static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }




conrollers/shop.js


exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductdata = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cart.products.find((prod) => prod.id === product.id)) {
          cartProducts.push({ productData: product, qty: cartProductdata.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};






views/shop/cart.ejs



<%- include('../includes/head.ejs') %>
    </head>

    <body>
        <%- include('../includes/navigation.ejs') %>
        <main>
            <% if(products.length > 0) { %>
                <ul>
                    <% products.forEach(p => { %>
                      <li>
                        <p>
                          <%= p.productData.title %> (<%= p.qty %>)
                        </p>
                        <form action="/cart-delete-item" method="post">
                           <input type="hidden" name="productId" value="<%= p.productData.id %>" />
                         <button class="btn" type="submit">Delete</button>
                        </form>
                       </li>
                    <% }); %>
                </ul>
            <% } else { %>
                <h1>No Products in Cart</h1>
            <% } %>
        </main>
        <%- include('../includes/end.ejs') %>





In routes/shop.js

router.post("/cart-delete-item", shopController.postCartDeleteProduct);


In controllers/shop.js

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};




    
