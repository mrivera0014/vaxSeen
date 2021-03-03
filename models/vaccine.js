module.exports = function (sequelize, DataTypes) {
    var Patient = sequelize.define("Patient", {
        firstName: {
            type: DataTypes.STRING,
            isAlpha: true,
            notNull: true,
            notEmpty: true,
            len: [2, 30]
        },
        lastName: {
            type: DataTypes.STRING,
            isAlpha: true,
            notNull: true,
            notEmpty: true,
            len: [2, 30]
        },
        age: {
            type: DataTypes.INT,
            isInt: true,
            notNull: true,
            notEmpty: true,
            len: [1, 3]
        },
        height: {
            type: DataTypes.INT,
            isInt: true,
            len: [1, 3]
        },
        weight: {
            type: DataTypes.INT,
            isInt: true,
            len: [1, 3]
        },
        vaccinated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        email: {
            isEmail: true,
            notNull: true,
            notEmpty: true,
        }
    });
    return Patient;
};
