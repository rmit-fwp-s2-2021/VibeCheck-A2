module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING(32),
        primaryKey: true,
      },
      password_hash: {
        type: DataTypes.STRING(96),
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      img_url: {
          type: DataTypes.STRING(400),
          allowNull: true,
      },
      is_blocked: {
          type: DataTypes.BOOLEAN(),
          allowNull: true,
      }
    },
    {
      // Add the timestamp attributes (updated_at, created_at).
      timestamps: true,
      underscored: true,
    }
  );
