import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import {UnorderedListOutlined,AreaChartOutlined,EditOutlined,DeleteOutlined} from '@ant-design/icons'
import { Box, Button, Typography } from '@mui/material'
import { Form, Input, Modal, Select, Table, DatePicker } from 'antd'
import moment from 'moment'
import axios from 'axios'
import Analytics from '../components/Analytics'
const {RangePicker} =DatePicker

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const [allTransaction, setAllTransaction] = useState([])
  const [frequency, setFrequency] = useState('7')
  const [selectedDate, setSelectedDate] = useState([])
  const [type, setType] = useState("all")
  const [viewData, setViewData] = useState("table")
  const [editable,setEditable]= useState(null)
  
  // table data
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text )=> <span>{ moment(text).format("YYYY-MM-DD")}</span>
    },
     {
      title: 'Amount',
      dataIndex:'amount'
    },
      {
      title: 'Type',
      dataIndex:'type'
    },
     {
      title: 'Category',
      dataIndex:'category'
    },
      {
      title: 'Reference',
      dataIndex:'reference'
    },
       {
         title: 'Actions',
         render: (text, record) => (
           <Box>
             <EditOutlined onClick={() => {
               setEditable(record)
               setShowModal(true)
             }} />
             <DeleteOutlined onClick={()=>{handleDelete(record)}}/>
           </Box>
         )
    },
  ]


  // get all transactions 
 

  // useEffect hook
  useEffect(() => {
     const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"))
      const res = await axios.post(`${process.env.REACT_APP_API}/transactions/get-transaction`, {
        userid: user._id, frequency,
      selectedDate,type})
      
      setAllTransaction(res.data)
      console.log(res.data)
    } catch (error) {
      alert("fetch issue with transactions")
    }
  }
    getAllTransactions()
  }, [frequency, selectedDate, type])
  

  // delete handler
  const handleDelete = async (record) => {
    try {
      const url = `${process.env.REACT_APP_API}/transactions/delete-transaction`
      console.log({url})
      await axios.post(url, {
        transactionId: record._id,
      });
      alert("Transaction Deleted!");
    } catch (error) {
      console.log(error);
      alert("unable to delete");
    }
  };

  // form handeling
const handleSubmit =async (values) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"))
    if (editable) {
      await axios.post(`${process.env.REACT_APP_API}/transactions/edit-transaction`, {
        payload: { ...values, userid: user._id },
        transactionId: editable._id
      } )
  alert("Transaction edited successfully")
    } else{
      await axios.post(`${process.env.REACT_APP_API}/transactions/add-transaction`, { ...values, userid: user._id })
    alert("Transaction added successfully")
  }
  setShowModal(false)
  setEditable(null)
} catch (error) {
  alert("Failed to add transaction")
}
  }


  const styles = {
    main: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "30px 30px",
      boxShadow: "5px 5px 10px grey",
      padding: " 10px"
    }
  }
  return (
    <Layout>
      <Box sx={styles.main}>
        <Box>
          <Typography>Select Frequency</Typography>
          <Select value={frequency} onChange={(values) => {
            setFrequency(values)
            // window.location.reload()
          }}>
            <Select.Option value='7'>Last 1 Week</Select.Option>
            <Select.Option value='30'>Last 1 Month</Select.Option>
            <Select.Option value='365'>Last 1 Year</Select.Option>
            <Select.Option value='custom'>Custom</Select.Option>
          </Select>
          {
            frequency === 'custom' && (
              <RangePicker value={selectedDate} onChange={(values) => {
                setSelectedDate(values)
            // window.location.reload()

              }} />
            )
          }
        </Box>
        <Box>
          <Typography>Select Type</Typography>
          <Select value={type} onChange={(values) => {
            setType(values)
            // window.location.reload()

          }}>
            <Select.Option value='all'>All</Select.Option>
            <Select.Option value='income'>Income</Select.Option>
            <Select.Option value='expense'>Expense</Select.Option>
          </Select>
          {
            frequency === 'custom' && (
              <RangePicker value={type} onChange={(values) =>setType(values)} />
            )
          }
        </Box>
        <Box sx={{border:"1px solid black",borderRadius:"5px", padding:"10px 15px"}}>
            <UnorderedListOutlined className={`marginRight:"10px" ${viewData === 'table' ? 'active-icon':'inactive-icon'}`} onClick={()=>setViewData("table")} />
            <AreaChartOutlined className={`marginRight:"10px" ${viewData === 'analytics' ? 'active-icon':'inactive-icon'}`} onClick={()=>setViewData("analytics")}/>
          </Box>
        <Box>
          
          <Button onClick={() => setShowModal(true)} variant='contained'>Add New</Button>
        </Box>
      </Box>
      
      <Box>
        {viewData==="table" ?         <Table columns={columns} dataSource={allTransaction}/>
          : <Analytics allTransaction={ allTransaction} />
          
}
      </Box>

      <Modal
        title={editable ? "Edit Transacration" : "Add Transacration"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form layout='vertical' onFinish={handleSubmit} initialValues={editable}>
          <Form.Item label="Amount" name="amount">
            <Input type='text' />
          </Form.Item>

          <Form.Item label="Type" name="type">
            <Select >
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Select >
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date" name='date'>
            <Input type='date' />
          </Form.Item>
          <Form.Item label="Reference" name='reference'>
            <Input type='text' />
          </Form.Item>
          <Form.Item label="Description" name='description'>
            <Input type='text' />
          </Form.Item>

          <Box>
            <Button type='submit' variant='contained'>SAVE</Button>
          </Box>
        </Form>
      </Modal>

    </Layout>
  )
}

export default HomePage