import { connect } from 'react-redux'
import { actions } from './TableModules'
import { actions as modalActions } from '../ModalChangeData/ModalChangeDataModules'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Table from './Table'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadTable : (config) => dispatch(actions.loadTable(config, ownProps.id)),
  changePage : (page, config) => dispatch(actions.changePage(page, config, ownProps.id)),
  changePageTab : (startPage) => dispatch(actions.changePageTab(startPage, ownProps.id)),

  updateRow : (rowID, updateData) => dispatch(actions.updateRow(rowID, updateData, ownProps.id)),
  deleteRow : (rowID) => dispatch(actions.deleteRow(rowID, ownProps.id)),
  onError : (msg) => dispatch(actions.showErrorMsg(msg, ownProps.id)),
  showLog : (msg) => dispatch(actions.showLogMsg(msg, ownProps.id)),

  setModalShow: (isShow, id) => dispatch(modalActions.showModal(isShow, id)),
  setModalData: (data, id) => dispatch(modalActions.changeData(data, id)),
  setModalErrorOverall: (data, id) => dispatch(modalActions.showErrorOverall)
})

const mapStateToProps = (state, ownProps) => {
  const table = state.table.find((x) => x.id === ownProps.id) || []
  return {
    data: table.data || [],
    isLoading: table.isLoading,
    errorMsg: table.error,
    tableView: table.tableView,
    logMsg: table.logMsg
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
