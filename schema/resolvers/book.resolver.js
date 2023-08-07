const axios = require("axios");

const bookQueryResolvers = {
  Query: {
    books: async (parent, args) => {
      const { name, index, filter } = args;
      console.log(name, index, filter, "********");
      try {
        const { data } = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${name}&startIndex=${index}&maxResults=10${
            filter !== undefined && filter !== "undefined"
              ? `&filter=${filter}`
              : ""
          }&key=AIzaSyDkzo5BRUkNKq02Md324-U75Jqv_U21DW4`
        );
        return data.items;
      } catch (error) {
        return [{ code: 500, message: "could not fetch the  books" }];
      }
    },
    book: async (parent, args) => {
      const { id } = args;
      try {
        const { data } = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        return data;
      } catch (error) {
        return { code: 500, message: "cant not fetch the requested book" };
      }
    },
    bookById: async (parent, args) => {
      const { ids } = args;
      console.log(ids, "ids");
      let array = [];
      try {
        await Promise.all(
          ids.map(async (id) => {
            const { data } = await axios.get(
              `https://www.googleapis.com/books/v1/volumes/${id}`
            );
            array.push(data);
          })
        );
        return array;
      } catch (error) {
        throw { code: 429, message: "Too many requests..!!" };
      }
    },
  },
};

module.exports = { bookQueryResolvers };
