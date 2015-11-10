module.exports = {
  
  host: process.env.HOST || 'http://localhost:1337',
  port: process.env.PORT || 1337,
  dictionaryUrl: 'http://www.merriam-webster.com/dictionary/',
  funFactUrl: 'https://www.reddit.com/r/funfacts/top/?sort=top&t=day',

  db: {
    uri: process.env.MONGOLAB_URI || 'mongodb://localhost/gravy-rainbow-test'
  },

  mailer: {
    auth: {
      api_key: 'key-2aeb02588800dc582c4cd4eeb6852179',
      domain: 'sandbox09720d29b4aa418ea884e8767134a64b.mailgun.org'
    },
    dailyVocabWord: {
      from: 'vocab@gravyrainbow.com',
      subject: 'Your daily GRE vocabulary word'
    },
    dailyFact: {
      from: 'yourfriendlyneighborhoodshepherd@hackreactor.com',
      subject: 'Goooood Evening Everyone'
    }
    
  }

};