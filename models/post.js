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
      allowNull: false,
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
    }
  },
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function (models) {
          // A User (foreignKey) is required or a Post can't be made

          Post.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: false
            }


          });
        }
      }
    }
  );


  // test
  // Task.associate = function (models) {
  //   // Using additional options like CASCADE etc for demonstration
  //   // Can also simply do Task.belongsTo(models.User);
  //   Task.belongsTo(models.User, {
  //     onDelete: "CASCADE",
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // }
  //test

  return Post;
};
