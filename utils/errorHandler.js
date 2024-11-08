module.exports = (err, req, res) => {
    console.log(err); // Можно заменить на логирование в файл или внешнюю систему мониторинга
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
    });
};
