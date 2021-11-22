const searchLog = (sequelize, DataTypes) => {
    const SearchLog = sequelize.define("searchLog", {
        searchCity: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        searchZipcode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        businessCity: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        businessZipcode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    SearchLog.viewSearchLogByUserId = async (userId) => {
        return await SearchLog.findAll({
            raw: true,
            where: { userId },
        });
    };

    SearchLog.associate = function (models) {
        SearchLog.belongsTo(models.User);
    };

    return SearchLog;
};

export default searchLog;
