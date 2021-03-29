
class API {
  // GET JSON response from api
  static async getJSON (url, headers) {
    return await API.fetchJSON('GET', url);
  }

  // POST JSON to api
  static async postJSON (url, obj, headers) {
    return await API.fetchJSON('POST', url, headers, obj);
  }

  // common fetch JSON method
  static async fetchJSON (method, url, headers, obj) {
    let options = {
      method: method, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: Object.assign({ 'Content-Type': 'application/json', 'Accept': 'application/json' }, headers),
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    };
    if (obj) options.body = JSON.stringify(obj);
    let response = await fetch(url, options);
    if (!response.ok) throw new Error(`Fetch error ${response.status}, ${response.statusText}`);
    return await response.json();
  }

}
