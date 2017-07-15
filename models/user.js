module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      },
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    salt: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1],
      unique: true
    }
  });

  User.associate = function (models) {
    User.hasMany(models.Post, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return User;
};
