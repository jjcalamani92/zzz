
import mongoose, { Schema, model, Model } from 'mongoose';
import { UserS } from '../interfaces';
import { uuidv4 } from '../utils/uuid';

const userSchema = new Schema({
    _id: {type: String},
    username    : { type: String, required: true },
    email   : { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: {
            values: ['ADMIN_ROL','CLIENT_ROL', 'USER_ROL'],
            message: '{VALUE} no es un role válido',
            default: 'USER_ROLE',
            required: true
        }
    },
    sites: [{ type: String}],
    status: { type: Boolean, default: true},
    google: { type: Boolean},

}, {
    timestamps: true,
})

const User:Model<UserS> = mongoose.models.User || model('User',userSchema);
userSchema.pre<UserS>('save', function (next) {
  this._id = this._id || uuidv4();
  this.username = this.username.toLowerCase();
  this.email = this.email.toLowerCase();
  next();
});
export default User;