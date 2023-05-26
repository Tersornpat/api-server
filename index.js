const express = require('express')
const app = express()
const db = require('./ConnectDB');
const cors = require('cors');

const department = require('./api/hospital-department')
const employee = require('./api/hospital-employee')
const factor = require('./api/hospital-factor')
const inspectionDetail = require('./api/hospital-inspection-detail')
const listProser = require('./api/hospital-list-proser')
const mainAction = require('./api/hospital-main-action')
const nLab = require('./api/hospital-n-lab')
const packageDetail = require('./api/hospital-package-detail')
const patient = require('./api/hospital-patient')
const position = require('./api/hospital-position')
const proserType = require('./api/hospital-proser-type')
const proser = require('./api/hospital-proser')
const treatment = require('./api/hospital-treatment')


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = 4000;


app.get('/', (req, res) => {
    console.log("GET index")
    res.send("GET INDEX");
});
app.post('/', (req, res) => {
    console.log("POST index")
    res.send("POST INDEX");
});

//Router /department/
app.use('/department', department)

//Router /employee/
app.use('/employee', employee)

//Router /factor/
app.use('/factor', factor)

//Router /inspectionDetail/
app.use('/inspectionDetail', inspectionDetail)

//Router /listProser/
app.use('/listProser', listProser)

//Router /mainAction/
app.use('/mainAction', mainAction)

//Router /nLab/
app.use('/nLab', nLab)

//Router /packageDetail/
app.use('/packageDetail', packageDetail)

//Router /patient/
app.use('/patient', patient)

//Router /position/
app.use('/position', position)

//Router /proserType/
app.use('/proserType', proserType)

//Router /proser/
app.use('/proser', proser)

//Router /treatment/
app.use('/treatment', treatment)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




// const connection = mysql.createConnection({
//     host: 'tersornpat-db.ckifiguewtro.ap-southeast-1.rds.amazonaws.com',
//     port: 3306,
//     user: 'admin',
//     password: '12345678',
//     database: 'hospital-model'
//     });

// connection.connect((err) => {
// if (err) throw err;
// console.log('Connected to database');
// });

// app.get('/', function (req, res) {
// let json = {
//     username: 5,
//     text: "\u201cSorry, we are out of service in this moment\u201d",
//     time: "2023-03-25 11:10:20",
//     lottery: [0,1,2,3,4],
//     morekjs:{
//         id:777,
//         codename:{
//             name:"sornpat",
//             surname:"Hi"
//         }
//     }
// };
// res.json(json)

// res.send("Hello This Is Express with React")
// })

// app.post('/login',async  function (req, res) {
//     // const { username , password } = req.body;

//     const username = "sornpat";
//     const password =  2;

//     const sql = 'SELECT * FROM hpt_user WHERE username = ? AND password = ?;';

//     connection.query(sql, [username, password], (err, results) => {
//         if (err) throw err;
//         res.json(results);
//     });
// })

// app.get('/login',async  function (req, res) {
//     const sql = 'SELECT * FROM hpt_user;';
//     connection.query(sql, (err, results) => {
//     if (err) throw err;
//     res.json(results);
//     });
// })

app.listen(3030)