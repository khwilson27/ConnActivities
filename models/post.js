module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      len: [1]
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      len: [1]
    },
    partnerId: {
      type: DataTypes.INTEGER
    },
    partnerUsername: {
      type: DataTypes.STRING
    }
  });

  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }

  return Post;
};
