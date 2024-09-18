'use strict';
const fs = require('fs');
const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3001,
        host: 'localhost',
        routes: {
            cors:true
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return '<a href="https://github.com/alaksandarjesus/hapilocations">For Details</a>';
        }
    });

    server.route({
        method: 'GET',
        path: '/countries',
        handler: async (request, h) => {
            try{
                const countries = await fs.readFileSync('./locations/countries.min.json', {encoding:'utf-8'}) 
                return JSON.stringify({success:true, countries:JSON.parse(countries)});
          
            }catch(e){
                return JSON.stringify({success:false, countries:[]});

            }
        }
    });

    server.route({
        method: 'GET',
        path: '/states/{id}',
        handler: async (request, h) => {
            try{
                const states = await fs.readFileSync(`./locations/states/${request.params.id}.min.json`, {encoding:'utf-8'}) 
                return JSON.stringify({success:true, states:JSON.parse(states)});
          
            }catch(e){
                return JSON.stringify({success:false, states:[]});

            }
        }
    });

    server.route({
        method: 'GET',
        path: '/cities/{id}',
        handler: async (request, h) => {
            try{
                const cities = await fs.readFileSync(`./locations/cities/${request.params.id}.min.json`, {encoding:'utf-8'}) 
                return JSON.stringify({success:true, cities:JSON.parse(cities)});
          
            }catch(e){
                return JSON.stringify({success:false, cities:[]});

            }
        }
    });

    await server.start();
    // console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();