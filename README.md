## Service API

Running service-api locally in Development mode:
 1. Download service-api folder from dev.networkgateway.net server
 2. Delete node_modules folder
 3. execute command line: npm install
4a. To run NATS manually for the FIRST time by either one of the ff.:
	* In Docker Desktop, go to Images and find 'nats' in the Local list and click RUN, then input 'nats' as the container name and '4222' for the localhost port
	* execute command line: docker run -d -p 4222:4222 --name nats nats:alpine
4b. To run NATS, execute command line: docker start nats
 5. execute command line: npm run dev
 6. test by browsing to http://localhost:3000, if it keeps on loading just execute Control C on the command line and try again

To stop service-api in Development mode:
* execute command line: quit

To stop nats in Development mode:
* execute command line: docker stop nats


Running service-api locally in Production mode:
1. Download service-api folder from dev.networkgateway.net server
2. execute command line: npm run dc:up


To stop service-api in Production mode:
* execute command line: npm run dc:down


## Troubleshooting:
1. When an error is encountered starting nats container in docker with error message: "(HTTP code 500) server error - Ports are not available: listen tcp 0.0.0.0:4222: bind: An attempt was made to access a socket in a way forbidden by its access permissions."<br/>
   Solution: https://github.com/docker/for-win/issues/3171#issuecomment-739740248
   Execute the ff. commands:
      * net stop winnat
      * docker start nats
      * net start winnat