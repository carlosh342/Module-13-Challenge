const product =require("../product");
const category =require("./category");
const tag =require("../tag");
const producttag =require("../producttag");

product.belongsTo(category,{
    foreignKey : "category_id",
});
category.hasMany(Product,{
    foreignKey: "category_id",
});
product.belongsToMany(tag,{
    through: producttag,
    foreignKey:"product_id",
});

tag.belongsToMany(product,{
    through: producttag,
    foreignKey:"tag_id",
});

module.exports ={
    product,
    category,
    tag,
    producttag
};