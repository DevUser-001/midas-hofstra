module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true // Role can be null
    },
    agreedToTos: {
      type: DataTypes.STRING,
      allowNull: false
    },
    agreedToTosDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    accountCreationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    accountAuthorizedByAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'users',
    timestamps: false
  });
}
