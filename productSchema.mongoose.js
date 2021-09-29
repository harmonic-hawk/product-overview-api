// import mongoose from 'mongoose';
// const { Schema } = mongoose;

const product = new Schema({
  name: { type: String, required: true },
  slogan: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  default_price: { type: String, required: true },
  features: [{ feature: { type: String }, value: { type: String } }],
  styles: [{
    name: { type: String },
    original_price: { type: String },
    sale_price: { type: String },
    default: { type: Boolean },
    photos: [{ thumbnail_url: { type: String }, url: { type: String } }],
    skus: { sku_id: { size: { type: String }, quantity: { type: Number } } },
  }],
  ratings: {
    one_star: { type: Number },
    two_star: { type: Number },
    three_star: { type: Number },
    four_star: { type: Number },
    five_star: { type: Number },
  },
});
