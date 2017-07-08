module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }
  },
  {
      // We're saying that we want our User to have Posts
      classMethods: {
        associate: function(models) {
          // Associating User with Posts
          // When an User is deleted, also delete any associated Posts
          User.hasMany(models.Post, {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  return User;
};
