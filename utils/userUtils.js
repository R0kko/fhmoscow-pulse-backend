const sanitizeUser = (user) => {
    const { id, first_name, last_name, middle_name, birth_date, email } = user;
    return { id, first_name, last_name, middle_name, birth_date, email };
};

module.exports = {
    sanitizeUser,
};
