class ApiFeatures {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
      const keyword = this.queryStr.keyword;
  
      if (keyword) {
          const searchFields = ["name", "destination"]; // Add more fields here
          const keywordRegExp = new RegExp(keyword, "i");
  
          const orConditions = searchFields.map(field => ({
              [field]: keywordRegExp
          }));
  
          this.query = this.query.or(orConditions);
      }
  
      return this;
  }
    
      // filter() {
      //   const queryCopy = { ...this.queryStr };
      //   const removeFields = ["keyword", "page", "limit"];
      //   removeFields.forEach((key) => delete queryCopy[key]);
    
      //   // Filter for Price & Rating
      //   let queryStr = JSON.stringify(queryCopy);
      //   queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
      //   this.query = this.query.find(JSON.parse(queryStr));
      //   return this;
      // }
    
      pagination(resultsPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultsPerPage * (currentPage - 1);
    
        this.query = this.query.limit(resultsPerPage).skip(skip);
    
        return this;
      }
    }
    
 module.exports = ApiFeatures;