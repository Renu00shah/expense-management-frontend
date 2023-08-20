import { Box, Card, CardContent, Typography } from '@mui/material'
import { Progress } from 'antd'
import React from 'react'

const Analytics = ({ allTransaction }) => {
    // category
    const categories = [
        
        "salary", "tip", "project","food","movie","bills","medical","fee","tax"
        
    ]
    // total transactions
    const totalTransaction = allTransaction.length
    const totalIncomeTransactions=allTransaction.filter((transaction)=>transaction.type==="income")
    const totalExpenseTransactions = allTransaction.filter((transaction) => transaction.type === "expense")
    const totalIncomePercentage=(totalIncomeTransactions.length/totalTransaction)*100
    const totalExpensePercentage = (totalExpenseTransactions.length / totalTransaction) * 100
    
    // total turnover
    const totalTurnover = allTransaction.reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalIncomeTurnover = allTransaction.filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalExpenseTurnover = allTransaction.filter((transaction) => transaction.type === "expense")
        .reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalIncomeTurnoverPercentage=(totalIncomeTurnover/totalTurnover)*100
    const totalExpenseTurnoverPercentage=(totalExpenseTurnover/totalTurnover)*100

  return (
      <>
          <Card>
              <CardContent>
                  <Typography sx={{ fontSize: "10px" }}>Total Transactions:{totalTransaction}</Typography>
                  <Typography sx={{color:"green"}}>Income:{ totalIncomeTransactions.length}</Typography>
                  <Typography sx={{color:"red"}}>Expense:{totalExpenseTransactions.length}</Typography>
                  <Box>
                      <Progress type='circle'
                          strokeColor={'green'}
                          percent={totalIncomePercentage.toFixed(0)}
                      />
                      <Progress type='circle'
                          strokeColor={'red'}
                          percent={totalExpensePercentage.toFixed(0)}
                      />
                  </Box>
              </CardContent>
          </Card>
          

          <Card>
              <CardContent>
                  <Typography sx={{ fontSize: "10px" }}>Total Turnover:{totalTurnover}</Typography>
                  <Typography sx={{color:"green"}}>Income:{ totalIncomeTurnover}</Typography>
                  <Typography sx={{color:"red"}}>Expense:{totalExpenseTurnover}</Typography>
                  <Box>
                      <Progress type='circle'
                          strokeColor={'green'}
                          percent={totalIncomeTurnoverPercentage.toFixed(0)}
                      />
                      <Progress type='circle'
                          strokeColor={'red'}
                          percent={totalExpenseTurnoverPercentage.toFixed(0)}
                      />
                  </Box>
              </CardContent>
          </Card>
          
          <Box>
              <Typography>Category wise Income</Typography>
              {
                  categories.map((category) => {
                      const amount = allTransaction
                          .filter((transaction) =>
                              transaction.type === 'income' &&
                              transaction.category === category)
                          .reduce((acc, transaction) => acc + transaction.amount, 0)
                      return (
                          amount > 0 && (
                          <Card>
                              <CardContent>
                                  <Typography>{category}</Typography>
                                  <Progress
                                  percent={((amount/totalIncomeTurnover)*100).toFixed(0)}
                                  />
                              </CardContent>
                              </Card>
                          )
                      )
                  })
              }
          </Box>

          <Box>
              <Typography>Category wise Expense</Typography>
              {
                  categories.map((category) => {
                      const amount = allTransaction
                          .filter((transaction) =>
                              transaction.type === 'expense' &&
                              transaction.category === category)
                          .reduce((acc, transaction) => acc + transaction.amount, 0)
                      return (
                          amount > 0 && (
                          <Card>
                              <CardContent>
                                  <Typography>{category}</Typography>
                                  <Progress
                                  percent={((amount/totalExpenseTurnover)*100).toFixed(0)}
                                  />
                              </CardContent>
                              </Card>
                          )
                      )
                  })
              }
          </Box>
      
      </>
  )
}

export default Analytics