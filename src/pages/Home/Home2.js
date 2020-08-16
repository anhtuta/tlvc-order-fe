import React, { PureComponent } from 'react';
import Moment from 'react-moment';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Input/Checkbox';
import Table2 from '../../components/Table/Table2';
import TlvcOrderService from './TlvcOrderService';
import './Home.scss';

const ORDER_SUCCESS = 'THÀNH CÔNG';

/**
 * Với cách này, mọi data của table đều do chính nó quản lý,
 * nên Home2 ko cần state gì liên quan đến table nữa.
 * Mọi data của table sẽ được lấy từ state của nó.
 *
 * Flow của cách này: Chẳng hạn user click vào chuyển trang hoặc sort:
 * Table gọi onFetchData -> gọi onFetchData của Home2 lấy lại data
 * -> onFetchData của Home2 return Promise -> Table get Promise và updateState
 * -> Table2 rerender với data mới state mới
 */
class Home2 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      updateList: []
    };
  }

  getAllTlvcOrder = (params) => {
    // res là 1 Promise nhé
    const res = TlvcOrderService.getAllTlvcOrder(params);
    return res;
  };

  columns = [
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
        return <Checkbox name={props.original.id} onChange={this.updateListId} />;
      }
    }
  ];

  updateListId = (id, checked) => {
    let { updateList } = this.state;
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
    TlvcOrderService.updateTlvcOrderStatus(data)
      .then((res) => {
        // KHÔNG thể rerender lại vì getAllTlvcOrder xong ko update state gì
        // Do đó dùng cách này ko ổn
        this.getAllTlvcOrder();
        this.setState({ updateList: [] });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h2>Danh sách đặt hàng</h2>
        <div>
          <Button onClick={() => this.updateStatus(ORDER_SUCCESS)} text="Thành công" />
        </div>
        <Table2
          columns={this.columns}
          onFetchData={this.getAllTlvcOrder}
          className="tlvc-order-table"
          defaultPageSize={10}
        />
      </div>
    );
  }
}

export default Home2;
