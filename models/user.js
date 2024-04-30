module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // role: {
    //   type: DataTypes.STRING,
    //   allowNull: true
    // },
    agreedToTos: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    // agreedToTosDate: {
    //   type: DataTypes.DATE,
    //   defaultValue: DataTypes.NOW
    // },
    // accountCreationDate: {
    //   type: DataTypes.DATE,
    //   defaultValue: DataTypes.NOW
    // },
    // accountAuthorizedByAdmin: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false
    // }
  }, {
    tableName: 'users',
    timestamps: false
  });
  return User;
}