const axios = require('axios').default;

const apiUsers = async () => {
    const response = await axios.get(`http://${process.env.HOST_TSHIELD}:4567/users`);
    return response.data;
}

const apiGroups = async () => {
    const response = await axios.get(`http://${process.env.HOST_TSHIELD}:4567/groups`);
    return response.data;
}


const mergeUsersAndGroups = async (users, groups) => {
    return new Promise(resolve => {
        setTimeout(
            () => resolve(
                [{ id: 1, name: 'xpto', group: {id: 1, name: 'xpto'}}]
            ), 100
        );
    });
}

module.exports = {

    async withoutPromisesAll(_req, res, _next) {
        try {
            const users =  await apiUsers();
            const groups = await apiGroups();
            const merge = await mergeUsersAndGroups(users, groups);
            return res.json(merge);
        } catch (error) {
            console.error('failed on withoutPromisesAll', error.message);
            return res.status(500).send();
        }
    },

    async withPromisesAll(_req, res, _next) {
        try {
            const apiResponses = await Promise.all([apiUsers(), apiGroups()]);
            const merge = await mergeUsersAndGroups(apiResponses[0], apiResponses[1]);
            return res.json(merge);
        } catch (error) {
            console.error('failed on withPromisesAll', error.message);
            return res.status(500).send();
        }
    }

}