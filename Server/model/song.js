// Created by Spades<spadesge@gmail.com> on 18/03/28

const mongoose = require('mongoose')

const { Schema } = mongoose

const songSchema = new Schema({
    song: {
        name: String,
        link: {
            type: String,
            unique: true
        }
    },
    artists: [{
        name: String,
        link: String
    }],
    album: {
        name: String,
        link: String
    },
    from: String,
    traffic: {
        type: Number,
        default: 0
    }
})

mongoose.model('Song', songSchema)

