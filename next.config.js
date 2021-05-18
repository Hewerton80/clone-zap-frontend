module.exports = {
    pageExtensions: ['tsx'],
    async redirects() {
        return [
            {
                source: '/',
                destination: '/login',
                permanent: true,
            },
        ]
    },
}