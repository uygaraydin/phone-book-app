var db = require('../models/dbconnection');
const personel = require('../models/personelModel');

var Personel={
 
    /* getAll:function(callback){
        return db.query("Select * from rurehber.dahililer where dahili_id = 1",function(err, rows, fields){
            if (err) throw err;
            console.log(rows[0]);
         });
    }, */
    
    getById:function(req, res, next){
        console.log(req.params.id);
        const id = req.params.id;
        
        return db.query(
            `SELECT
            d.dahili_id,
            d.adsoyad,
            b.birim,
            d.altbirim,
            d.gorev,
            d.email,
            d.telefon,
            d.dahili,
            u.unvan_adi
            FROM rurehber.dahililer d 
            INNER JOIN rurehber.unvanlar u ON d.unvan = u.unvan_id
            INNER JOIN rurehber.birimler b ON d.birim = b.birim_id
            WHERE dahili_id = ? LIMIT 1`
            
            , id, function(err, rows, fields){
            if (err) throw err;
            res.status(200).json({
                dahili_id : rows[0].dahili_id,
                adsoyad : rows[0].adsoyad,
                birim : rows[0].birim,
                altbirim : rows[0].altbirim,
                gorev : rows[0].gorev,
                email : rows[0].email,
                telefon : rows[0].telefon,
                dahili : rows[0].dahili,
                unvan_adi : rows[0].unvan_adi
            });
         });
    },

    search:function(req, res, next){

        var reqObj = req.body;
        searchKey = reqObj.q;

        return db.query(
            `SELECT
            d.dahili_id,
            d.adsoyad,
            b.birim,
            d.altbirim,
            d.gorev,
            d.email,
            d.telefon,
            d.dahili,
            u.unvan_adi
            FROM rurehber.dahililer d 
            INNER JOIN rurehber.unvanlar u ON d.unvan = u.unvan_id
            INNER JOIN rurehber.birimler b ON d.birim = b.birim_id
            WHERE adsoyad LIKE ?`,
            '%' + searchKey + '%',function(err, rows, fields){
            if (err) throw err;
            res.status(200).json({
                rows
            });
        });
    },

    searchByInstitue:function(req, res, next){

        var reqObj = req.body;
        searchKey = reqObj.q;

        return db.query(
            `SELECT
            d.dahili_id,
            d.adsoyad,
            b.birim,
            d.altbirim,
            d.gorev,
            d.email,
            d.telefon,
            d.dahili,
            u.unvan_adi
            FROM rurehber.dahililer d 
            INNER JOIN rurehber.unvanlar u ON d.unvan = u.unvan_id
            INNER JOIN rurehber.birimler b ON d.birim = b.birim_id
            WHERE b.birim LIKE ?`,
            '%' + searchKey + '%',function(err, rows, fields){
            if (err) throw err;
            res.status(200).json({
                rows
            });
        });
    }
     
};

module.exports=Personel;