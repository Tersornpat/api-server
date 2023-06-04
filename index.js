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
const myuser = require('./api/hospital-myuser')
const nLab = require('./api/hospital-n-lab')
const packageDetail = require('./api/hospital-package-detail')
const patient = require('./api/hospital-patient')
const position = require('./api/hospital-position')
const proserType = require('./api/hospital-proser-type')
const proser = require('./api/hospital-proser')
const report = require('./api/hospital-report')
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

//Router /myuser/
app.use('/myuser', myuser)

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

//Router /report/
app.use('/report', report)


//Router /treatment/
app.use('/treatment', treatment)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.listen(3030)