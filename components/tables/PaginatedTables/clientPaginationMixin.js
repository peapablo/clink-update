import Fuse from "fuse.js";
export default {
  computed: {
    /***
     * Returns a page from the searched data or the whole data. Search is performed in the watch section below
     */
    queriedData() {
      let result = this.tableData;
      if (this.searchedData.length > 0) {
        result = this.searchedData;
        let refIndexs = [];

        result.forEach((element) => {
          refIndexs.push(element.refIndex);
        });

        let arr = [];

        refIndexs.forEach((element) => {
          arr.push(this.tableData[element]);
        });
        if (this.searchQuery == "") {
          result = this.tableData;
        } else {
          result = arr;
        }
      } else {
        if (this.searchQuery) {
          result = [];
        }
      }

      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.tableData.length;
    },
  },
  data() {
    return {
      pagination: {
        perPage: 25,
        currentPage: 1,
        perPageOptions: [1000, 1500, 2000, 2500],
        total: 0,
      },
      searchQuery: "",
      searchedData: [],
      fuseSearch: null,
    };
  },
  methods: {
    sortChange({ prop, order }) {
      if (prop) {
        this.tableData.sort((a, b) => {
          let aVal = a[prop];
          let bVal = b[prop];
          if (order === "ascending") {
            return aVal > bVal ? 1 : -1;
          }
          return bVal - aVal ? 1 : -1;
        });
      } else {
        this.tableData.sort((a, b) => {
          return a.id - b.id;
        });
      }
    },
  },
  mounted() {
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
      keys: [
        "name",
        "email",
        "orderId",
        "FIRST_NAME",
        "LAST_NAME",
        "firstname",
        "lastname",
        "CATEGORY_NAME",
        "hn",
      ],
      threshold: 0.3,
    });
  },
  watch: {
    /**
     * Searches through the table data by a given query.
     * NOTE: If you have a lot of data, it's recommended to do the search on the Server Side and only display the results here.
     * @param value of the query
     */
    searchQuery(value) {
      let result = this.tableData;
      if (value !== "") {
        result = this.fuseSearch.search(this.searchQuery);
      }

      this.searchedData = result;
    },
  },
};
