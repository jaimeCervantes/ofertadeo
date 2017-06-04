'use strict'

const STATEPLAINTEXT = Symbol('plaintext')
const STATEHTML = Symbol('html')
const STATECOMMENT = Symbol('comment')

const ALLOWEDTAGSREGEX = /<(\w*)>/g
const NORMALIZETAGREGEX = new RegExp('<\\/?([^\\s\\/>]+)')
// const NORMALIZETAGREGEX = /<\/?([^\s\/>]+)/

function striptags (html, allowabletags, tagreplacement) {
  html = html || ''
  allowabletags = allowabletags || []
  tagreplacement = tagreplacement || ''

  var context = initcontext(allowabletags, tagreplacement)

  return striptagsinternal(html, context)
}

function initstriptagsstream (allowabletags, tagreplacement) {
  allowabletags = allowabletags || []
  tagreplacement = tagreplacement || ''

  var context = initcontext(allowabletags, tagreplacement)

  return function striptagsstream (html) {
    return striptagsinternal(html || '', context)
  }
}

striptags.initstreamingmode = initstriptagsstream

function initcontext (allowabletags, tagreplacement) {
  allowabletags = parseallowabletags(allowabletags)

  return {
    allowabletags: allowabletags,
    tagreplacement: tagreplacement,
    state: STATEPLAINTEXT,
    tagbuffer: '',
    depth: 0,
    inquotechar: ''
  }
}

function striptagsinternal (html, context) {
  var allowabletags = context.allowabletags
  var tagreplacement = context.tagreplacement

  var state = context.state
  var tagbuffer = context.tagbuffer
  var depth = context.depth
  var inquotechar = context.inquotechar
  var output = ''

  for (var idx = 0, length = html.length; idx < length; idx++) {
    var char = html[idx]

    if (state === STATEPLAINTEXT) {
      switch (char) {
        case '<':
          state = STATEHTML
          tagbuffer += char
          break

        default:
          output += char
          break
      }
    } else if (state === STATEHTML) {
      switch (char) {
        case '<':
          // ignore '<' if inside a quote
          if (inquotechar) {
            break
          }

          // we're seeing a nested '<'
          depth++
          break

        case '>':
          // ignore '>' if inside a quote
          if (inquotechar) {
            break
          }

          // something like this is happening: '<<>>'
          if (depth) {
            depth--

            break
          }

          // this is closing the tag in tagbuffer
          inquotechar = ''
          state = STATEPLAINTEXT
          tagbuffer += '>'

          if (allowabletags.has(normalizetag(tagbuffer))) {
            output += tagbuffer
          } else {
            output += tagreplacement
          }

          tagbuffer = ''
          break

        case '"':
        case '\'':
          // catch both single and double quotes

          if (char === inquotechar) {
            inquotechar = ''
          } else {
            inquotechar = inquotechar || char
          }

          tagbuffer += char
          break

        case '-':
          if (tagbuffer === '<!-') {
            state = STATECOMMENT
          }

          tagbuffer += char
          break

        case ' ':
        case '\n':
          if (tagbuffer === '<') {
            state = STATEPLAINTEXT
            output += '< '
            tagbuffer = ''

            break
          }

          tagbuffer += char
          break

        default:
          tagbuffer += char
          break
      }
    } else if (state === STATECOMMENT) {
      switch (char) {
        case '>':
          if (tagbuffer.slice(-2) === '--') {
            // close the comment
            state = STATEPLAINTEXT
          }

          tagbuffer = ''
          break

        default:
          tagbuffer += char
          break
      }
    }
  }

  // save the context for future iterations
  context.state = state
  context.tagbuffer = tagbuffer
  context.depth = depth
  context.inquotechar = inquotechar

  return output
}

function parseallowabletags (allowabletags) {
  var tagsarray = []

  if (typeof allowabletags === 'string') {
    var match

    while ((match = ALLOWEDTAGSREGEX.exec(allowabletags)) !== null) {
      tagsarray.push(match[1])
    }
  } else if (typeof allowabletags[Symbol.iterator] === 'function') {
    tagsarray = allowabletags
  }

  return new Set(tagsarray)
}

function normalizetag (tagbuffer) {
  var match = NORMALIZETAGREGEX.exec(tagbuffer)

  return match ? match[1].toLowerCase() : null
}

export default striptags
