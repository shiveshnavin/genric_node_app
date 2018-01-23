 
var express = require('express')
var Handlebars = require('handlebars');
var fs=require('fs')
var app = express()
var mysql=require('mysql')
var mos=require('mustache')
var mustache=require('mustache')

var sql=mysql.createConnection({
  host:"127.0.0.1",
  user:"root",
  password:"pass",
  database:"exploman"
})
var path=__dirname+"/views"
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
/**********************/
let compilehtml=function(source,data){
  if(source==null)
      source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
      "{{kids.length}} kids:</p>" +
      "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";
  if(data==null)
      data = { "name": "Alan", "hometown": "Somewhere, TX",
      "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};

      var template = Handlebars.compile(source);
      var result = template(data);
      return  result;

}






app.get('/', function(request, response) {
  console.log('HTTP Call Triggred !')
  response.send('Hello World!')
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
  
    }
})

app.all('/kids',function(req,res){


    var source = "<p>Hello, my name is {{name}}. I am from {{hometown}}. I have " +
        "{{kids.length}} kids:</p>" +
        "<ul>{{#kids}}<li>{{name}} is {{age}}</li>{{/kids}}</ul>";
    var template = Handlebars.compile(source);

    var data = { "name": "Alan", "hometown": "Somewhere, TX",
        "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
    var result = template(data);

    res.send(result);

})



app.get('/get_conf',function(req,resp){
  
    console.log("Configuration Requested : "+req)  
    resp.setHeader('content-type', 'application/json');
  
    resp.json({
      id:"IOT183E3",
      ap_ssid:"MONG_TEST",
      ap_pass:"password",
      sta_ssid:"jarvis",
      sta_pass:"goforit@delhi"
    })
  
})

var hbs = require('express-handlebars').create();
 
app.get('/test',function(req,res){

  var html_test=fs.readFileSync(path+'/empty/test_m.html')
  var html=hbs.renderView(path+'/empty/test_m.html', {name:"AAa"} )
  res.send(html)



})


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
 
 