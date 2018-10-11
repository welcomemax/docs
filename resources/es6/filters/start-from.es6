export default /** @ngInject */ function () {
    return (input, start) => {
        if (!input || !input.length) {
            return
        }

        start = +start;

        return input.slice(start);
    }
}
