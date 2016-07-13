//model to store the question details

module.exports = function(sequelize, DataTypes) {

    var Question = sequelize.define('Question', {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false           
        }
    });

    return Question;
};
