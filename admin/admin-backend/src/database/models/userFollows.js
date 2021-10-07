module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "userFollows",
    {
      user_requester: {
        type: DataTypes.STRING(32),
        primaryKey: true,
      },
      user_recepient: {
        type: DataTypes.STRING(32),
        primaryKey: true,
      },
    },
    {
      indexes: [
        {
          unique: false,
          fields: ["user_requester"],
        },
        {
          unique: false,
          fields: ["user_recepient"],
        },
      ],
      timestamps: false,
    }
  );
