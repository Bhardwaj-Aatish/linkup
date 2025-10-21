<!-- nodejs and typescript setup  -->
npm init -y
npm i --save-dev typescript ts-node @types/node nodemon
npx tsc --init
uncomment rootDir, outDir in tsconfig.json file
      -> tell where to looks ts file, and where to compile it
      -> isn't neccesary when using ts-node for development

Update the package.json files scripts and write {type: module} to allow ESM syntax
  "scripts": {
    "dev": "node --loader ts-node/esm src/index.ts",
    "chlo": "nodemon --watch src --ext ts --exec \"node --loader ts-node/esm src/index.ts\"",
    "build": "tsc -b",
    "start": "node dist/index.js",
    "prod": " tsc -b && node dist/index.js",
    "go": "nodemon --watch src --ext ts --exec 'tsc -b && node dist/index.js'"
  },

<!--start a server-->
npm i express
npm i @types/express
In app.ts, start a server with the endpoints, in index.ts listen server with try catch within the function

<!-- setting up the mongodb -->
npm install mongoose
copy the mongodb uri from mongodb atlas
        -> if forgot password -> go to databasae access under security
                              -> click on edit under actions and reset it

touch .env       in server
MONGO_URI = 'paste-url' in env file
npm i dotenv(no need for prod)
Inside index.ts -> use dotenv.config()
                -> After that, all the variable inside env are accessible via process.env.MONGO_URI in whole application

mongoose.connect(MONGO_URI) in config/db.ts file, use try catch inside function, await also
call the function in index.ts with await


<!-- define the database and schema -->
In mongodb_uri, write your database name after cluster0.kcfiu.mongodb.net/
    -> Default DB = test (if none mentioned in URI)
In model/user.ts file
    --> const userModel = mongoose.model('user', userSchema)
    --> 1 model name, 2 schema, 3 collection(plurarise from model name if not given i.e users)
Now, we can import usermodel, to do db editing, userModel.create({...}), userModel.findOne({...})


<!-- starting the route -->
You need to refernce the code, now
In index.ts 
   -> app.use(express.json()), before all routes
   -> app.use('/api/users', userRouter), import userRouter from './routes/userRouter.ts'
In userRouter.ts
   -> const router = express.Router()
   -> need to import userController, (basically a function which will trigger on specific endpoints i.e sign, signup)
   -> router.post('/sign', signin), router.post('/signup', signup)
In controller.ts 
    -> actual logic of signup and signin function separately. 


<!-- Writing the controller login  -->
npm i zod -> input validation, bcrypt -> password hashing, jsonwebtoken -> generating a token
   -> all as dependencies, as needed in production




