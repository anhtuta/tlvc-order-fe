import React, { PureComponent } from 'react';
import Moment from 'react-moment';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Input/Checkbox';
import Table from '../../components/Table/Table';
import Toast from '../../components/Toast/Toast';
import TlvcOrderService from './TlvcOrderService';
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
    data: [],
    pages: -1,
    loading: false,
    updateList: []
  };

  getAllTlvcOrder = (params) => {
    this.setState({ loading: true });
    let size = params.size ? params.size : 10;
    TlvcOrderService.getAllTlvcOrder(params)
      .then((res) => {
        this.setState({
          data: res.data.records,
          pages: Math.ceil(res.data.totalCount / size),
          loading: false
        });
      })
      .catch((err) => {
        console.log(err);
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
      Cell: (props) => <a href={'tel:' + props.value}>{props.value}</a>
    },
    {
      Header: 'Địa chỉ',
      accessor: 'address'
    },
    {
      Header: 'Ngày đặt hàng',
      accessor: 'order_date',
      Cell: (props) => <Moment format="HH:mm DD/MM/YYYY">{props.value}</Moment>
    },
    {
      Header: 'Lời nhắn',
      accessor: 'message'
    },
    {
      Header: 'Trạng thái',
      accessor: 'status'
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
    console.log(id, checked, this.state.updateList);
    // Nếu dùng như sau ko được, bởi vì .this.state.updateList sẽ ko bị thay đổi
    // (Vẫn là 1 object đó)
    // Do đó lệnh setState ở dưới ko render lại!
    // let { updateList } = this.state;
    let updateList = [...this.state.updateList];
    if (checked) {
      console.log('check=true');
      updateList.push(id);
    } else {
      updateList.splice(updateList.indexOf(id), 1);
    }
    this.setState({ updateList }, () => {
      console.log(updateList);
    });
  };

  updateStatus = (status) => {
    const data = {
      idList: this.state.updateList.toString(),
      status
    };
    TlvcOrderService.updateTlvcOrderStatus(data)
      .then((res) => {
        this.getAllTlvcOrder({ page: 0, size: 10 });
        this.setState({
          updateList: []
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { data, pages, loading, updateList } = this.state;
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
          onFetchData={this.getAllTlvcOrder}
          className="tlvc-order-table"
          defaultPageSize={5}
          data={data}
          pages={pages}
          loading={loading}
        />
      </div>
    );
  }
}

export default Home;
