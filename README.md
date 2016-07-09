# Pb
This is a library with 0 dependencies that allows you to embed a podcast in your web page.

## Features
- Provide a podcast URL, see a podcast rendered
- Optionally provide a limit to the number of episodes displayed
- Each episode has its own audio player

## Usage
1. Create an element on your page with the class `pb-embed` and attribute `data-feed="<podcast-url-here>"`.
2. Include the `bundle.js` either in your own compiled js or as a `script` tag before the `body` closing tag.
3. Optionally, provide your own styling of the embed (see `./example/example.css`).
4. Optionally, provide an attribute of `data-limit="<some number>"` to limit the number of episodes displayed.

### Example
See [https://github.com/NarroApp/Pb/tree/master/example](https://github.com/NarroApp/Pb/tree/master/example)

~~~html
<div class="pb-embed" data-feed="http://on.narro.co/foobar" data-limit="5">
</div>
~~~

Working usage: 
