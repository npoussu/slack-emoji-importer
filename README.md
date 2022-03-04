# Slack Emoji Importer

# About

Simple semi-automated NodeJS script for locally importing large amounts of custom emojis from Slack. 
Heavily inspired by https://github.com/lmarkus

# Instructions

- Install node if not already installed
- Clone the repository
- Download the JSON metadata responses as described in (https://gist.github.com/lmarkus/8722f56baf8c47045621) (NOTE: If you are importing a large amount of emojis (100+ at the time of creating this), the responses will be paged and you will have to download multiple JSON metadata files)
- Run `node slackEmojiExporter.js` in the `src` directory
- Follow the command line instructions :)

### Folders

The script creates a couple of key folders for input / output data

- `sources`: JSON files containing emoji metadata in bulk
- `output`: Output folder for the emojis
