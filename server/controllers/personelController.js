var db = require('../models/dbconnection'); 

var Personel={
 
    getAll:function(callback){
        return db.query("Select * from dahililer",callback);
    },
    
    /* getById:function(id,callback){
        return db.query("select * from dahililer where dahili_id=?",[id],callback);
    },

    search:function(searchKey,callback){
        return db.query("select * from dahililer where adsoyad LIKE '%?%'",[searchKey],callback);
    } */
     
};

module.exports=Personel;