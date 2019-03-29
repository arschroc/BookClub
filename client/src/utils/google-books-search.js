//Base url for Google Books API
export var API_BASE_URL = "https://www.googleapis.com/books/v1";
export var defaultOptions = {
  // Google API key
  key: null,
  // Search in a specified field
  field: null,
  // The position in the collection at which to start the list of results (startIndex)
  offset: 0,
  // The maximum number of elements to return with this request (Max 40) (maxResults)
  limit: 10,
  // Restrict results to books or magazines (or both) (printType)
  type: "all",
  // Order results by relevance or newest (orderBy)
  order: "relevance",
  // Restrict results to a specified language (two-letter ISO-639-1 code) (langRestrict)
  lang: "en"
};
