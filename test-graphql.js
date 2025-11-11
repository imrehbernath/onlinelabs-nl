const fetch = require('node-fetch');

const query = `
  query TestQuery {
    generalSettings {
      title
      description
      language
    }
  }
`;

fetch('https://wordpress-988065-5984089.cloudwaysapps.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query }),
})
  .then(res => res.json())
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(err => console.error('Error:', err));
