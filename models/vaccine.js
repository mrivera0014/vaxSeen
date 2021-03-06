module.exports = function (sequelize, DataTypes) {
  var Patient = sequelize.define("Patient", {
    firstName: {
      type: DataTypes.STRING,
      isAlpha: true,
      notNull: true,
      notEmpty: true,
      len: [2, 30],
    },
    lastName: {
      type: DataTypes.STRING,
      isAlpha: true,
      notNull: true,
      notEmpty: true,
      len: [2, 30],
    },
    age: {
      type: DataTypes.INTEGER,
      isInt: true,
      notNull: true,
      notEmpty: true,
      len: [1, 3],
    },
    height: {
      type: DataTypes.INTEGER,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    vaccinated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      notNull: true,
      notEmpty: true,
    },
  });
  return Patient;
};
