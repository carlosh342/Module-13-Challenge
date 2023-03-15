const router=require("express").Router();
const{category,product}=require("../../models");

router.get("/",(req,res)=>{
  category.findALL({
    include:{
      model:product,
      attributes:["id","product_name","price","stock","category_id"]
    }
  })
  .then(dbCatData=>{
    if(!dbCatData){
     res.status(404).json({message:"No categories were found !!"})
     return;
    }
    res.json(dbCatData);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json(err)
  });
});

router.get("/:id",(req,res)=>{
    category.findOne({
        where:{
            id:req.params.id
        },
        include:{
            model:product,
            attributes:["id","product_name","price","stock","category_id"]
        }
    })
    .then(dbCatData =>{
        if(!dbCatData){
            res.status(404).json({message:"No categories were found !!"});
            return;
        }
        res.json(dbCatData);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err)
    });
});

router.post("/",(req,res)=>{
    category.create({
        category_name: req.body.category_name
    })
    .then(dbCatData =>res.json(dbCatData))
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.put("/id",(req,res)=>{
    category.update(req.body,{
        where:{
            id: req.params.id
        }
    })
    .then(dbCatData =>{
        if(!dbCatData){
            res.status(404).json({message:"No categories found associted with this id"});
            return;
        }
        res.json(dbCatData);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete("/:id",(req,res)=>{
    category.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(dbCatData =>{
        if(!dbCatData){
            res.status(404).json({message: "No category associated with this id"});
            return;
        }
         res.json(dbCatData);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;