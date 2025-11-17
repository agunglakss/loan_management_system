'use client'
import { api } from '@/lib/api';
import { useEffect, useState } from 'react'
import LoanRow from '../components/admin/LoanRow';

export default function AdminApp(){
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{ 
    fetchLoans();
  }, [])

  async function fetchLoans(){
    setLoading(true)
    try{ 
      setLoans(await api.getLoans()) 
    } catch(e) { 
      setLoading(true)
      setLoans([]) 
    } finally {
      setLoading(false)
    }
  }

  async function onPickup(id: number){
    try{ await api.pickup(id); fetchLoans() }catch(e){ alert(e.message) }
  }

  async function onReturn(id: number, status: 'returned' | 'lost' | 'damaged'){
    try { 
      await api.return(id, { status }); 
      fetchLoans() 
    } catch(e) { 
      alert(e.message) 
    }
  }

  return (
    <>
      <h2 className="font-bold text-xl mb-4">List Borrowers</h2>
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex-6">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
              <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
                <tr>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Borrower</th>
                  <th className="px-4 py-3 text-left">Borrowed At</th>
                  <th className="px-4 py-3 text-left">Returned At</th>
                  <th className="px-4 py-3 text-left">Due Date</th>
                  <th className="px-4 py-3 text-left">On Time?</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-sm">
                {
                  loading ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                        Loading...
                      </td>
                    </tr>
                  ) : (
                    loans.map(loan => <LoanRow key={loan.id} loan={loan} onPickup={onPickup} onReturn={onReturn} />)
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}