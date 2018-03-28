module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "airbnb-base",
    "rules": {
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "off"
        ],
        "comma-dangle": [
            "error", {
                "objects": "never"
            }
        ],
        "no-plusplus": [
            "off"
        ],
        "no-param-reassign": [
            "off"
        ]
    }
};