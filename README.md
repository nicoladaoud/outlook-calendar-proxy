# Simple Outlook Calendar Proxy for Node

This was built to easily get calendar data from Outlook using the Microsoft Graph API. The Graph API does not send cross origin headers so making a request from the browser is not possible.

Once the server is up, make a request to /calendar/teanant@yourdomain.com to get their calendar events

## Setup

Go to Microsoft and make an [app ID](https://apps.dev.microsoft.com/#/appList)

Follow the steps [here](https://developer.microsoft.com/en-us/graph/docs/concepts/auth_v2_service) to get a teanant ID for your application, you must use an admin account and authorize the app on the domain

## Install

Make a Docker Compose file

```yaml

version: "3"

services:
    outlook_proxy:
        build: .
        container_name: outlook_proxy
        ports:
            - 9412:8081
        environment:
            - CLIENT_ID=your-client-id
            - SECERET=your-seceret
            - TEANANT=your-teanant-id

```