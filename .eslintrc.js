module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": 
    [
        "standard-with-typescript",
        "next", 
        "plugin:prettier/recommended",
        "prettier"],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "plugins": ["prettier"],
    "rules": {
        "@typescript-eslint/no-unused-vars": [
            "warn"
        ],
        "@typescript-eslint/strict-boolean-expressions": [
            "warn"
        ]
        
    }
}
