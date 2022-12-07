# ytm-for-alexa
Skill that allows you to access and play Youtube Music songs/playlists on Alexa

## Disclaimer

This project is for my personal use, allowing me to play songs from Youtube Music in my Alexa at home. If you want to use this project as an inspiration for yourself, make sure you have a valid subscription to the Youtube Music service.

## Brief explanation of how things work for my future self

The initial skill was build based on [this article](https://betterprogramming.pub/how-to-play-youtube-audio-from-your-alexa-e2d4fb8b5ce9).

- Make sure you have a valid AWS developer account. 
- Create a new hosted Alexa skill using the standard template. This will create the Lambda function that runs the skill, plus it will link it to an S3 bucket that can be used for general storage, a DynamoDB table that can be used to store user specific info and it will connect everything to CloudWatch for logging. Quite helpful :)
- The `alexa-skill` folder contains the artifacts for the skill, including the interaction model and the code for the lambda function. There is no localization included, since I always give commands to Alexa in *pt-BR*
- It uses the packages `@codyduong\ytmusicapi` and `ytdl-core` to access the necessary data from Youtube and Youtube Music
- Everything is a dirty hack, so no best practices are being considered in the code

## Workarounds

- Ideally I would implement the Music Skill interface for Alexa. However, currently this is only generally available for USA located services/devices. 
- Since Google doesn't provide an API for YTMusic content, the alternative was to use the package `@codyduong\ytmusicapi`, which has everything I needed to get YTMusic info. However, the hosted Alexa lambda uses an older version of NodeJS that is not supported by the package out of the box. Hence, I had to download the code for the package and configure typescript to transpile it to ES2017. This is why there is a folder with the package included as part of the lambda function code.
- Hosted Alexa skills are only hosted on us-east-1. For this reason, anytime I used `ytdl-core` to get the streaming information for a song, it would return the urls valid for North America - and those are geo blocked. So when my Alexa located in Brazil tried to reproduce the audio, it was not able to do so. For this reason, I created an additional Azure function that uses `ytdl-core` to retrieve the urls and deployed the function in a South America Region. *Why an Azure Function and not an AWS Lambda?* In order for an AWS Lambda to call an external URL, you need to attach to a VPC that has a public subnet that is able to access the internet via a NAT gateway, and those are costly. Meanwhile, Azure Functions can access the public internet *for free*;