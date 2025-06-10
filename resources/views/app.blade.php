<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    @viteReactRefresh
    @vite(['resources/js/app.jsx', 'resources/css/app.css'])
    @inertiaHead
    @production
        @php
            $manifest = json_decode(file_get_contents(public_path('build/manifest.json')), true);
        @endphp
        <script type="module" src="/build/{{ $manifest['resources/js/app.jsx']['file'] }}"></script>
        <link rel="stylesheet" href="/build/{{ $manifest['resources/js/app.jsx']['css'][0] }}">
    @endproduction
</head>

<body>
    <div class="min-h-screen bg-[#F8FAFC]">
        @inertia
    </div>
</body>

</html>
