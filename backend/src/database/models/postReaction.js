module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "postReaction",
    {
      username: {
        type: DataTypes.STRING(32),
        primaryKey: true,
      },
      post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      is_liked: {
        type: DataTypes.BOOLEAN(),
        allowNull: true,
      },
    },
    {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: false,
    }
  );
