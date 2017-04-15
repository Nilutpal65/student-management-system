import React, { Component } from 'react'
import TableComponent from '../../../components/Table'
import { staticID } from '../../../utils/unique'

// import { Link } from 'react-router'

class TableView extends Component {

  constructor (props) {
    super(props)
    this.tableID = staticID('TableView.table')
  }

  render () {
    const config = {
      header: [
        {
          title: 'ID',
          prop: '_rid'
        },
        {
          title: 'Username',
          prop: 'username'
        },
        {
          title: 'Date registered',
          prop: 'date'
        },
        {
          title: 'Role',
          prop: 'role'
        },
        {
          title: 'Status',
          prop: 'status',
          formatter: (word) => <span className='badge badge-success'>{word}</span>
        },
        {
          title: 'Edit',
          prop: 'edit',
          isEdit: true,
          onUpdate: (resolve, reject, data) => {
            data.username = 'kosate'
            setTimeout(() => resolve(data), 3000)
          }
        },
        {
          title: 'Delete',
          prop: 'delete',
          isDelete: true,
          formatter: () => <div className='btn btn-danger btn-sm'>Delete</div>,
          onDelete: (resolve, reject, data) => {
            setTimeout(() => resolve(), 3000)
          }
        }
      ],
      pagination: {
        pageSize: 10,
        paginationBarSize: 5
      }
    }
    return (
      <TableComponent id={this.tableID} config={config} url='../test/tableData.json' test />
    )
  }
}

export default TableView