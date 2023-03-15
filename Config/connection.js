const sequelize =require("sequelize");
require("dotenv").config();

let sequelize_id;

if(process.env.JAWSDB_URL){
 sequelize_id= new sequelize(process.env.JAWSDB_URL);
}else{
 sequelize_id=new sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PW,{
    host:"localhost",
    dialect:"mysql",
    port:3306
 });
}
module.exports=sequelize_id;