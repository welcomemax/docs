export default /** @ngInject */ function ($sce) {
    return (url) => {
        return $sce.trustAsResourceUrl(url);
    };
}
