// storeLogLine.js
//
// node storeLogLine.js <unquoted log message>
//
//
// The log message should be of the format:
// <month> <day of month> <24-hour time in hh:mm:ss> <host> <service name[pid]>: Actual message
//


/*mongo cmd :
    show dbs : show databases
    use 'aDB': use aDB database
    db  : show current database name
    show collections : show collections in current database
    db.dropDatabase() : delete database that you current use

    db.'aCollection'.find() : show all info in 'aCollection'
    db.'aCollection'.find().count() : count objects
    db.'aCollection'.find().limit(4) : output first 4 objects 
    db.'aCollection'.find().pretty() : show info in object format
    db.'aCollection'.find({$or:[{name:"bob"},{name:"allen"}]}) : find multi result
    db.'aCollection'.find({age:{$gt:50}}) : find age greater than 50
    db.'aCollection'.find({age:{$lt:50}}) : find age less than 50
    db.'aCollection'.find().sort({name:1}) : sort output ascendant
    db.'aCollection'.find().sort({name:-1}) : sort output descendant

    db.'aCollection'.insert({object}) : insert object 

    db.'aCollection'.update({obj:"value"},{obj1:"value1"}) : update object discard original
    db.'aCollection'.update({obj:"value"},{$set:{obj1:"value1"}}) : update object and keep original properties
    db.'aCollection'.update({obj:"name"},{$unset:{age:50}}) : delete property
    db.'aCollection'.update({age:50},{$inc:{age:5}}) : increase age by 5
    db.'aCollection'.update({obj:"name"},{obj:"name",gender:"male"},{upsert:true}) : if dont have gender then add one 

    db.'aCollection'.remove({name:"bob"},{justOne:true}) : remove one object with name as "bob"   



*/
var mc = require('mongodb').MongoClient;

const fs = require('fs')

const readFileName = "./sample.log.txt"
let entryFile = readFileName
const dbName = 'compWinter'
const collectionName = 'sample'

let done = false
let database
let c //client 
let searchResult = []

let outputFile = process.argv[2]
let maxcount = process.argv[3]
let service = process.argv[4]
let message = process.argv[5]



function readFile() {
    fs.readFile(entryFile, (err, data) => {
        if (err) throw err
        let lines = []
        lines = data.toString().split('\n')
        lines.forEach((line, index) => {
            let lineInfo = []
            if (index == lines.length - 1) {
                done = true
            }
            if (line) {
                lineInfo = line.split(' ')
                // console.log(lineInfo)
                let entry = {}
                if (lineInfo.length > 5) {
                    entry.date = lineInfo[0] + " " + lineInfo[1];
                    entry.time = lineInfo[2];
                    entry.host = lineInfo[3];
                    entry.service = lineInfo[4].slice(0, -1);  // drop the trailing colon
                    entry.message = lineInfo.slice(5).join(' ');//argv[6] rest 
                    database.insertOne(entry, reportInserted);
                }
            }

        })
    })

}


function search(_outputFile, _maxcount, _service, _message) {
    let find  = database.find()

    if (_service && _message) {
        find = database.find({ service: { $regex: `${_service}`, $options: "i" }, message: { $regex: `${_message}`, $options: "i" } })
    }

    if (_service) {
        find = database.find({ service: { $regex: `${_service}`, $options: "i" } })
    }
    if (_message) {
        find = database.find({ message: { $regex: `${_message}`, $options: "i" } })
    }

    if (_maxcount) {
        find.limit(Number(_maxcount))
    }
    find.toArray((err, data) => {
        if (err) throw err
        for (dataObj of data) {
            searchResult.push(dataObj)
        }
        //write result file
        writeResult()
    })

}

var reportInserted = function (err, result) {
    if (err) throw err;

    console.log("Inserted the following log record:");
    console.log(result.ops[0]);
}

var connectCallback = function (err, client) {
    if (err) throw err

    c = client
    database = client.db(dbName).collection(collectionName)

    //detect flags
    if(outputFile&&outputFile.indexOf('results')!==-1){
        outputFile = outputFile.slice(outputFile.indexOf("=")+1)
    }
    if(maxcount&&maxcount.indexOf('maxcount')!==-1){
        maxcount = maxcount.slice(maxcount.indexOf("=")+1)
    }
    if(service&&service.indexOf('service')!==-1){
        if(service.match(/"(.*?)"/g)){
            service = service.match(/"(.*?)"/g).slice(1,-1)
        }
        service = service.slice(service.indexOf("=")+1)
    }
    if(message&&message.indexOf('message')!==-1){
        if(message.match(/"(.*?)"/g)){
            message = message.match(/"(.*?)"/g).slice(1,-1)
        }
        message = message.slice(message.indexOf("=")+1)
    }

    // if database is not exist then insert file
    database.count((err, data) => {
        if (err) throw err
        if (data === 0) {
            readFile()
            if (done) {
                search(outputFile, maxcount, service, message)
            }
        }
        //already have collection name
        else {
            search(outputFile, maxcount, service, message)
        }
    })

}


function writeResult() {
    //convert object to string line
    let outputStr = ''
    //construct string from array of objects
    for (let resultObj of searchResult) {

        for (let resultObjKey in resultObj) {
            //delete id property
            if (resultObjKey === '_id') {
                delete resultObj[resultObjKey]
            }
            //add dropped colon
            if (resultObjKey === 'service') {
                resultObj[resultObjKey] += ':'
            }
            //build output string
            if (resultObj[resultObjKey]) {
                outputStr += resultObj[resultObjKey] + ' '
            }
        }
        //switch lines
        outputStr += '\n'
    }
    if (outputFile) {
        fs.writeFile(outputFile, outputStr, (err) => {
            if (err) throw err
            console.log('write file done')
            c.close()
        })
    }
    console.log(`your result: ${outputStr}`)
    c.close()
}

mc.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true }, connectCallback);
