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
let entryFile = process.argv[2] || readFileName
const dbName = 'compWinter'
const collectionName = 'sample'
let done = false


// let defaultEntry = {
//     date: '01',
//     time: new Date().getTime(),
//     host: 'localhost',
//     service: 'theService',
//     message: 'using default entry'
// }



function readFile() {
    fs.readFile(entryFile, (err, data) => {
        if (err) throw err
        let lines = []
        lines = data.toString().split('\n')
        console.log(lines)

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
                    // console.log(entry)
                    c.db(dbName).collection(collectionName).insertOne(entry, reportInserted);

                    // callback()
                }
            }

        })
    })

}

let c
var reportInserted = function (err, result) {
    if (err) {
        throw err;
    }


    console.log("Inserted the following log record:");
    console.log(result.ops[0]);

    if (done) {
        c.close()
    }
}

var connectCallback = function (err, client) {
    if (err) {
        throw err;
    }
    // console.log(client)
    // console.log(entry)
    c = client

    readFile()


}





mc.connect('mongodb://127.0.0.1:27017', connectCallback);
