import React, { useEffect } from 'react'
import Header from '../components/Header'
import ComingSoon from '../components/ComingSoon'
import { formatDateDDShortMonthNameYY } from '../utils/formatDate'
import { color } from '../Statuscolor/color'
import { useDispatch, useSelector } from 'react-redux'
import { FaSadTear } from 'react-icons/fa'
import Loader from '../components/Loader'
import { getRecoTransactions } from '../redux/reconciliation/ReconciliationAction'

const Reco = () => {
  const {transactions, status} = useSelector(state => state.reconciliation)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRecoTransactions())
  }, [])

  const showLoading = <tr>
    <td
      className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
    ><Loader />
    </td>
  </tr>

  const notFound = (
    <tr>
      <td
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-400 text-lg text-center flex flex-col items-center'
      >
        <FaSadTear className='text-5xl mb-3' />
        <span className='text-gray-700 text-xl font-bold text-center'>No Transactions Found!</span>
      </td>
    </tr>
  )

  return (
    <main className='w-full'>
      <div className='sticky top-0 bg-white w-full px-2 md:px-6 z-10'>
        <Header title='Reconciliation' />
        <hr className='border-b border-slate-100 w-full' />
      </div>
      <section className='px-2 md:px-6 w-full'>
        <article className='border bg-gray-50 rounded-md overflow-x-scroll w-full md:w-[calc(100vw-152px)] min-h-[75vh] relative custom-scrollbar'>
          <table className='filtered-trx'>
            <thead className='bg-blue-50'>
              <tr className='font-medium text-nowrap py-3  text-gray-800'>
                <th className='text-sm'>S. No.</th>
                <th className='text-sm'>Transaction date</th>
                <th className='text-sm'>Transaction type</th>
                <th className='text-sm'>Pan number</th>
                <th className='text-sm'>Investor name</th>
                <th className='text-sm'>Family head</th>
                <th className='text-sm'>RM Name</th>
                <th className='text-sm'>AMC name</th>
                <th className='text-sm'>Scheme name</th>
                <th className='text-sm'>Amount</th>
                <th className='text-sm'>Units</th>
                <th className='text-sm'>Status</th>
                <th className='text-sm'>SM Name</th>
                <th className='text-sm'>Registrant</th>
                <th className='text-sm'>Folio No.</th>
                <th className='text-sm'>Scheme Option</th>
                <th className='text-sm'>From scheme</th>
                <th className='text-sm'>From scheme option</th>
                <th className='text-sm'>Transaction for</th>
                <th className='text-sm'>Payment mode</th>
                <th className='text-sm'>First trx amount</th>
                <th className='text-sm'>SIP/SWP/STP date</th>
                <th className='text-sm'>SIP Pause month</th>
                <th className='text-sm'>Tenure of SIP</th>
                <th className='text-sm'>Order ID</th>
                <th className='text-sm'>Cheque No.</th>
              </tr>
            </thead>

            <tbody className='divide-y px-3'>{
              status === 'pending' ? showLoading : !transactions.length ? notFound :
                transactions?.map((item, index) => {
                  let statusColor = color.find(colorItem => colorItem.type === item.status)

                  return (
                    <tr key={item._id} className='text-sm'>
                      {/* <td>{(page - 1) * items + (index + 1)}</td> */}
                      <td>{(index + 1)}</td>
                      <td>{formatDateDDShortMonthNameYY(item.transactionPreference)}</td>
                      <td>{item.transactionType}</td>
                      <td>{item.panNumber}</td>
                      <td><span className='w-44 two-line-ellipsis'>{item.investorName}</span></td>
                      <td><span className='w-44 two-line-ellipsis'>{item.familyHead}</span></td>
                      <td><span className='w-44 two-line-ellipsis'>{item.relationshipManager}</span></td>
                      <td><span className='w-44 two-line-ellipsis'>{item.amcName}</span></td>
                      <td><span className='w-44 two-line-ellipsis'>{item.schemeName}</span></td>
                      <td>{item.amount}</td>
                      <td>{item.transactionUnits}</td>
                      <td >
                        <span
                          className='px-3 py-2 rounded-full'
                          style={{ backgroundColor: statusColor.bgcolor, color: statusColor.color }}
                        >{statusColor.value}
                        </span>
                      </td>
                      <td><span className='w-44 two-line-ellipsis'>{item.serviceManager || 'N/A'}</span></td>
                      <td><span className='w-44 two-line-ellipsis'>{item.registrantName}</span></td>
                      <td>{item.folioNumber}</td>
                      <td>{item.schemeOption}</td>
                      <td><span className='w-44 two-line-ellipsis'>{item.fromSchemeName}</span></td>
                      <td>{item.fromSchemeOption}</td>
                      <td>{item.transactionFor}</td>
                      <td>{item.paymentMode}</td>
                      <td>{item.firstTransactionAmount}</td>
                      <td>{formatDateDDShortMonthNameYY(item.sipSwpStpDate)}</td>
                      <td>{item.sipPauseMonths}</td>
                      <td>{item.tenure}</td>
                      <td>{item.orderId}</td>
                      <td>{item.chequeNumber}</td>
                    </tr>)
                })}
            </tbody>
          </table>

        </article>

        {/* <div className='flex gap-4 w-fit mt-4 mb-5 mx-auto rounded-full items-center justify-center'>
          <button
            title='Previous'
            onClick={handlePrev}
            disabled={page <= 1}
            className='px-4 py-1 rounded-md border flex gap-2 items-center text-gray-600 border-gray-200 focus:outline-2 focus:outline-blue-400 enabled:hover:bg-blue-50 enabled:hover:text-blue-700 enabled:hover:border-blue-200 disabled:text-gray-400'
          ><BsArrowRight className='rotate-180' />Prev</button>
          <span
            title='Current page'
            className='w-9 h-9 rounded-full bg-blue-500 text-gray-100 flex items-center justify-center'
          >{page}</span>
          <button
            title='Next'
            onClick={handleNext}
            disabled={totalCount <= (page * items)}
            className='px-4 py-1 rounded-md border flex gap-2 items-center text-gray-600 border-gray-200 focus:outline-2 focus:outline-blue-400 enabled:hover:bg-blue-50 enabled:hover:text-blue-700 enabled:hover:border-blue-200 disabled:text-gray-400'
          >Next<BsArrowRight /></button>
        </div> */}

      </section>
    </main>
  )
}

export default Reco