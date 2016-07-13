//model to store student information
module.exports = function(sequelize, DataTypes) {

    var Users = sequelize.define('Users', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false           
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }
  );

    return Users;
};
