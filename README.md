[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

# gmdevapi

## Backend for gmdevapi & gmdevstore
This repo hosts the code that is used by my personal portfolio and API sites.

### This repository contains:

1. Cloudflare workers
2. JS
3. Fetching API's with Async/Await functionality

---
## Table of Contents
- [goals](#goals)
- [build](#build)
- [endpoints](#endpoints)
- [webresources](#webresources)
- [credits](#credits)
- [extra](#extra)
- [packages](#packages)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)
- [recentUpdates](#recentupdates)
---

## Goals:

1. Understand Cloud Functions and workers
2. Understand JS
3. Keep my Secrets secure for external API usage
4. Create a backend for all my personal applications
5. Gain a deeper understanding of full stack development


## Build
	npm install
	npm start

# endpoints
-	Spotify:
	-	User can request different artist information from Spotify from my website

	>	v1/Spotify

	>	v1/Spotify?id=value

-	Arduino:

	-	 User recieves a status letting them know the LED is OFF IRL
	>	/v1/Arduino/CodeLEDToggle_OFF

	-	 User recieves a status letting them know the LED is ON IRL
	>	/v1/Arduino/CodeLEDToggle_ON

	-	User can request status of Arduino Thing
	>	/v1/Arduino/CodeLEDToggle_STATUS

-	OpenAI:
	-	User can get a generic prompt
	> /v1/OpenAi/test
	-	User can get a prompt based on input
	> /v1/OpenAi/test?userInput=value

-	Financial API's:
	-	User can get stock data
	> /v1/Stock/ticker
	> /v1/Stock/ticker?symbol=GOOGL&date=2022-08-04&adjusted=true
	-	User can get crypto data
	> /v1/Crypto/ticker
	> /v1/Crypto/ticker?cryptoTicker=X:LTCUSD
	-	User can get NFT data
	> /v1/NFT/collection
	> /v1/NFT/collection?collectionName=doodles-official
	-	User can get Gov data
	> /v1/GOV/debt

	# RelatedProjects
	> https://gmdevstore.com/#/

	# webresources
>http://expressjs.com/

>https://reactjs.org/

>https://www.digitalocean.com/community/tutorials/use-expressjs-to-get-url-and-post-parameters

>https://dmitripavlutin.com/javascript-fetch-async-await/

>https://forum.arduino.cc/

>https://create.arduino.cc/iot

>https://console.cloud.google.com/functions

# credits

# extra
# packages
>"dependencies": {"@google-cloud/functions": "^2.2.0","@google-cloud/functions-framework": "^3.1.2","cross-fetch": "^3.1.5","dotenv": "^16.0.1","express": "^4.18.1","node-fetch": "^3.2.9"}
---

# Maintainers

### Contributing
**NA**


## Contributors

---

#### License
**Standard**

## Badge

If your README is compliant with Standard-Readme and you're on GitHub, it would be great if you could add the badge. This allows people to link back to this Spec, and helps adoption of the README. The badge is **not required**.

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

## RecentUpdates
