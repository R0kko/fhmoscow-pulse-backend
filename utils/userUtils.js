const sanitizeUser = (user) => {
    const userData = user.get({ plain: true });
    delete userData.password;
    delete userData.createdAt;
    delete userData.updatedAt;
    delete userData.deletedAt;
    return userData;
};

module.exports = {
    sanitizeUser,
};
