
const { NODE_ENV, JWT_SECRET } = process.env;
const jwtSecret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'

console.log(jwtSecret);

module.exports = {
    jwtSecret
}