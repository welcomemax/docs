export default /** @ngInject */ function ($sce) {
    return (html) => {
        return $sce.trustAsHtml(html);
    }
}
