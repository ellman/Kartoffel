import * as mongoose from 'mongoose';
import { IKartoffel } from './kartoffel.interface';

const ObjectId = mongoose.Schema.Types.ObjectId;

export const KartoffelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    admins: {
        type: [String],
        ref: 'User',
        default: []
    },
    members: {
        type: [String],
        ref: 'User',
        default: []
    },
    children: {
        type: [ObjectId],
        ref: 'Kartoffel',
        default: []
    },
    clearance: {
        type: Number,
        default: 0
    },
    ancestors: {
        type: [ObjectId],
        ref: 'Kartoffel',
        default: []
    },
    hierarchy: {
        type: [String],
        default: []
    },
    type: String,
    updatedAt: Date
});

KartoffelSchema.pre('save', function (next) {
    if (!this.updatedAt) this.updatedAt = new Date;
    next();
  });

  KartoffelSchema.pre('update', function() {
    this.update({}, { $set: { updatedAt: new Date() } });
  });

export const KartoffelModel = mongoose.model<IKartoffel>('Kartoffel', KartoffelSchema);
