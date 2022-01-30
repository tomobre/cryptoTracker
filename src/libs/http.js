class Http {
  static instance = new Http();

  get = async url => {
    try {
      let req = await fetch(url);

      let json = req.json();

      return json;
    } catch (err) {
      console.log('jttp get method err', err);

      throw Error(err);
    }
  };

  post = async (url, body) => {
    try {
      let req = await fetch(url, {method: 'POST', body});

      let json = await req.json();

      return json;
    } catch (err) {
      console.log('http method post error', err);

      throw Error(err);
    }
  };
}

export default Http;
