# URL Shortener Microservice

This microservice provides URL shortening functionality where users can shorten long URLs into a shorter, more manageable format.

## Live API Endpoint Address
`https://service-url-shortener.harviando.repl.co/`
<p><sub><i>*If the server was not up the first time, please retry in 30 seconds.</i></sub></p>

## Features

- Shorten long URLs to a shorter format.
- Redirect to the original URL using the shortened version.
- Validates URLs for correctness before shortening.

## Routes

### Shorten a URL

Endpoint: `/api/shorturl`

- Method: `POST`
- Description: Shortens a provided long URL.
- Request body: `{ "url": "YOUR_LONG_URL_HERE" }`
- Response: Returns a JSON object containing the original and shortened URLs.

### Redirect to Original URL

Endpoint: `/api/shorturl/:shortUrl`

- Method: `GET`
- Description: Redirects to the original URL corresponding to the provided shortened version.
- Parameters: `shortUrl` (Shortened URL identifier)
- Response: Redirects to the original URL if found, otherwise returns a 404 error.

## Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the server using `npm start`.

## Technologies Used

- Node.js
- Express.js
- MongoDB (for URL storage)
- DNS lookup for URL validation

## Usage

1. Send a POST request to `/api/shorturl` with a JSON payload containing the long URL to shorten.
2. Retrieve the shortened URL from the response.
3. Use the shortened URL to access the original URL.

Feel free to contribute or report issues and have a nice day :)

<hr>
<p align='right'><sub><i>Muhammad Harviando @ 2023</i></sub></p>
