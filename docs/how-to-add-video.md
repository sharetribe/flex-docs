# How to record a video (and use it in the Docs site)

The docs site supports embedding HTML5 video using the `<video>` tags.
Embedded video is primarily meant for short videos with low production
quality (e.g. screen recordings). For longer videos with high production
quality, use hosted video services.

## Record a video

Easiest way to record a video is to use built-in
[screen recording feature](https://support.apple.com/en-us/HT208721) on
Mac OS (shift + command + 5). The video file is saved as .mov but you
should convert it to .mp4, .ogg and .webm.

## Convert a video

You can use [handbrake](https://handbrake.fr/), an online video
converter, or use the command line tool `ffmpeg`. Here's how to convert
a .mov video (default file format for screen recordings on Mac OS) to
.webm and .mp4 using `ffmpeg`:

1. Install ffpmeg using brew (install brew first if you don't have it)

`brew install ffmpeg`

2. run the following commands:

`ffmpeg -i source.mov -vcodec h264 -acodec mp2 output.mp4`

`ffmpeg -i source.mov -c:v libvpx -crf 10 -b:v 1M -c:a libvorbis output.webm`

`ffmpeg -i source.mov -c:v libtheora -b:v 2000K -qscale:v 7 -c:a libvorbis -ar 44100 -b:a 160k output.ogv`

Now you should have three different video files, which you can include
and link to in the repository.

You can add the video to the .md file using the following syntax:

```
<video>
    <source src='./output.mp4' type='video/mp4'>
    <source src='./output.webm' type='video/webm'>
    <source src='./output.ogv' type='video/ogg'>
</video>
```
