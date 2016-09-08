import Adapter from '../application/adapter';
export default Adapter.extend({
  handleResponse: (status, headers, payload, requestData) => {
    let data = payload;

    // Fix our API not returning the model name in payload
    if (data && Array.isArray(data)) {
      data = { pipelines: data };
    } else if (data) {
      // Give a link to load secrets from server (will resolve to 'pipelines/:id/secrets')
      data.links = { secrets: 'secrets' };
      data = { pipeline: data };
    }

    // Pass-through to super-class
    return Adapter.prototype.handleResponse(status, headers, data, requestData);
  }
});
