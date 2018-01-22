var express = require('express')
var app = express()
var mysql=require('mysql')

var sql=mysql.createConnection({

  host:"127.0.0.1",
  user:"root",
  password:"pass",
  database:"exploman"

})


var exec=function(sql_str,callback){

    console.log("Executing : "+sql_str)

    sql.query(sql_str,function(err,result){
      
      if(err) throw err
      callback(result)

    })


}


sql.connect(function(err){

  if(err) throw err
  console.log("Mysql Connection Success !")
   
})


app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.get('/', function(request, response) {
  console.log('HTTP Call Triggred !')
  response.send('Hello World!'+request.getElementsByTagName(''))
})


app.get('/sql',function(req,resp){
 
    console.log("Request : "+req)
    resp.setHeader('content-type', 'application/json');
    var q=req.query.sql
    if(q){

      exec(q,function(result){
        console.log("SQL Result SUCCESS ")
        resp.json((result))
      })
  /**/
    }
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
