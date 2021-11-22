export default {
    Query: {
        getSearchLogByUserId: async (parent, { userId }, { models }) => {
            const log = await models.SearchLog.viewSearchLogByUserId(userId);
            return log;
        },
    },

    Mutation: {
        addSearchLogCityEntry: async (
            parent,
            { searchLog: { userId, searchCity } },
            { models }
        ) => {
            console.log(userId, searchCity);
            try {
                await models.SearchLog.create({
                    userId,
                    searchCity,
                });
                return true;
            } catch (e) {
                return false;
            }
        },
        addSearchLogZipcodeEntry: async (
            parent,
            { searchLog: { userId, searchZipcode } },
            { models }
        ) => {
            console.log(userId, searchZipcode);
            try {
                await models.SearchLog.create({
                    userId,
                    searchZipcode,
                });
                return true;
            } catch (e) {
                return false;
            }
        },
        addSearchLogBusinessCityEntry: async (
            parent,
            { searchLog: { userId, businessCity } },
            { models }
        ) => {
            try {
                await models.SearchLog.create({
                    userId,
                    businessCity,
                });
                return true;
            } catch (e) {
                return false;
            }
        },
        addSearchLogBusinessZipcodeEntry: async (
            parent,
            { searchLog: { userId, businessZipcode } },
            { models }
        ) => {
            try {
                await models.SearchLog.create({
                    userId,
                    businessZipcode,
                });
                return true;
            } catch (e) {
                return false;
            }
        },
    },
};
