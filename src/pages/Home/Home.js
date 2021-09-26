import React, { PureComponent } from 'react';
import Moment from 'react-moment';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Input/Checkbox';
import Table from '../../components/Table/Table';
import Toast from '../../components/Toast/Toast';
import OrderService from './OrderService';
import './Home.scss';

const ORDER_SUCCESS = 'THÀNH CÔNG';
const ORDER_CANCEL = 'HỦY BỎ';

/**
 * Với cách này, mọi data của table đều do Component cha là thằng Home quản lý,
 * nên Table2 ko cần state nữa mà chỉ cần là functional component.
 * Mọi data của table2 sẽ được lấy từ state của Home, truyền thông qua props.
 *
 * Flow của cách này: Chẳng hạn user click vào chuyển trang hoặc sort:
 * Table2 gọi onFetchData -> gọi onFetchData của Home lấy lại data
 * -> onFetchData của Home updateState -> Home rerender với state mới
 * -> Home truyền props mới cho Table2 -> Table2 rerender với data mới
 */
class Home extends PureComponent {
  state = {
    data: {},
    params: {
      page: 0
    },
    loading: false,
    updateList: []
  };

  getAllOrder = (params) => {
    this.setState({ loading: true });
    const sort = params.sortBy
      ? params.sortBy + ',' + params.sortOrder
      : this.state.params.sort;
    const newParams = {
      ...this.state.params,
      ...params,
      sort
    };
    this.setState({
      params: newParams
    });
    const lumenParams = {
      ...newParams,
      page: newParams.page + 1 // Because Lumen start page is index 1
    };
    OrderService.getAllOrder(lumenParams)
      .then((res) => {
        this.setState({
          data: res.data,
          loading: false
        });
      })
      .catch((err) => {
        Toast.error(err);
        this.setState({
          loading: false
        });
      });
  };

  columns = [
    {
      Header: 'ID',
      accessor: 'id',
      width: 30
    },
    {
      Header: 'Họ tên',
      accessor: 'name'
    },
    {
      Header: 'Số điện thoại',
      accessor: 'phone',
      Cell: (props) => <a href={'tel:' + props.value}>{props.value}</a>,
      sortable: false
    },
    {
      Header: 'Địa chỉ',
      accessor: 'address',
      sortable: false
    },
    {
      Header: 'Ngày đặt hàng',
      accessor: 'order_date',
      Cell: (props) => <Moment format="DD/MM/YYYY HH:mm">{props.value}</Moment>
    },
    {
      Header: 'Sản phẩm đặt hàng',
      accessor: 'product'
    },
    {
      Header: 'Trạng thái',
      accessor: 'status',
      getProps: (state, rowInfo, column) => {
        const status = rowInfo ? rowInfo.original.status : null;
        let color;
        switch (status) {
          case ORDER_SUCCESS:
            color = '#28a745';
            break;
          case ORDER_CANCEL:
            color = '#dc3545';
            break;
          default:
            color = null;
            break;
        }

        return {
          style: {
            color: color,
            fontWeight: color ? 'bold' : null
          }
        };
      }
    },
    {
      Header: '',
      width: 40,
      Cell: (props) => {
        const { id } = props.original;
        const { updateList } = this.state;
        const checked = updateList.length > 0 && updateList.indexOf(id) !== -1;
        return <Checkbox checked={checked} name={id} onChange={this.updateListId} />;
      }
    }
  ];

  updateListId = (id, checked) => {
    // Nếu dùng như sau ko được, bởi vì .this.state.updateList sẽ ko bị thay đổi
    // (Vẫn là 1 object đó)
    // Do đó lệnh setState ở dưới ko render lại!
    // let { updateList } = this.state;
    let updateList = [...this.state.updateList];
    if (checked) {
      updateList.push(id);
    } else {
      updateList.splice(updateList.indexOf(id), 1);
    }
    this.setState({ updateList });
  };

  updateStatus = (status) => {
    const data = {
      idList: this.state.updateList.toString(),
      status
    };
    OrderService.updateOrderStatus(data)
      .then((res) => {
        Toast.success('Cập nhật trạng thái thành công!');
        this.getAllOrder({ page: 0, size: 10 });
        this.setState({
          updateList: []
        });
      })
      .catch((err) => {
        Toast.error(err);
      });
  };

  render() {
    const { data, loading, updateList } = this.state;
    console.log(this.state);
    return (
      <div>
        <h2>Danh sách đặt hàng</h2>
        <div className="btn-action-wapper">
          <Button
            className="btn-success"
            onClick={() => this.updateStatus(ORDER_SUCCESS)}
            text="Thành công"
            disabled={updateList.length === 0}
          />
          <Button
            className="btn-danger"
            onClick={() => this.updateStatus(ORDER_CANCEL)}
            text="Hủy bỏ"
            disabled={updateList.length === 0}
          />
        </div>
        <Table
          columns={this.columns}
          onFetchData={this.getAllOrder}
          className="order-table"
          defaultPageSize={10}
          data={data}
          loading={loading}
        />
      </div>
    );
  }
}

export default Home;
