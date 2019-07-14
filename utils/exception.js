function UserException(obj) {
    this.message = obj.message;
    this.code = obj.code;
}

module.exports = UserException;