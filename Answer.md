**1. Explain the relationship between the "Product" and "Product_Category" entities from the above diagram**.
 => In product and product category entities each product is associated with a specific product category ,the category id in  product table is a foreign key which references to the id in profuct category table.
  the category id is storing the storing the data related to the category associated with the product.



**2. How could you ensure that each product in the "Product" table has a valid category assigned to it?**
 By usign a middleware function that is executed before saving a product document which will check if categoryId is modified and query the productCategory table to check if the categoryId is valid,if a valid id exists then the product is saved in  table else an error will be thrown. 
