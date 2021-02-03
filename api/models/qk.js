import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const quakeSchema = new Schema({
    location: {type: String, required: [true, 'Earthquake location']},
    coordinates: {type: String, required: [true, 'Earthquake location']},
    date: {type: Date, default: Date.now}
});

const quake = mongoose.model('Quake', quakeSchema);

export default quake;
