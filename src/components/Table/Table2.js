import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import './Table.scss';

const DEFAULT_PAGE_SIZE = 20;

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      pages: -1
    };
  }

  onFetchData = (state) => {
    this.setState({ loading: true });
    const { page, pageSize, sorted } = state;
    const params = {
      page,
      size: pageSize,
      sortBy: sorted.length > 0 ? sorted[0].id : null,
      sortOrder: sorted.length > 0 ? (sorted[0].desc ? 'desc' : 'asc') : null
    };
    this.props
      .onFetchData(params) // dùng this.props.onFetchData({ ...params }) cũng được
      .then((res) => {
        this.setState({
          loading: false,
          data: res.data.records,
          pages: Math.ceil(res.data.totalCount / pageSize)
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false
        });
      });
  };

  render() {
    const { columns, className, defaultPageSize } = this.props;
    const { data, pages, loading } = this.state;
    const defaultProps = {
      manual: true,
      defaultPageSize: defaultPageSize ? defaultPageSize : DEFAULT_PAGE_SIZE,
      minRows: defaultPageSize ? defaultPageSize : DEFAULT_PAGE_SIZE,
      pageSizeOptions: [5, 10, 20, 25, 50, 100],
      resizable: true
    };

    const dynamicProps = {
      className: `-striped -highlight ${className ? className : ''}`,
      showPagination: pages && pages > 0,
      onFetchData: this.onFetchData,
      columns,
      data,
      pages,
      loading
    };

    const nestedProps = { ...defaultProps, ...dynamicProps };

    return <ReactTable {...nestedProps} />;
  }
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  onFetchData: PropTypes.func.isRequired, // this method will return a Promise
  className: PropTypes.string
};

export default Table;
