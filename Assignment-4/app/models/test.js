//model to store test information

module.exports = function(sequelize, DataTypes) {

    var Test = sequelize.define('Test', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false           
        }
    });

    return Test;
};
