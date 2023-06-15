const express = require('express')
const app = express()

// const connections = require("./connection")
// const knex = connections.knex
// const connection = connections.connection

const {connection, knex} = require("./connection")

//adding bodyparser to express.
const bodyparser = require('body-parser')
app.use(bodyparser.json())


//////////////////////QUERIES/////////////////////////////////////
const getAllCountries = (req, res)=> {
    connection.query('select * from countries', (err, result)=>{
        if (err) {
            // console.log(err);
            res.status(500).send(err)
        } else {
            // console.log(result);
            res.json(result)
        }
    } )
}

//add country by query
const addCountry = (newCountry) => {
    connection.query("insert into countries (Name) values (?) ", [newCountry.Name], (err,result)=> {
        if (err) {
             console.log(err);
        } else {
            console.log(result);
        }
    })
}

//get all airlines with knex
const selectAirlinesKnex = async ()=> {
    // const result = await knex.raw("select * from airlines")
    const result = await knex.select().table("airlines")
    return result
}

//insert airline with knex
const addAirline = async (airline)=> {
    const result = await knex('airlines').insert(airline)
    return result
}



////////////////////////////////////APIS//////////////////////////////////

//api to add airline to the table
app.post("/api/addAirline", async (req, res) => {
    try {
        const newAirline = req.body //get the new json airline
        const result = await addAirline(newAirline)
        res.json(result)
    } catch(err) {
        res.status(500).send(err)
    }
})

//first Knex api get all countries
app.get("/api/getAirlines", async (req, res) => {
    try {
        //result of the query
        const result = await selectAirlinesKnex()
        //return json response
        res.json(result)
    } catch(err) {
        res.status(500).send(err)
    }
})

//deleted
//app.delete()

//update
//app.put()///

app.post("/api/addCountry", (req,res) => {
    const newCountry = req.body //get the new json country
    addCountry(newCountry)
    res.send("finished")
})

app.get("/api/getCountries", (req, res) => {
    getAllCountries(req, res)
   // res.send("query is done")
})




app.get("/", (req, res) => {
    res.send("hello world")
})


const port = 4000
app.listen(port, (err)=> {
    if (err) {
        console.log(err);
    } else {
        console.log(`the server is up. to access it go to localhost:${port}`)
    }
})



///HOMEWORK \
//CREATE API to UPDATE THE COLUMN IN THE COUNTIRES
//CREATE API TO REMOVE AIRLINE
//YOU CAN DO IT WITH KNEX AND WITH SIMPLE MYSQL2