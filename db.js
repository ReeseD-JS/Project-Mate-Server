const Sequelize = require('sequelize');

const sequelize = new Sequelize ('ProjectMateServer', 'postgres', 'Prospects10!', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to Project Mate Server')
    }, function (err) {
        console.log(err);
    }
);

module.exports = sequelize;