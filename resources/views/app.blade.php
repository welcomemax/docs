<!doctype html>
<html lang="{{ app()->getLocale() }}" ng-app="items">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>Elfsight DOCS</title>

    <link rel="stylesheet" href="{{asset('css/app.css')}}">
</head>
<body>
    <div class="container" ng-app="items">
        <div class="loader" ng-class="{'loader-visible': !loaded}"><div class="loader-inner"></div></div>

        <header class="header">
            <h1 class="header-title">Elfsight Docs</h1>
            <p class="header-caption">DB of customizations and hacks for Elfsight applications</p>
        </header>

        <main class="main" ng-view></main>

        <footer class="footer">
            <nav class="footer-nav">
                <ul>
                    <li><a href="https://elfsight.com">elfsight.com</a></li>
                </ul>
            </nav>
        </footer>
    </div>

    <script src="{{asset('js/app.js')}}"></script>
</body>
</html>
