# How to record terminal session (and use it in the Docs site)

We use [Asciinema](https://asciinema.org/~sharetribe) for recording terminal GIFs and hosting them. We have our own account and profile there, credentials in 1Password.

## How to record

To record, check the [Getting started](https://asciinema.org/docs/getting-started) guide.

## How to edit

The recording is stored in a `.cast` file. The `.cast` file can be edited with a regular text editor. It's possible to some extend to fix typos by removing the lines of mistyped characters and the subsequent backspaces, but it's quite hard to edit the durations.

## How to publish

Upload the `.cast` file, go to Asciinema, log in (the account is linked to team@sharetribe.com and it seems that every time you log in they'll send a token to this email), make the recording public. Note the recording ID.

## How to embed

```
<asciinema recording-id="recoding-id-here"></asciinema>
```

## How to make it a GIF

Embedded Asciinema recordings are not GIFs. They are played in a embedded Asciinema player, a piece of JavaScript (or ClojureScript, to be presice) and some DOM manipulations.

Check [asciicast2gif](https://github.com/asciinema/asciicast2gif) if you want to export the recording to GIF.
