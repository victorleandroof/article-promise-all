const users = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve([{id: 1, name: 'user xpto'}]), 2000)
    });
}

const groups = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve([{ id: 1, name: 'xpto'}]), 3000)
    });
}

const merge = (users, groups) => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(users, groups); 
            resolve();
        }, 1000)
    });
}

(async () => {

    console.time('without_promise_all');
    const usersResponse = await users();
    const groupsResponse = await groups();
    await merge(usersResponse, groupsResponse);
    console.timeEnd('without_promise_all');

    console.time('with_promise_all');
    const responses = await Promise.all([users(),groups()]);
    await merge(responses[0], responses[1]);
    console.timeEnd('with_promise_all');

})()


