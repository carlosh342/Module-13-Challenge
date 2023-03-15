const router = require("express").Router();
const{product,category,tag,producttag} =require("../../models");

router.get("/",(req,res)=>{
    product.findALL({
        attributes:["id","product_name","price","stock"],
        include:[
            {
                model:category,
                attributes:["category_name"]
            },
            {
                model:tag,
                attributes:["tag_name"]
            }
        ]
    })
    .then(dbProductData => res.json(dbProductData))
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/id", (req,res)=>{
    product.findOne({
        where:{
            id: req.params.id
        },
        attributes: ["id","product_name","price","stock"],
        include: [
           { model: category,
             attributes:["category_name"]
        },{
            model: tag,
            attributes: ["tag_name"]
        }
        ]
    })
    .then(dbProductData =>{
        if(!dbProductData){
            res.status(404).json({message:"No product associated with this id found"})
            return;
        }
        res.json(dbProductData)
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});
router.post("/",(req,res)=>{
    product.create({
        product_name: req.body.product_name,
        price: req.body.price,
        stock: req.body.stock,
        category_id: req.body.category_id,
        tag_id: req.body.tag_id
    })
    .then((product)=>{
        if(req.body.tag_id.length){
            const producttag_Array=req.body.tag.map((tag_id)=>{
                return{
                    product_id: product.id,
                    tag_id,
                }
            })
        return producttag.bulkCreate(producttag_Array);
        }
        res.status(200).json(product);
    })
    .then((producttag_id)=>res.status(200).json(producttag_id))// maybe error
    .catch((err)=>{
        console.log(err);
        res.status(400).json(err);
    });
});
router.put("/id", (req,res)=>{
    product.update(req.body,{
        where:{
            id: req.params.id,
        },
    })
    .then((product)=>{
        return producttag.findAll({where:{product_id:req.params.id}});
    })
    .then(producttag=>{
        const producttag_id =producttag.map(({tag_id})=>tag_id);
        const newproduct_tag=req.body.tag
        .filter((tag_id)=>!producttag_id.includes(tag_id))
        .map((tag_id)=>{
            return{
                product_id: req.params.id,
                tag_id,
            };
        });
    const producttags_remove=producttag
     .filter(({tag_id})=>!req.body.tag.includes(tag_id))
     .map(({id})=>id);
     return promises.all([
        producttag.destroy({where:{id:producttags_remove}}),
        producttag.bulkCreate(newproduct_tag)
     ])
    })
    .then((updated_prducttags)=>res.json(updated_prducttags))
    .catch((err)=>{
        res.status(400).json(err);
    })
})
router.delete("/:id",(req,res)=>{
    product.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(dbProductData=>{
        if(!dbProductData){
            res.status(404).json({message: "No product found associated with this id"});
            return;
        }
        res.json(dbProductData);
    }) 
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})
module.exports=router;