var csv = require("fast-csv"),
    fs = require("fs");
var csvName = process.argv[2];
var stream = fs.createReadStream("./input/" + csvName + ".csv");
var outputPath = "./output/rewrites_"+ csvName +".sql";
//var outputPath = "/DockerData/COCA2/build/rewrites_"+ csvName +".sql";
var initialValue = 194;

fs.exists(outputPath, function(exists) { 
  if (exists) { 
    fs.unlinkSync(outputPath);
  } 
}); 

var logger = fs.createWriteStream(outputPath, {
  flags: 'a'
});
var os = require("os");

csv
.fromStream(stream,  {headers : true})
.on("data", function(data){
for (var i = 1; i <= 19; i++) {
  var sqlLine = "INSERT IGNORE INTO url_rewrite(entity_type,entity_id,request_path,target_path,redirect_type,store_id,description,is_autogenerated,metadata) VALUES ('custom',"+initialValue+",'"+data.request_path+"','"+data.target_path +"',301,"+i+",NULL,0,NULL);"+os.EOL;
    
  logger.write(sqlLine);
}
initialValue++;

})
.on("end", function(){
  logger.end();
  console.log("Success! Let's go for some beers");
});
