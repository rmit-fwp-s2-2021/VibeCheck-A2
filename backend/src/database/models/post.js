module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "post",
    {
      post_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: DataTypes.STRING(600),
        allowNull: false,
      },
      img_url: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN(),
        allowNull: true,
      },
    },
    {
      // Add the timestamp attributes (updatedAt, createdAt).
      timestamps: true,
      underscored: true,
    }
  );
