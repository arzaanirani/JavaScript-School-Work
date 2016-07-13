// Model to save the Hint Requests from the student

module.exports = function(sequelize, DataTypes) {

    var HintRequest = sequelize.define('HintRequest', {
        correct: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });

    return HintRequest;
};
