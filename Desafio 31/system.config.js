export const apps = [
    {
        name: 'makeItHappen1',
        script: 'src/index.mjs',
        watch: true,
        autorestart: true,
        args: '--port = 8081',
    },
    {
        name: 'makeItHappen2',
        script: 'src/index.mjs',
        watch: true,
        autorestart: true,
        instances: 4,
        args: '--port = 8082 --cluster = true',
    },
    {
        script: './service-worker/',
        watch: ['./service-worker'],
    },
];