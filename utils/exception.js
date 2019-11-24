function UserException(obj) {
    const result = Object.assign({});
    result.message = obj.message;
    result.code = obj.code;
    return result;
}

module.exports = UserException;