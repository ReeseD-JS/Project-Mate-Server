module.exports = function (sequelize, DataTypes) {
    return sequelize.define('project', {
        projectTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        projectDescription: {
            type: DataTypes.STRING,
            allowNull: true
        },
        itemTitleMain: {
            type: DataTypes.STRING,
            allowNull: true
        },
        itemGroupHeader: {
            type: DataTypes.STRING,
            allowNull: true
        },
        item: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        member: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
};