import { Schema, model } from 'mongoose';


const productSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    desc: String,
    SKU:String,
    categoryId: { type: Schema.Types.ObjectId, ref: 'ProductCategory', required: true },
    discountId: { type: Schema.Types.ObjectId, ref: 'Discount' },
    inventoryid:{ type: Schema.Types.ObjectId, ref: 'ProductInventory'},
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
    deletedAt: Date
});


const productCategorySchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  desc: String,
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
  deletedAt: Date,
});


const productInventorySchema = new Schema({
  id: { type: Number, required: true, unique: true },
  quantity:{type:Number,required:true},
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
  deletedAt: Date,
});

const discountSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  desc: String,
  discountPercent: { type: Number, required: true },
  active: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
  deletedAt: Date,
});

productSchema.pre('save', function(next) {
    const product = this;
    if (!product.isModified('categoryId')) {
      return next();
    }
    ProductCategory.findOne({ _id: product.categoryId, deletedAt: null })
      .then( res => {
        if (res) {
          return next();
        } else {
          return next(new Error('Invalid categoryId'));
        }
      })
      .catch(err => next(err));
  });


export const ProductCategory = model('ProductCategory', productCategorySchema);
export const Product = model('Product', productSchema);
export const ProductInventory = model('ProductInventory', productInventorySchema);
export const Discount = model('Discount', discountSchema);