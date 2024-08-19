class Apifecture {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }
  search() {
    const keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword,
            $options: "i", //for all samll and big input consider as all inputs
          },
        }
      : {};

    console.log(keyword);

    this.query = this.query.find({ ...keyword });
    return this;
  }

  // api for filters
  filter() {
    const queryCopy = { ...this.querystr }; // Copy the query parameters

    const removeFields = ["keyword", "page", "limit"]; // Corrected "limi" to "limit"

    // Remove unwanted fields from queryCopy
    removeFields.forEach((key) => delete queryCopy[key]);

    // Convert the queryCopy object to a JSON string
    let queryStr = JSON.stringify(queryCopy);

    // Replace operators with MongoDB operators ($gt, $gte, $lt, $lte)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    // Apply the filters to the query
    this.query = this.query.find(JSON.parse(queryStr));

    console.log(queryStr);

    return this;
  }

  pagination(resultpages){
   const curtpages = Number(this.querystr.page) || 1;

   const skip = resultpages * (curtpages - 1);

   this.query = this.query.limit(resultpages).skip(skip);
   return this;
  }
}

module.exports = Apifecture;
