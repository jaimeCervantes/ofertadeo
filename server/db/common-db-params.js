module.exports = {
  groupAlphabeticallyInSwitch: {
    branches: [
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 'a' ] },
        then: '0-F'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 'b' ] },
        then: '0-F'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 'c' ] },
        then: '0-F'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 'd' ] },
        then: '0-F'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 'e' ] },
        then: '0-F'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 'f' ] },
        then: '0-F'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 'g' ] },
        then: 'G-L'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 'h' ] },
        then: 'G-L'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 'i' ] },
        then: 'G-L'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 'j' ] },
        then: 'G-L'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 'k' ] },
        then: 'G-L'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 'l' ] },
        then: 'G-L'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 'm' ] },
        then: 'M-Q'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 'n' ] },
        then: 'M-Q'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 'ñ' ] },
        then: 'M-Q'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 'o' ] },
        then: 'M-Q'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 'p' ] },
        then: 'M-Q'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 'q' ] },
        then: 'M-Q'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 'r' ] },
        then: 'R-V'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 's' ] },
        then: 'R-V'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 't' ] },
        then: 'R-V'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 'u' ] },
        then: 'R-V'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 'v' ] },
        then: 'R-V'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 'w' ] },
        then: 'W-Z'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 'x' ] },
        then: 'W-Z'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 'y' ] },
        then: 'W-Z'
      },
      {
        case: { $eq: [ { $substrCP: ['$_id', 0, 1] }, 'z' ] },
        then: 'W-Z'
      }
    ],
    default: '0-F'
  }
}
