import React, { PureComponent } from 'react';
import Moment from 'react-moment';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Input/Checkbox';
import Table from '../../components/Table/Table';
import Toast from '../../components/Toast/Toast';
import { PRD_MAY_LOC_KK } from '../../constants/Constants';
import MayLocKkService from './MayLocKkService';
import OrderService from '../Home/OrderService';
import './MayLocKk.scss';

const ORDER_SUCCESS = 'THÀNH CÔNG';
const ORDER_CANCEL = 'HỦY BỎ';

class MayLocKk extends PureComponent {
  state = {
    data: {},
    pages: -1,
    loading: false,
    updateList: []
  };

  getMayLocKkOrder = (params) => {
    this.setState({ loading: true });
    MayLocKkService.getMayLocKkOrder(params)
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
        this.getMayLocKkOrder({ page: 0, size: 10 });
        this.setState({
          updateList: []
        });
      })
      .catch((err) => {
        Toast.error(err);
      });
  };

  render() {
    const { data, pages, loading, updateList } = this.state;
    console.log(this.state);
    return (
      <div>
        <h2>Danh sách đặt hàng {PRD_MAY_LOC_KK}</h2>
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
          onFetchData={this.getMayLocKkOrder}
          className="order-table"
          defaultPageSize={10}
          data={data}
          pages={pages}
          loading={loading}
        />
      </div>
    );
  }
}

export default MayLocKk;
