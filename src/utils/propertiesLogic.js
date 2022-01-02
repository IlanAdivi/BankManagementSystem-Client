export const existEmptyProperty = object => {
    let countOfNullProperties = 0;
    Object.keys(object).map(property => {
        if (object[property] === null) {
            countOfNullProperties++;
        }

        return countOfNullProperties;
    });
    return countOfNullProperties > 0 ? true : false;
};

export const allPropertiesAreEmpty = object => {
    let countOfEmptyProperties = 0;
    Object.keys(object).map(property => {
        if (object[property] === '' || object[property] === undefined) {
            countOfEmptyProperties++;
        }

        return countOfEmptyProperties;
    });
    return countOfEmptyProperties === 5 ? true : false;
};

export const fillUpdatedUser = (updateUser, user) => {
    Object.keys(user).map(property => {
        if (updateUser.hasOwnProperty(property)) {
            updateUser[property] = user[property];
        }
        return updateUser;
    })
};