const router =require("express").Router();
const{tag,product,producttag}=require("../../models");

router.get("/",(req,res)=>{
    tag.findAll({
        include:{
            model:product,
            attributes:["product_name","price","stock","category_id"]
        }
        .then(dbTagData => res.json(dbTagData))
        .catch(err =>{
            console.log(err);
            res.status(500).json(err);
        })
    })
router.get("/:id",(req,res)=>{
    tag.findOne({
        where:{
            id: req.params.id
        },
        include:{
            model:product,
            attributes:["product_name","price","stock","category_id"]
        }
    })
    .then(dbTagData => res.json(dbTagData))
    .catch(err =>{
        console.log(err);
        res.status(500).json(err)
    })
})
router.post("/",(req,res)=>{
    tag.create({
        tag_name:req.body.tag_name
    })
    .then
})
})