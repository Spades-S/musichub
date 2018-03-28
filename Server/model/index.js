// Created by Spades<spadesge@gmail.com> on 18/03/28

const mongoose = require('mongoose')
const { db } = require('../config/index')


mongoose.connect(db, {
    poolSize: 10
}, (err) => {
    if (err) {
        console.log(`[mongoose err]   ${err}`)
        throw err
    }
})


require('./song')

module.exports = {
    Songs: mongoose.model('Song')
}
