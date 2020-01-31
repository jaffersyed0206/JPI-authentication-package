const NullProject = (api) => {
    let result = false;
    if (api.length === 0) {
        result = false;
    } else {
        result = true;
    }
    return result;
}

module.exports = NullProject;