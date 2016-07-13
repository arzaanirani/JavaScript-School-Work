// Model to store the choices for a question

module.exports = function(sequelize, DataTypes) {

    var Choice = sequelize.define('Choice', {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false           
        },
        isAnswer: {
        	type: DataTypes.BOOLEAN,
        	allowNull: false
        }
    }
  );

    return Choice;
};
